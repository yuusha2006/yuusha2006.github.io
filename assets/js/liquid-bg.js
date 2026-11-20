/* =========================================================
   "Liquid Wave" — dithered generative background (Canvas 2D).
   Port of the DotForge reference (dither.ts / effects.ts / postfx.ts /
   engine.ts / mount.ts), trimmed to the paths this look uses:
   Liquid Wave effect → bayer4 ordered dither → 3-colour "blend" accent
   → bloom → nearest-neighbour blit.
   Kept as one classic script (no ES modules) so the site still runs
   when opened straight from the zip via file://.
   Colours are retuned to the site palette and dimmed (see INPUT).
   ========================================================= */
(function () {
  "use strict";

  /* ---------- settings (reference values; colours re-tuned) ---------- */
  var INPUT = {
    speed: 0.6,
    intensity: 60,
    scale: 5,
    targetFps: 60,
    fgColor: "#1e1e1e",      // was #0088ff  -> dark grey (black & white palette)
    bgColor: "#070707",      // was #000816  -> site --bg
    accentColor: "#454545",  // was #00ccff  -> mid grey
    accentMix: 40,
    accentMixMode: "blend",
    threshold: 128,
    spread: 50,
    pixelSize: 2,
    randomness: 0,
    postfx: [{ id: "bloom", intensity: 50 }]
  };
  var MAX_LONG = 460;

  /* ---------- dither.ts (bayer4 + renderer) ---------- */
  var BAYER4 = [
    [0, 8, 2, 10],
    [12, 4, 14, 6],
    [3, 11, 1, 9],
    [15, 7, 13, 5]
  ].map(function (r) { return r.map(function (v) { return v / 16; }); });

  var ihash = function (seed) {
    return ((Math.imul(seed >>> 0, 2654435761) >>> 0) % 4294967296) / 4294967296;
  };

  var SAMPLERS = {
    bayer4: function (x, y) { return BAYER4[y & 3][x & 3]; }
  };

  function applyToBuffer(src, w, h, opts) {
    var out = new Uint8Array(w * h);
    var sample = SAMPLERS.bayer4;
    var th = opts.threshold / 255;
    var spread = opts.spread / 100;
    var basePS = Math.max(1, Math.round(opts.pixelSize));
    var rAmt = opts.randomness / 100;

    var blockPS = null;
    var bx = 0;
    if (rAmt > 0.01) {
      bx = Math.ceil(w / basePS);
      var by = Math.ceil(h / basePS);
      blockPS = new Int16Array(bx * by);
      for (var bi = 0; bi < blockPS.length; bi++) {
        var sizeH = ihash(bi * 2246822519 + 3266489917);
        blockPS[bi] = Math.max(1, Math.round(basePS + (sizeH - 0.5) * 2 * rAmt * basePS * 1.5));
      }
    }

    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        var i = y * w + x;
        var ps = basePS;
        if (blockPS) {
          var bIdx = Math.floor(y / basePS) * bx + Math.floor(x / basePS);
          ps = blockPS[bIdx] || basePS;
        }
        var qx = Math.floor(x / ps);
        var qy = Math.floor(y / ps);
        var patternVal = sample(qx, qy);
        var value = Math.abs(src[i]);
        var adjusted = value + (patternVal - 0.5) * spread;
        out[i] = adjusted > th ? 1 : 0;
      }
    }
    return out;
  }

  var lerp = function (a, b, t) { return a + (b - a) * t; };

  function renderToImageData3(img, src, bits, w, h, colors, accentMix, mode) {
    var d = img.data;
    var fr = colors.fg[0], fg = colors.fg[1], fb = colors.fg[2];
    var br = colors.bg[0], bg = colors.bg[1], bb = colors.bg[2];
    var ar = colors.accent[0], ag = colors.accent[1], ab = colors.accent[2];
    var mix = accentMix / 100;
    var fast = accentMix < 1;
    var halfZone = mix * 0.45;
    var lo = 0.5 - halfZone;
    var hi = 0.5 + halfZone;

    for (var i = 0; i < w * h; i++) {
      var j = i << 2;
      var v = src[i];
      var r, g, b;
      if (v < 0) {
        r = ar; g = ag; b = ab;
      } else if (fast) {
        if (bits[i]) { r = fr; g = fg; b = fb; } else { r = br; g = bg; b = bb; }
      } else {
        var baseOn = bits[i] === 1;
        var baseR = baseOn ? fr : br;
        var baseG = baseOn ? fg : bg;
        var baseB = baseOn ? fb : bb;
        if (v >= lo && v <= hi) {
          if (mode === "hard") {
            r = ar; g = ag; b = ab;
          } else if (mode === "pattern") {
            if (baseOn) { r = ar; g = ag; b = ab; } else { r = baseR; g = baseG; b = baseB; }
          } else {
            var prox = halfZone > 1e-4 ? 1 - Math.abs(v - 0.5) / halfZone : 1;
            var t = prox * prox;
            r = lerp(baseR, ar, t);
            g = lerp(baseG, ag, t);
            b = lerp(baseB, ab, t);
          }
        } else {
          r = baseR; g = baseG; b = baseB;
        }
      }
      d[j] = r;
      d[j + 1] = g;
      d[j + 2] = b;
      d[j + 3] = 255;
    }
    return img;
  }

  /* ---------- effects.ts (Liquid Wave) ---------- */
  var clamp01 = function (v) { return v < 0 ? 0 : v > 1 ? 1 : v; };

  function liquid(buf, w, h, t, intensity, scale) {
    var amp = intensity / 50;
    for (var y = 0; y < h; y++) {
      var ny = (y / h) * scale;
      for (var x = 0; x < w; x++) {
        var nx = (x / w) * scale;
        var a = Math.sin(nx * 3 + t * 1.5) * Math.cos(ny * 2 - t * 0.7);
        var b = Math.sin((nx + ny) * 2 - t * 1.2) * 0.5;
        var c = Math.cos(nx * 1.5 - ny * 3 + t * 0.8) * 0.3;
        buf[y * w + x] = clamp01(0.5 + (a + b + c) * amp * 0.4);
      }
    }
  }

  /* ---------- postfx.ts (bloom only) ---------- */
  function PostFX() { this.tmp1 = null; this.ctx1 = null; this.frame = 0; }
  PostFX.prototype.ensureTmp = function (w, h) {
    if (!this.tmp1) {
      this.tmp1 = document.createElement("canvas");
      this.ctx1 = this.tmp1.getContext("2d", { willReadFrequently: true });
    }
    if (this.tmp1.width !== w || this.tmp1.height !== h) {
      this.tmp1.width = w;
      this.tmp1.height = h;
    }
  };
  var IMPLS = {
    bloom: function (self, ctx, w, h, i) {
      var c1 = self.ctx1;
      c1.filter = "blur(" + (Math.ceil(i / 8) + 1) + "px) brightness(" + (1 + i / 80) + ")";
      c1.clearRect(0, 0, w, h);
      c1.drawImage(ctx.canvas, 0, 0);
      c1.filter = "none";
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = i / 120;
      ctx.drawImage(self.ctx1.canvas, 0, 0);
    }
  };
  var POSTFX_ORDER = ["bloom"];
  PostFX.prototype.process = function (ctx, w, h, time, stack) {
    if (!stack.length) return;
    this.ensureTmp(w, h);
    this.frame++;
    for (var k = 0; k < POSTFX_ORDER.length; k++) {
      var id = POSTFX_ORDER[k];
      var fx = null;
      for (var s = 0; s < stack.length; s++) if (stack[s].id === id) fx = stack[s];
      if (!fx || !IMPLS[id]) continue;
      try {
        ctx.save();
        IMPLS[id](this, ctx, w, h, fx.intensity, time, fx);
      } catch (e) {
        // a throwing pass is skipped, not fatal
      } finally {
        ctx.restore();
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1;
        ctx.filter = "none";
      }
    }
  };

  /* ---------- engine.ts ---------- */
  function hexToRgb(hex) {
    var m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
    if (!m) return [255, 255, 255];
    var n = parseInt(m[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  function Engine(canvas, input) {
    this.display = canvas;
    this.dctx = canvas.getContext("2d");
    this.work = document.createElement("canvas");
    this.wctx = this.work.getContext("2d", { willReadFrequently: true });
    this.post = new PostFX();
    this.buf = new Float32Array(1);
    this.img = null;
    this.W = 1; this.H = 1; this.dispW = 1; this.dispH = 1;
    this.input = input;
    this.colors = { fg: hexToRgb(input.fgColor), bg: hexToRgb(input.bgColor), accent: hexToRgb(input.accentColor) };
    this.time = 0;
    this.drawAcc = 0;
  }
  Engine.prototype.resize = function (cssW, cssH, dpr) {
    if (cssW <= 0 || cssH <= 0) return;
    this.dispW = Math.round(cssW * dpr);
    this.dispH = Math.round(cssH * dpr);
    this.display.width = this.dispW;
    this.display.height = this.dispH;
    var long = Math.max(cssW, cssH);
    var scale = long > MAX_LONG ? MAX_LONG / long : 1;
    this.W = Math.max(2, Math.round(cssW * scale));
    this.H = Math.max(2, Math.round(cssH * scale));
    this.work.width = this.W;
    this.work.height = this.H;
    if (this.buf.length !== this.W * this.H) this.buf = new Float32Array(this.W * this.H);
    this.img = this.wctx.createImageData(this.W, this.H);
  };
  Engine.prototype.renderFrame = function (dt) {
    this.time += dt * this.input.speed;
    this.drawAcc += dt;
    var fps = this.input.targetFps;
    if (fps < 60 && this.drawAcc < 1 / fps) return;
    this.drawAcc = 0;
    this.draw();
  };
  Engine.prototype.draw = function () {
    if (!this.img) return; // not sized yet (canvas had 0×0 at first measure)
    var W = this.W, H = this.H, inp = this.input;
    liquid(this.buf, W, H, this.time, inp.intensity, inp.scale);
    var bits = applyToBuffer(this.buf, W, H, {
      threshold: inp.threshold, spread: inp.spread, pixelSize: inp.pixelSize, randomness: inp.randomness
    });
    renderToImageData3(this.img, this.buf, bits, W, H, this.colors, inp.accentMix, inp.accentMixMode);
    this.wctx.putImageData(this.img, 0, 0);
    this.post.process(this.wctx, W, H, this.time, inp.postfx);
    this.dctx.imageSmoothingEnabled = false;
    this.dctx.clearRect(0, 0, this.dispW, this.dispH);
    this.dctx.drawImage(this.work, 0, 0, W, H, 0, 0, this.dispW, this.dispH);
  };
  Engine.prototype.paint = function () { this.draw(); };
  Engine.prototype.dispose = function () { this.work.width = 0; this.work.height = 0; };

  /* ---------- mount.ts ---------- */
  function mount(canvas) {
    var engine;
    try { engine = new Engine(canvas, INPUT); } catch (e) { return function () {}; }
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    function resize() {
      var w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      engine.resize(w, h, Math.min(window.devicePixelRatio || 1, 2));
      engine.paint();
    }
    resize();
    var ro = window.ResizeObserver ? new ResizeObserver(resize) : null;
    if (ro) ro.observe(canvas); else window.addEventListener("resize", resize);

    var raf = 0, last = performance.now(), running = false;
    function tick(now) {
      // the site's "pause motion" toggle freezes the last frame (time doesn't advance)
      if (!document.documentElement.classList.contains("motion-off")) engine.renderFrame(Math.min(0.05, (now - last) / 1000));
      last = now;
      raf = requestAnimationFrame(tick);
    }
    function start() {
      if (running || reduce.matches || document.hidden) return;
      running = true; last = performance.now(); raf = requestAnimationFrame(tick);
    }
    function stop() { running = false; cancelAnimationFrame(raf); }
    // pause while the tab is hidden; reduced motion keeps the single static frame
    document.addEventListener("visibilitychange", function () { document.hidden ? stop() : start(); });
    var onPref = function () { reduce.matches ? stop() : start(); };
    if (reduce.addEventListener) reduce.addEventListener("change", onPref); else reduce.addListener(onPref);
    start();

    return function () {
      stop();
      if (ro) ro.disconnect();
      engine.dispose();
    };
  }

  function boot() {
    var c = document.createElement("canvas");
    c.className = "liquid-bg";
    c.setAttribute("aria-hidden", "true");
    document.body.insertBefore(c, document.body.firstChild);
    var dispose = mount(c);
    window.addEventListener("pagehide", function (e) { if (!e.persisted) dispose(); });
  }
  if (document.body) boot(); else document.addEventListener("DOMContentLoaded", boot);
})();
