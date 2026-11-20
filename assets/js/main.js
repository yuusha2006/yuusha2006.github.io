/* =========================================================
   Site shell, i18n, transitions, interactions, page renderers
   Classic script (no modules) so the site also works from file://
   ========================================================= */
(function () {
  "use strict";
  var S = window.SITE, DICT = window.I18N;
  var P = S.person;
  var page = document.body.getAttribute("data-page") || "home";
  var renderers = [];
  var lang = readLang();

  var NAV = [
    { id: "home", href: "index.html", key: "nav.home" },
    { id: "about", href: "hakkimda.html", key: "nav.about" },
    { id: "projects", href: "projeler.html", key: "nav.projects" },
    { id: "gallery", href: "galeri.html", key: "nav.gallery" },
    { id: "blog", href: "blog.html", key: "nav.blog" },
    { id: "contact", href: "iletisim.html", key: "nav.contact" }
  ];
  var activeNav = page === "post" ? "blog" : page;

  /* ---------- helpers ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function L(o) { return o == null ? "" : (typeof o === "string" ? o : (o[lang] != null ? o[lang] : o.tr)); }
  function t(key) {
    var s = (DICT[lang] && DICT[lang][key]) || DICT.tr[key] || key;
    return s.replace(/\{name\}/g, P.name);
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function fmtDate(iso) {
    try { return new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : "en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso + "T12:00:00")); }
    catch (e) { return iso; }
  }
  function readLang() {
    try {
      var q = new URLSearchParams(location.search).get("lang");
      if (q === "tr" || q === "en") { localStorage.setItem("lang", q); return q; }
      var s = localStorage.getItem("lang");
      if (s === "tr" || s === "en") return s;
    } catch (e) {}
    return "tr";
  }
  function waLink(text) { return "https://wa.me/" + P.whatsapp + (text ? "?text=" + encodeURIComponent(text) : ""); }
  var WA_ICON = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9.1 8.2c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4l.7 1.6c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.4.7 1 1.4 1.7 1.9.6.4 1 .6 1.3.7.2.1.4 0 .5-.1l.6-.7c.2-.2.4-.2.6-.1l1.5.7c.3.1.4.3.4.5 0 .5-.2 1.1-.6 1.4-.5.4-1.2.6-1.9.5-1.1-.2-2.4-.8-3.7-2-1.3-1.2-2.1-2.5-2.4-3.6-.2-.8 0-1.6.2-2Z" fill="currentColor"/></svg>';
  var ARROW = '<svg class="arrow" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" stroke-width="1.4"/></svg>';

  /* =========================================================
     Shell: header, menu, footer, cursor
     ========================================================= */
  function buildShell() {
    var links = NAV.map(function (n) {
      return '<a href="' + n.href + '" data-i18n="' + n.key + '"' + (n.id === activeNav ? ' aria-current="page"' : "") + "></a>";
    }).join("");
    var menuLinks = NAV.map(function (n, i) {
      return '<li><a href="' + n.href + '"' + (n.id === activeNav ? ' aria-current="page"' : "") + '><span class="mono">' + pad(i + 1) + '</span><span data-i18n="' + n.key + '"></span></a></li>';
    }).join("");
    var socials = P.socials.map(function (s) { return '<a class="link-u mono" href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + "</a>"; }).join(" ");

    var header = document.createElement("div");
    header.innerHTML =
      '<a class="skip" href="#main" data-i18n="skip"></a>' +
      '<header class="site-header"><div class="wrap">' +
        '<a class="brand" href="index.html" aria-label="' + esc(P.name) + '"><span class="brand-mark">' + esc(P.initials) + '</span><span class="bn-full">' + esc(P.name) + '</span><span class="bn-short">' + esc(P.first) + "</span></a>" +
        '<nav class="nav-desktop" aria-label="Menu">' + links + "</nav>" +
        '<div class="header-tools">' +
          '<div class="lang-toggle" role="group" aria-label="Language / Dil">' +
            '<button type="button" data-lang="tr" lang="tr">TR</button><button type="button" data-lang="en" lang="en">EN</button>' +
          "</div>" +
          '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" data-i18n-attr="aria-label:menu.open"><span></span><span></span></button>' +
        "</div>" +
      "</div></header>" +
      '<div class="menu" id="menu"><ul class="menu-list">' + menuLinks + '</ul>' +
        '<div class="menu-foot"><a class="mono link-u" href="mailto:' + esc(P.email) + '">' + esc(P.email) + '</a><div style="display:flex;gap:14px;flex-wrap:wrap">' + socials + "</div></div></div>";
    var frag = document.createDocumentFragment();
    while (header.firstChild) frag.appendChild(header.firstChild);
    document.body.insertBefore(frag, document.body.firstChild);

    var footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML =
      '<div class="wrap">' +
        '<div class="footer-top">' +
          '<div class="footer-cta"><h2 class="split" data-i18n-html="footer.cta"></h2>' +
            '<p style="margin-top:28px"><a class="btn" href="mailto:' + esc(P.email) + '">' + esc(P.email) + ARROW + "</a></p></div>" +
          '<div class="footer-cols">' +
            '<div><p class="mono" data-i18n="footer.pages"></p><ul>' + NAV.map(function (n) { return '<li><a href="' + n.href + '" data-i18n="' + n.key + '"></a></li>'; }).join("") + "</ul></div>" +
            '<div><p class="mono" data-i18n="footer.social"></p><ul>' + P.socials.map(function (s) { return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + "</a></li>"; }).join("") + "</ul></div>" +
          "</div>" +
        "</div>" +
        '<div class="footer-bottom">' +
          '<span class="mono">© 2026 ' + esc(P.name) + ' — <span data-i18n="footer.rights"></span></span>' +
          '<button type="button" class="mono motion-toggle" aria-pressed="false"></button>' +
          '<a class="mono link-u" href="#top" data-i18n="footer.top"></a>' +
        "</div>" +
        '<div class="footer-word" aria-hidden="true">' + esc(P.first) + "</div>" +
      "</div>";
    document.body.appendChild(footer);

    var extra = document.createElement("div");
    extra.innerHTML = '<div class="grain" aria-hidden="true"></div>' +
      '<a class="wa-float" data-wa href="' + waLink() + '" target="_blank" rel="noopener" data-i18n-attr="aria-label:wa.label;title:wa.label">' + WA_ICON + '<span class="wa-tip" data-i18n="wa.label"></span></a>';
    while (extra.firstChild) document.body.appendChild(extra.firstChild);
  }

  /* =========================================================
     i18n
     ========================================================= */
  function applyI18n() {
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    $$("[data-i18n-html]").forEach(function (el) { el.innerHTML = t(el.getAttribute("data-i18n-html")); });
    $$("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var p = pair.split(":"); if (p.length === 2) el.setAttribute(p[0].trim(), t(p[1].trim()));
      });
    });
    $$("[data-person]").forEach(function (el) {
      var k = el.getAttribute("data-person"), v = L(P[k]);
      if (k === "email") { el.textContent = P.email; if (el.tagName === "A") el.href = "mailto:" + P.email; }
      else if (k === "phone") { el.textContent = P.phone; if (el.tagName === "A") el.href = "tel:" + P.phoneHref; }
      else el.textContent = v;
    });
    $$("[data-wa]").forEach(function (a) { a.href = waLink(L(P.waText)); });
    paintMotionToggle();
    $$(".lang-toggle button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang)); });
    var titleKey = "title." + page;
    if (DICT.tr[titleKey]) document.title = t(titleKey);
    renderers.forEach(function (fn) { fn(); });
    splitAll();
    observeReveals();
  }

  /* ---------- pause / play all ambient motion (WCAG 2.2.2) ---------- */
  var PAUSE_ICON = '<svg viewBox="0 0 12 12" aria-hidden="true"><rect x="2" y="1.5" width="2.6" height="9" fill="currentColor"/><rect x="7.4" y="1.5" width="2.6" height="9" fill="currentColor"/></svg>';
  var PLAY_ICON = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.5v9l7.5-4.5z" fill="currentColor"/></svg>';
  function motionOff() { return document.documentElement.classList.contains("motion-off"); }
  function paintMotionToggle() {
    $$(".motion-toggle").forEach(function (b) {
      var off = motionOff();
      b.setAttribute("aria-pressed", String(off));
      b.innerHTML = (off ? PLAY_ICON : PAUSE_ICON) + "<span>" + t(off ? "motion.play" : "motion.pause") + "</span>";
    });
  }
  /* gallery clips play like GIFs (muted loop) unless motion is paused or reduced */
  var reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
  function syncAmbientVideos() {
    var still = motionOff() || reduceMQ.matches;
    $$("video[data-ambient]").forEach(function (v) {
      v.muted = true;
      if (still) v.pause(); else { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    });
  }
  if (reduceMQ.addEventListener) reduceMQ.addEventListener("change", syncAmbientVideos);
  // tile markup for a gallery item: photo, or a muted looping clip for video items
  function galleryMedia(g, extra) {
    if (g.video) {
      return '<video data-ambient src="' + esc(g.video) + '"' + (g.img ? ' poster="' + esc(g.img) + '"' : "") +
        ' muted loop playsinline preload="metadata" aria-hidden="true"></video>' +
        '<span class="chip ph-badge" aria-hidden="true">▶ Video</span>';
    }
    return '<img src="' + esc(g.img) + '" alt="' + esc(L(g.caption)) + '" loading="lazy"' + (extra || "") + ">";
  }

  function initMotionToggle() {
    try { if (localStorage.getItem("motion") === "off") document.documentElement.classList.add("motion-off"); } catch (e) {}
    $$(".motion-toggle").forEach(function (b) {
      b.addEventListener("click", function () {
        var off = !motionOff();
        document.documentElement.classList.toggle("motion-off", off);
        try { localStorage.setItem("motion", off ? "off" : "on"); } catch (e) {}
        paintMotionToggle();
        syncAmbientVideos();
      });
    });
  }

  function setLang(l) {
    if (l === lang) return;
    lang = l;
    try { localStorage.setItem("lang", l); } catch (e) {}
    document.documentElement.classList.add("lang-swap");
    setTimeout(function () {
      applyI18n();
      document.documentElement.classList.remove("lang-swap");
    }, 260);
  }

  /* =========================================================
     Text splitting + reveals
     ========================================================= */
  function splitAll() {
    $$(".split").forEach(function (el) {
      if (el.querySelector(".w")) return;
      var i = 0, out = document.createDocumentFragment();
      function word(node) {
        var w = document.createElement("span"); w.className = "w";
        var inner = document.createElement("span"); inner.style.setProperty("--i", i++);
        inner.appendChild(node); w.appendChild(inner); return w;
      }
      Array.prototype.slice.call(el.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) out.appendChild(document.createTextNode(" "));
            else out.appendChild(word(document.createTextNode(part)));
          });
        } else if (n.nodeName === "BR") {
          out.appendChild(n.cloneNode());
        } else {
          out.appendChild(word(n.cloneNode(true)));
        }
      });
      el.innerHTML = ""; el.appendChild(out);
    });
  }

  var io = null;
  function observeReveals() {
    var targets = $$(".reveal, .img-reveal, .split, .skills").filter(function (el) { return !el.__obs; });
    if (!("IntersectionObserver" in window)) { targets.forEach(function (el) { el.classList.add("is-in"); }); return; }
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    }
    targets.forEach(function (el) { el.__obs = true; io.observe(el); });
  }

  /* =========================================================
     Page transitions (curtain) + preloader
     ========================================================= */
  function initTransitions() {
    var html = document.documentElement;
    var label = $(".curtain-label");
    if (label) label.innerHTML = '<span class="cl-mask"><span class="cl-text"></span></span>';
    function setLabel(text) {
      if (label) $(".cl-text", label).textContent = text;
    }
    if (html.classList.contains("is-entering")) {
      try {
        var saved = JSON.parse(sessionStorage.getItem("ptl") || "null");
        sessionStorage.removeItem("ptl");
        if (saved) setLabel(saved.t);
      } catch (err) {}
      // hold the covered state briefly so the label is readable, then let columns fall away
      setTimeout(function () {
        html.classList.remove("is-entering");
        html.classList.add("is-entered");
        setTimeout(function () { html.classList.remove("is-entered"); }, 1400);
      }, 180);
    }
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a[href]");
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target === "_blank" || a.hasAttribute("download")) return;
      var href = a.getAttribute("href");
      if (!href || href.charAt(0) === "#" || /^(mailto|tel|javascript):/i.test(href)) return;
      if (a.protocol !== location.protocol || a.host !== location.host) return;
      if (a.pathname === location.pathname && a.search === location.search) return; // same page (maybe hash)
      e.preventDefault();
      var di = -1;
      NAV.forEach(function (n, k) { if (a.pathname.slice(-n.href.length) === n.href) di = k; });
      if (di === -1 && /yazi\.html$/.test(a.pathname)) di = 4; // blog post
      var text = di !== -1 ? t(NAV[di].key) : (a.textContent || "").trim().slice(0, 40);
      setLabel(text);
      document.body.classList.remove("menu-open");
      html.classList.add("is-leaving");
      try {
        sessionStorage.setItem("pt", "1");
        sessionStorage.setItem("ptl", JSON.stringify({ t: text }));
      } catch (err) {}
      // last column starts at 4 × 75ms and runs 800ms; leave once the screen is covered
      setTimeout(function () { location.href = a.href; }, 1150);
    });
    window.addEventListener("pageshow", function (e) {
      if (e.persisted) html.classList.remove("is-leaving", "is-entering");
    });
  }

  function initPreloader() {
    var pre = $(".preloader");
    if (!pre || document.documentElement.classList.contains("no-loader")) { if (pre) pre.remove(); return; }
    try { sessionStorage.setItem("seen", "1"); } catch (e) {}
    var count = $(".preloader-count", pre), bar = $(".preloader-bar i", pre);
    var start = performance.now(), dur = 1500;
    document.body.style.overflow = "hidden";
    (function tick(now) {
      var p = Math.min(1, (now - start) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      count.textContent = Math.round(e * 100);
      bar.style.transform = "scaleX(" + e + ")";
      if (p < 1) requestAnimationFrame(tick);
      else {
        pre.classList.add("is-done");
        document.body.style.overflow = "";
        setTimeout(function () { pre.remove(); }, 1100);
      }
    })(start);
  }

  /* =========================================================
     Header / menu / cursor / misc
     ========================================================= */
  function initHeader() {
    var hdr = $(".site-header"), last = 0;
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      hdr.classList.toggle("is-scrolled", y > 20);
      if (!document.body.classList.contains("menu-open")) hdr.classList.toggle("is-hidden", y > last && y > 300);
      last = y;
    }, { passive: true });

    var btn = $(".menu-btn");
    btn.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", t(open ? "menu.close" : "menu.open"));
      // move focus into the menu on open; give it back to the button on close
      if (open) setTimeout(function () { var first = $(".menu-list a"); if (first) first.focus({ preventScroll: true }); }, 60);
      else btn.focus({ preventScroll: true });
    });
    document.addEventListener("keydown", function (e) {
      if (!document.body.classList.contains("menu-open")) return;
      if (e.key === "Escape") { btn.click(); return; }
      if (e.key === "Tab") { // keep Tab inside menu + its toggle button
        var f = [btn].concat($$("#menu a"));
        var i = f.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
        else if (i === -1) { e.preventDefault(); f[0].focus(); }
      }
    });
    $$(".lang-toggle button").forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
    });
    $$('a[href="#top"]').forEach(function (a) {
      a.addEventListener("click", function (e) { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); });
    });
  }

  /* ---------- Cursor Ghost ----------
     N copies of the arrow trail the real pointer. Copy i lerps toward copy i-1
     (copy 0 toward the pointer), lagging harder and blurring more each step.
     Opacity is scaled by min(1, distance / (size * 0.5)) so ghosts vanish at rest.
     Never hides the native cursor; overlay is pointer-events:none + aria-hidden. */
  function initGhostCursor() {
    var CFG = { ghosts: 4, size: 26, head: 0.26, smear: 5, color: "#FFFFFF" };
    var ARROW = '<svg viewBox="0 0 18 26" aria-hidden="true" focusable="false"><path d="M1 1 V21.2 L6.1 16.4 L9.5 24.6 L13.1 23.1 L9.8 15.2 H16.9 Z" fill="currentColor"/></svg>';
    var fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    var calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    var layer = null, ghosts = [], raf = 0;
    var px = 0, py = 0, active = false, dim = 1;

    function onMove(e) {
      px = e.clientX; py = e.clientY;
      if (!active) { active = true; ghosts.forEach(function (g) { g.x = px; g.y = py; }); }
      var hit = e.target && e.target.closest && e.target.closest("a, button, input");
      dim = hit ? 0.45 : 1; // softer trail behind the native hand/text cursor
    }
    function onLeave(e) {
      if (e.relatedTarget) return;
      active = false;
      ghosts.forEach(function (g) { g.el.style.opacity = "0"; });
    }
    function tick() {
      raf = requestAnimationFrame(tick);
      if (!active) return;
      var tx = px, ty = py;
      for (var i = 0; i < ghosts.length; i++) {
        var g = ghosts[i];
        var k = CFG.head * Math.pow(0.8, i);          // each copy lags harder
        g.x += (tx - g.x) * k;
        g.y += (ty - g.y) * k;
        var dist = Math.sqrt((px - g.x) * (px - g.x) + (py - g.y) * (py - g.y));
        var fade = Math.min(1, dist / (CFG.size * 0.5));
        g.el.style.transform = "translate3d(" + (g.x - 1).toFixed(2) + "px," + (g.y - 1).toFixed(2) + "px,0)";
        g.el.style.opacity = (g.base * fade * dim).toFixed(3);
        tx = g.x; ty = g.y;
      }
    }
    function mount() {
      layer = document.createElement("div");
      layer.className = "ghost-layer";
      layer.setAttribute("aria-hidden", "true");
      layer.style.setProperty("--ghost-size", CFG.size + "px");
      layer.style.setProperty("--ghost-color", CFG.color);
      for (var i = 0; i < CFG.ghosts; i++) {
        var el = document.createElement("span");
        el.className = "ghost";
        el.innerHTML = ARROW;
        el.style.filter = "blur(" + (CFG.smear * (i + 1) / CFG.ghosts).toFixed(2) + "px)";
        layer.appendChild(el);
        ghosts.push({ el: el, x: 0, y: 0, base: 0.6 * (1 - i / (CFG.ghosts + 1)) });
      }
      document.body.appendChild(layer);
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerout", onLeave);
      raf = requestAnimationFrame(tick);
    }
    function unmount() {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onLeave);
      if (layer) layer.remove();
      layer = null; ghosts = []; active = false;
    }
    function sync() {
      var want = fine.matches && !calm.matches;
      if (want && !layer) mount();
      else if (!want && layer) unmount();
    }
    [fine, calm].forEach(function (m) {
      if (m.addEventListener) m.addEventListener("change", sync); else m.addListener(sync);
    });
    window.addEventListener("pagehide", unmount);
    window.addEventListener("pageshow", function (e) { if (e.persisted) sync(); });
    sync();
  }

  // Shrink the hero name until its longest line fits (long surnames).
  function fitHero() {
    var h = $(".hero-title");
    if (!h) return;
    h.style.fontSize = "";
    var avail = h.clientWidth;
    // padding-left on line 2 does not scale with font size, so correct in a few passes
    for (var pass = 0; pass < 4; pass++) {
      var size = parseFloat(getComputedStyle(h).fontSize), max = 0;
      $$(".line", h).forEach(function (l) { max = Math.max(max, l.scrollWidth); });
      if (max <= avail) break;
      h.style.fontSize = (size * avail / max * 0.98) + "px";
    }
  }
  // Same idea for the big outlined word in the footer.
  function fitFooterWord() {
    var w = $(".footer-word");
    if (!w) return;
    w.style.fontSize = "";
    var size = parseFloat(getComputedStyle(w).fontSize);
    if (w.scrollWidth > w.clientWidth) w.style.fontSize = (size * w.clientWidth / w.scrollWidth * 0.96) + "px";
  }
  function fitAll() { fitHero(); fitFooterWord(); }
  function initFitHero() {
    fitAll();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);
    var tm; window.addEventListener("resize", function () { clearTimeout(tm); tm = setTimeout(fitAll, 120); });
  }

  function initClock() {
    var els = $$("[data-clock]");
    if (!els.length) return;
    function upd() {
      var s;
      try { s = new Intl.DateTimeFormat("tr-TR", { hour: "2-digit", minute: "2-digit", timeZone: P.timezone }).format(new Date()); }
      catch (e) { var d = new Date(); s = pad(d.getHours()) + ":" + pad(d.getMinutes()); }
      els.forEach(function (el) { el.textContent = s; });
    }
    upd(); setInterval(upd, 20000);
  }

  /* =========================================================
     Shared fragments
     ========================================================= */
  function blogCard(p) {
    return '<a class="bcard reveal" href="yazi.html?s=' + encodeURIComponent(p.slug) + '">' +
      '<div class="bcard-top"><span class="mono">' + esc(fmtDate(p.date)) + '</span><span class="mono">' + p.minutes + " " + t("blog.min") + "</span></div>" +
      '<div class="chips">' + L(p.category).map(function (c) { return '<span class="chip chip--teal">' + esc(c) + "</span>"; }).join("") + "</div>" +
      '<h3 class="h3">' + esc(L(p.title)) + "</h3>" +
      "<p>" + esc(L(p.excerpt)) + "</p>" +
      '<div class="chips">' + p.tags.map(function (g) { return '<span class="chip">#' + esc(g) + "</span>"; }).join("") + "</div>" +
      '<span class="mono teal">' + t("readmore") + " →</span>" +
    "</a>";
  }
  function bindCardGlow(root) {
    $$(".bcard", root).forEach(function (c) {
      c.addEventListener("pointermove", function (e) {
        var r = c.getBoundingClientRect();
        c.style.setProperty("--mx", (e.clientX - r.left) + "px");
        c.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
  }
  function initStripDrag(strip) {
    var down = false, sx = 0, sl = 0, moved = false;
    strip.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse") return;
      down = true; moved = false; sx = e.clientX; sl = strip.scrollLeft; strip.classList.add("is-drag");
    });
    window.addEventListener("pointermove", function (e) {
      if (!down) return;
      var dx = e.clientX - sx; if (Math.abs(dx) > 4) moved = true;
      strip.scrollLeft = sl - dx;
    });
    window.addEventListener("pointerup", function () { down = false; strip.classList.remove("is-drag"); });
    strip.addEventListener("click", function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
    strip.addEventListener("wheel", function (e) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && window.matchMedia("(min-width: 1100px)").matches) {
        var max = strip.scrollWidth - strip.clientWidth;
        if ((e.deltaY > 0 && strip.scrollLeft < max - 1) || (e.deltaY < 0 && strip.scrollLeft > 0)) {
          e.preventDefault(); strip.scrollLeft += e.deltaY;
        }
      }
    }, { passive: false });
  }

  /* =========================================================
     Page: HOME (one-page overview)
     ========================================================= */
  function pageHome() {
    var featured = S.projects.filter(function (p) { return p.featured; });
    var preview = $(".hover-preview"), pimg = preview && $("img", preview);

    renderers.push(function () {
      var st = $("#homeStats");
      if (st) st.innerHTML =
        "<div><strong>" + P.stats.projects + '</strong><span class="mono">' + t("home.stat1") + "</span></div>" +
        "<div><strong>" + S.tools.length + '</strong><span class="mono">' + t("home.stat2") + "</span></div>" +
        "<div><strong>" + P.stats.years + '</strong><span class="mono">' + t("home.stat3") + "</span></div>";

      $("#homeProjects").innerHTML = featured.map(function (p, i) {
        return '<a class="plist-item reveal" href="projeler.html#' + p.id + '" data-preview="' + esc(p.img) + '">' +
          '<span class="num mono">' + pad(i + 1) + "</span>" +
          '<h3 class="h3">' + esc(L(p.title)) + "</h3>" +
          '<div class="meta"><span class="chip chip--teal">' + esc(L(S.courses[p.course])) + '</span><span class="chip">' + p.year + "</span></div>" +
          '<div class="thumb"><img src="' + esc(p.img) + '" alt="' + esc(L(p.title)) + '" loading="lazy"></div>' +
        "</a>";
      }).join("");

      $("#homeGallery").innerHTML = S.gallery.slice(0, 8).map(function (g, i) {
        return '<figure><div class="ph img-reveal">' + galleryMedia(g, ' draggable="false"') + "</div>" +
          '<figcaption><span class="mono">' + pad(i + 1) + " / " + esc(L(g.place)) + "</span></figcaption></figure>";
      }).join("");
      syncAmbientVideos();

      $("#homeBlog").innerHTML = S.posts.map(blogCard).join("");
      bindCardGlow($("#homeBlog"));

      if (preview) {
        $$(".plist-item").forEach(function (it) {
          it.addEventListener("pointerenter", function () { pimg.src = it.getAttribute("data-preview"); preview.classList.add("is-on"); });
          it.addEventListener("pointerleave", function () { preview.classList.remove("is-on"); });
        });
      }
    });

    if (preview) {
      var px = 0, py = 0, tx = 0, ty = 0;
      window.addEventListener("pointermove", function (e) { tx = e.clientX; ty = e.clientY; }, { passive: true });
      (function loop() {
        px += (tx - px) * 0.12; py += (ty - py) * 0.12;
        preview.style.left = px + "px"; preview.style.top = py + "px";
        requestAnimationFrame(loop);
      })();
    }
    var strip = $(".strip");
    initStripDrag(strip);
    // scrollable region must be reachable by keyboard (←/→ scroll it once focused)
    strip.setAttribute("tabindex", "0");
    strip.setAttribute("role", "region");
    strip.setAttribute("data-i18n-attr", "aria-label:home.gallery.title");

    // one-page chapter index
    var links = $$(".chapters a");
    if (links.length && "IntersectionObserver" in window) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) links.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id); });
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      $$("[data-chapter]").forEach(function (s) { cio.observe(s); });
    }
  }

  /* =========================================================
     Page: ABOUT
     ========================================================= */
  function pageAbout() {
    renderers.push(function () {
      $("#portrait").src = P.portrait;
      $("#portrait").alt = P.name + " — " + t("about.photo");
      $("#edu").innerHTML = S.education.map(function (e) {
        return '<li class="reveal">' + (e.years ? '<span class="mono teal">' + esc(e.years) + "</span>" : "") +
          "<h4>" + esc(L(e.school)) + "</h4><p>" + esc(L(e.dept)) + "</p>" + (L(e.note) ? "<p>" + esc(L(e.note)) + "</p>" : "") + "</li>";
      }).join("");
      var sk = $("#skills");
      sk.innerHTML = S.skills.map(function (s) {
        if (s.v == null) return "<li><span>" + esc(L(s.name)) + "</span><span></span></li>";
        return "<li><span>" + esc(L(s.name)) + '</span><span class="mono">' + Math.round(s.v * 100) + '%</span><span class="meter"><i style="--v:' + s.v + '"></i></span></li>';
      }).join("");
      sk.classList.remove("is-in"); sk.__obs = false;
      $("#tools").innerHTML = S.tools.map(function (x) { return '<span class="chip" lang="en">' + esc(x) + "</span>"; }).join("");
      $("#interests").innerHTML = L(S.interests).map(function (x) { return '<span class="chip chip--teal">' + esc(x) + "</span>"; }).join("");
    });
  }

  /* =========================================================
     Page: PROJECTS
     ========================================================= */
  function pageProjects() {
    var current = "all";
    function applyFilter() {
      $$(".pcard").forEach(function (c) { c.classList.toggle("is-hidden", current !== "all" && c.getAttribute("data-course") !== current); });
      $$("#filters button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-f") === current)); });
    }
    renderers.push(function () {
      var keys = Object.keys(S.courses).filter(function (k) { return S.projects.some(function (p) { return p.course === k; }); });
      $("#filters").innerHTML = '<button class="chip" type="button" data-f="all">' + t("all") + " · " + S.projects.length + "</button>" +
        keys.map(function (k) {
          var n = S.projects.filter(function (p) { return p.course === k; }).length;
          return '<button class="chip" type="button" data-f="' + k + '">' + esc(L(S.courses[k])) + " · " + n + "</button>";
        }).join("");
      $$("#filters button").forEach(function (b) { b.addEventListener("click", function () { current = b.getAttribute("data-f"); applyFilter(); }); });

      $("#pgrid").innerHTML = S.projects.map(function (p, i) {
        return '<article class="pcard reveal" id="' + p.id + '" data-course="' + p.course + '">' +
          '<button type="button" class="pcard-media img-reveal" data-open="' + i + '" aria-label="' + esc(t("pm.open") + ": " + L(p.title)) + '">' +
            '<img src="' + esc(p.img) + '" alt="' + esc(L(p.title)) + '" loading="lazy"><span class="chip">' + esc(L(S.courses[p.course])) + "</span>" +
            (p.before ? '<span class="chip chip--ba" lang="' + lang + '">' + t("pm.before") + " / " + t("pm.after") + "</span>" : "") +
          "</button>" +
          '<div class="pcard-top"><h3 class="h3">' + esc(L(p.title)) + '</h3><span class="mono">' + pad(i + 1) + " — " + p.year + "</span></div>" +
          "<p>" + esc(L(p.desc)) + "</p>" +
          '<div class="chips">' + p.tags.map(function (g) { return '<span class="chip" lang="en">' + esc(g) + "</span>"; }).join("") + "</div>" +
          '<button type="button" class="pcard-more mono teal link-u" data-open="' + i + '">' + t("pm.open") + " →</button>" +
        "</article>";
      }).join("");
      $$("#pgrid [data-open]").forEach(function (b) {
        b.addEventListener("click", function () { openModal(+b.getAttribute("data-open")); });
      });
      applyFilter();
      if (modal.classList.contains("is-open")) renderModal();
    });

    /* ---------- project detail modal ---------- */
    var X = '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 2l12 12M14 2L2 14" stroke="currentColor" stroke-width="1.4"/></svg>';
    var PREV = '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M15 8H1M6 3L1 8l5 5" stroke="currentColor" stroke-width="1.4"/></svg>';
    var NEXT = '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M1 8h14M10 3l5 5-5 5" stroke="currentColor" stroke-width="1.4"/></svg>';
    var modal = document.createElement("div");
    modal.className = "pmodal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("aria-labelledby", "pmTitle");
    modal.innerHTML =
      '<div class="pmodal-panel">' +
        '<div class="pmodal-bar"><span class="mono pm-count"></span><div class="pm-nav">' +
          '<button type="button" class="icon-btn" data-pm="prev">' + PREV + '</button>' +
          '<button type="button" class="icon-btn" data-pm="next">' + NEXT + '</button>' +
          '<button type="button" class="icon-btn" data-pm="close">' + X + '</button>' +
        "</div></div>" +
        '<div class="pm-content"></div>' +
      "</div>";
    document.body.appendChild(modal);
    var panel = $(".pmodal-panel", modal), content = $(".pm-content", modal);
    var cur = 0, lastFocus = null;

    function baSlider(p) {
      return '<div class="ba" style="--pos:50%">' +
        '<img class="ba-img" src="' + esc(p.img) + '" alt="' + esc(L(p.title) + " — " + t("pm.after")) + '">' +
        '<img class="ba-img ba-before" src="' + esc(p.before) + '" alt="' + esc(L(p.title) + " — " + t("pm.before")) + '">' +
        '<span class="ba-line" aria-hidden="true"><i>' + PREV + NEXT + "</i></span>" +
        '<span class="ba-tag ba-tag--l mono">' + t("pm.before") + '</span><span class="ba-tag ba-tag--r mono">' + t("pm.after") + "</span>" +
        '<input class="ba-range" type="range" min="0" max="100" value="50" step="1" aria-label="' + esc(t("pm.compare")) + '">' +
      "</div>";
    }
    function renderModal() {
      var p = S.projects[cur];
      $(".pm-count", modal).textContent = pad(cur + 1) + " / " + pad(S.projects.length);
      $('[data-pm="prev"]', modal).setAttribute("aria-label", t("pm.prev"));
      $('[data-pm="next"]', modal).setAttribute("aria-label", t("pm.next"));
      $('[data-pm="close"]', modal).setAttribute("aria-label", t("pm.close"));
      var links = (p.links || []).filter(function (l) { return l && l.url; });
      content.innerHTML =
        '<div class="pm-media">' + (p.before ? baSlider(p) : '<img src="' + esc(p.img) + '" alt="' + esc(L(p.title)) + '">') + "</div>" +
        '<div class="pm-body">' +
          '<div class="pm-main">' +
            '<p class="mono teal">' + esc(L(S.courses[p.course])) + "</p>" +
            '<h2 class="h2" id="pmTitle">' + esc(L(p.title)) + "</h2>" +
            '<p class="pm-lead">' + esc(L(p.desc)) + "</p>" +
            (p.detail ? '<p class="dim">' + esc(L(p.detail)) + "</p>" : "") +
          "</div>" +
          '<dl class="pm-meta">' +
            '<div><dt class="mono">' + t("pm.course") + "</dt><dd>" + esc(L(S.courses[p.course])) + "</dd></div>" +
            '<div><dt class="mono">' + t("pm.year") + "</dt><dd>" + esc(p.year) + "</dd></div>" +
            '<div><dt class="mono">' + t("pm.tools") + '</dt><dd class="chips">' + p.tags.map(function (g) { return '<span class="chip" lang="en">' + esc(g) + "</span>"; }).join("") + "</dd></div>" +
            (links.length ? '<div><dt class="mono">' + t("pm.links") + "</dt><dd>" + links.map(function (l) { return '<a class="link-u" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + " ↗</a>"; }).join("<br>") + "</dd></div>" : "") +
          "</dl>" +
        "</div>" +
        (p.process && p.process.length ?
          '<div class="pm-process"><h3 class="mono">' + t("pm.process") + '</h3><div class="pm-steps">' +
            p.process.map(function (s, k) {
              return '<figure><div class="pm-step-img"><img src="' + esc(s.img) + '" alt="' + esc(L(s.caption)) + '" loading="lazy"></div>' +
                '<figcaption class="mono"><span class="teal">' + pad(k + 1) + "</span> " + esc(L(s.caption)) + "</figcaption></figure>";
            }).join("") +
            '<figure><div class="pm-step-img"><img src="' + esc(p.img) + '" alt="' + esc(L(p.title)) + '" loading="lazy"></div>' +
              '<figcaption class="mono"><span class="teal">' + pad(p.process.length + 1) + "</span> " + t("pm.after") + "</figcaption></figure>" +
          "</div></div>" : "");
      var ba = $(".ba", content);
      if (ba) {
        var range = $(".ba-range", ba);
        range.addEventListener("input", function () { ba.style.setProperty("--pos", range.value + "%"); });
      }
      panel.scrollTop = 0;
    }
    function openModal(i) {
      cur = (i + S.projects.length) % S.projects.length;
      if (!modal.classList.contains("is-open")) lastFocus = document.activeElement;
      renderModal();
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      try { history.replaceState(null, "", "#" + S.projects[cur].id); } catch (e) {}
      var closeBtn = $('[data-pm="close"]', modal);
      requestAnimationFrame(function () { closeBtn.focus({ preventScroll: true }); });
      setTimeout(function () { if (modal.classList.contains("is-open") && !panel.contains(document.activeElement)) closeBtn.focus({ preventScroll: true }); }, 120);
    }
    function closeModal() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    $('[data-pm="close"]', modal).addEventListener("click", closeModal);
    $('[data-pm="prev"]', modal).addEventListener("click", function () { openModal(cur - 1); });
    $('[data-pm="next"]', modal).addEventListener("click", function () { openModal(cur + 1); });
    modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", function (e) {
      if (!modal.classList.contains("is-open")) return;
      if (e.key === "Escape") { closeModal(); return; }
      var onRange = e.target && e.target.classList && e.target.classList.contains("ba-range");
      if (!onRange && e.key === "ArrowLeft") openModal(cur - 1);
      if (!onRange && e.key === "ArrowRight") openModal(cur + 1);
      if (e.key === "Tab") { // keep focus inside the dialog
        var f = $$('button, a[href], input', panel).filter(function (el) { return el.offsetParent !== null; });
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    });
    // projeler.html#id (e.g. from the home page list) opens that project
    pageProjects.openFromHash = function () {
      var id = location.hash.slice(1), k = -1;
      S.projects.forEach(function (p, n) { if (p.id === id) k = n; });
      if (k !== -1) setTimeout(function () { openModal(k); }, 350);
    };
  }

  /* =========================================================
     Page: GALLERY (+ lightbox)
     ========================================================= */
  function pageGallery() {
    var lb = $(".lightbox"), img = $(".lightbox-stage img", lb), cap = $(".lightbox-foot p", lb), cnt = $(".lightbox-count", lb);
    var idx = 0, lastFocus = null;
    // video items open in the lightbox with controls (sound available)
    var lbVideo = document.createElement("video");
    lbVideo.className = "lb-video"; lbVideo.controls = true; lbVideo.loop = true; lbVideo.playsInline = true; lbVideo.hidden = true;
    $(".lightbox-stage", lb).appendChild(lbVideo);
    function show(i) {
      idx = (i + S.gallery.length) % S.gallery.length;
      var g = S.gallery[idx];
      img.style.opacity = 0;
      lbVideo.pause();
      setTimeout(function () {
        if (g.video) {
          img.hidden = true; lbVideo.hidden = false;
          if (lbVideo.getAttribute("src") !== g.video) lbVideo.src = g.video;
          lbVideo.setAttribute("aria-label", L(g.caption));
          var p = lbVideo.play(); if (p && p.catch) p.catch(function () {});
        } else {
          lbVideo.hidden = true; img.hidden = false;
          img.src = g.img; img.alt = L(g.caption); img.style.opacity = 1;
        }
      }, 150);
      cap.textContent = L(g.place) + " — " + L(g.caption);
      cnt.textContent = pad(idx + 1) + " / " + pad(S.gallery.length);
    }
    function open(i) { lastFocus = document.activeElement; show(i); lb.classList.add("is-open"); lb.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; $("[data-lb=close]", lb).focus(); }
    function close() { lbVideo.pause(); lb.classList.remove("is-open"); lb.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; if (lastFocus) lastFocus.focus(); }
    $("[data-lb=close]", lb).addEventListener("click", close);
    $("[data-lb=prev]", lb).addEventListener("click", function () { show(idx - 1); });
    $("[data-lb=next]", lb).addEventListener("click", function () { show(idx + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb || e.target.classList.contains("lightbox-stage")) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
      if (e.key === "Tab") { // focus trap inside the lightbox
        var f = $$("button", lb);
        var k = f.indexOf(document.activeElement);
        if (e.shiftKey && k <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && (k === f.length - 1 || k === -1)) { e.preventDefault(); f[0].focus(); }
      }
    });
    var sx = null;
    lb.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (sx == null) return; var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1)); sx = null;
    });

    renderers.push(function () {
      $("#masonry").innerHTML = S.gallery.map(function (g, i) {
        return '<figure class="reveal"><button type="button" class="ph img-reveal" data-i="' + i + '" style="display:block;width:100%" aria-label="' + esc(L(g.caption)) + '">' +
          galleryMedia(g) + "</button>" +
          '<figcaption><p>' + esc(L(g.caption)) + '</p><span class="mono">' + pad(i + 1) + "</span></figcaption></figure>";
      }).join("");
      $$("#masonry [data-i]").forEach(function (b) { b.addEventListener("click", function () { open(+b.getAttribute("data-i")); }); });
      syncAmbientVideos();
      if (lb.classList.contains("is-open")) show(idx);
    });
  }

  /* =========================================================
     Page: BLOG list
     ========================================================= */
  function pageBlog() {
    var current = "all";
    renderers.push(function () {
      var cats = [];
      S.posts.forEach(function (p) { L(p.category).forEach(function (c) { if (cats.indexOf(c) === -1) cats.push(c); }); });
      if (current !== "all" && cats.indexOf(current) === -1) current = "all";
      var f = $("#bfilters");
      f.innerHTML = '<button class="chip" type="button" data-f="all">' + t("all") + "</button>" +
        cats.map(function (c) { return '<button class="chip" type="button" data-f="' + esc(c) + '">' + esc(c) + "</button>"; }).join("");
      function draw() {
        var list = S.posts.filter(function (p) { return current === "all" || L(p.category).indexOf(current) !== -1; });
        $("#bgrid").innerHTML = list.map(blogCard).join("");
        bindCardGlow($("#bgrid"));
        $$("button", f).forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-f") === current)); });
        observeReveals();
      }
      $$("button", f).forEach(function (b) { b.addEventListener("click", function () { current = b.getAttribute("data-f"); draw(); }); });
      draw();
    });
  }

  /* =========================================================
     Page: single POST
     ========================================================= */
  function pagePost() {
    var slug = new URLSearchParams(location.search).get("s") || S.posts[0].slug;

    // reading progress: thin bar at the top that fills as the article is read
    var bar = document.createElement("div");
    bar.className = "read-progress";
    bar.setAttribute("aria-hidden", "true");
    bar.innerHTML = "<i></i>";
    document.body.appendChild(bar);
    var fill = bar.firstChild, ticking = false;
    function progress() {
      ticking = false;
      var a = $("#post .prose") || $("#post");
      if (!a) return;
      var r = a.getBoundingClientRect();
      var span = r.height - window.innerHeight * 0.5;       // done when the last lines reach mid-screen
      var p = span > 0 ? (window.innerHeight * 0.5 - r.top) / span : 1;
      fill.style.transform = "scaleX(" + Math.max(0, Math.min(1, p)).toFixed(4) + ")";
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(progress); } }, { passive: true });
    window.addEventListener("resize", progress);
    setTimeout(progress, 300);
    renderers.push(function () {
      var i = -1;
      S.posts.forEach(function (p, k) { if (p.slug === slug) i = k; });
      var root = $("#post");
      if (i === -1) { root.innerHTML = '<p class="lead">' + t("blog.notfound") + '</p><p style="margin-top:24px"><a class="btn" href="blog.html">' + t("blog.back") + "</a></p>"; return; }
      var p = S.posts[i], prev = S.posts[i - 1], next = S.posts[i + 1];
      document.title = L(p.title) + " — " + P.name;
      $("#postTitle").textContent = L(p.title);
      $("#postExcerpt").textContent = L(p.excerpt);
      root.innerHTML =
        '<div class="article-meta">' +
          '<div><span class="mono">' + t("blog.category") + '</span><div class="chips">' + L(p.category).map(function (c) { return '<span class="chip chip--teal">' + esc(c) + "</span>"; }).join("") + "</div></div>" +
          '<div><span class="mono">' + t("blog.tags") + '</span><div class="chips">' + p.tags.map(function (g) { return '<span class="chip">#' + esc(g) + "</span>"; }).join("") + "</div></div>" +
          '<div><span class="mono">' + t("blog.date") + "</span><span>" + esc(fmtDate(p.date)) + "</span></div>" +
          '<div><span class="mono">' + t("blog.read") + "</span><span>" + p.minutes + " " + t("blog.min") + "</span></div>" +
        "</div>" +
        '<div class="prose reveal">' + L(p.body) + "</div>" +
        '<nav class="article-nav" aria-label="Posts">' +
          (prev ? '<a href="yazi.html?s=' + prev.slug + '"><span class="mono">' + t("blog.prev") + '</span><span class="h3" style="font-size:20px">' + esc(L(prev.title)) + "</span></a>" : '<a href="blog.html"><span class="mono">' + t("blog.back") + '</span><span class="h3" style="font-size:20px">' + t("blog.title") + "</span></a>") +
          (next ? '<a href="yazi.html?s=' + next.slug + '"><span class="mono">' + t("blog.next") + '</span><span class="h3" style="font-size:20px">' + esc(L(next.title)) + "</span></a>" : '<a href="blog.html"><span class="mono">' + t("blog.back") + '</span><span class="h3" style="font-size:20px">' + t("blog.title") + "</span></a>") +
        "</nav>";
    });
  }

  /* =========================================================
     Page: CONTACT
     ========================================================= */
  function pageContact() {
    renderers.push(function () {
      $("#socialList").innerHTML = P.socials.map(function (s) { return '<a class="chip" href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + " ↗</a>"; }).join("");
      var map = $("#mapFrame");
      var src = "https://maps.google.com/maps?q=" + encodeURIComponent(P.mapQuery) + "&z=13&hl=" + lang + "&output=embed";
      if (map.getAttribute("src") !== src) map.setAttribute("src", src);
      map.title = t("contact.map") + " — " + P.mapQuery;
    });

    var form = $("#contactForm"), status = $("#formStatus");
    // tie each error message to its field so screen readers announce it (WCAG 3.3.1)
    $$(".field", form).forEach(function (f) {
      var inp = $("input, textarea", f), err = $(".err", f);
      if (inp && err && inp.id) { err.id = inp.id + "-err"; inp.setAttribute("aria-describedby", err.id); }
    });
    function validate() {
      var ok = true;
      $$(".field", form).forEach(function (f) {
        var inp = $("input, textarea", f), err = $(".err", f), msg = "";
        if (!inp.value.trim()) msg = t("err.required");
        else if (inp.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value.trim())) msg = t("err.email");
        f.classList.toggle("is-invalid", !!msg); err.textContent = msg;
        inp.setAttribute("aria-invalid", String(!!msg));
        if (msg) ok = false;
      });
      return ok;
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.className = "form-status mono";
      if (!validate()) { var bad = $(".is-invalid input, .is-invalid textarea", form); if (bad) bad.focus(); return; }
      var el = form.elements;
      if (el.namedItem("_honey").value) return;
      var btn = $("button[type=submit] span", form), label = btn.textContent;
      btn.textContent = t("form.sending");
      function v(n) { return el.namedItem(n).value.trim(); }
      var data = {
        name: v("name"), email: v("email"), subject: v("subject"), message: v("message"),
        _subject: "Portfolyo: " + v("subject"), _template: "table", _captcha: "false"
      };
      fetch(S.formEndpoint + encodeURIComponent(P.email), {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data)
      }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then(function () { status.textContent = t("form.ok"); status.classList.add("ok"); form.reset(); })
        .catch(function () { status.textContent = t("form.bad"); status.classList.add("bad"); })
        .then(function () { btn.textContent = label; });
    });
    // Same form, sent as a prefilled WhatsApp message (no server needed).
    $("#waSend").addEventListener("click", function () {
      status.className = "form-status mono";
      if (!validate()) { var bad = $(".is-invalid input, .is-invalid textarea", form); if (bad) bad.focus(); return; }
      var el = form.elements;
      function v(n) { return el.namedItem(n).value.trim(); }
      var text = L(P.waText) + "\n\n" +
        t("wa.f.name") + ": " + v("name") + "\n" +
        t("wa.f.email") + ": " + v("email") + "\n" +
        t("wa.f.subject") + ": " + v("subject") + "\n\n" +
        v("message");
      window.open(waLink(text), "_blank", "noopener");
    });
    $$("input, textarea", form).forEach(function (i) {
      i.addEventListener("blur", function () { if (i.closest(".field").classList.contains("is-invalid")) validate(); });
    });
  }

  /* =========================================================
     Boot
     ========================================================= */
  buildShell();
  initMotionToggle();
  ({ home: pageHome, about: pageAbout, projects: pageProjects, gallery: pageGallery, blog: pageBlog, post: pagePost, contact: pageContact }[page] || function () {})();
  applyI18n();
  initHeader();
  initGhostCursor();
  initClock();
  initFitHero();
  initTransitions();
  initPreloader();
  if (window.initScenes) window.initScenes();

  // deep link: projeler.html#id opens the project modal; elsewhere scroll to the element
  if (location.hash && page === "projects" && pageProjects.openFromHash) {
    pageProjects.openFromHash();
  } else if (location.hash && page !== "home") {
    var target = document.getElementById(location.hash.slice(1));
    if (target) setTimeout(function () { target.scrollIntoView({ behavior: "smooth", block: "center" }); target.classList.add("is-in"); }, 400);
  }
})();
