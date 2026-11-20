/* =========================================================
   3D scenes (Three.js r128, classic build)
   Usage: <div class="hero-canvas" data-scene="blob|knot|rings|crystal"></div>
   Procedural geometry only: no model files to download.
   ========================================================= */
(function () {
  if (!window.THREE) return;
  var THREE = window.THREE;

  var NOISE = [
    "vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}",
    "vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}",
    "vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}",
    "vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}",
    "float snoise(vec3 v){",
    " const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);",
    " vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);",
    " vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);",
    " vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;",
    " i=mod289(i);",
    " vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));",
    " float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;",
    " vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);",
    " vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);",
    " vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);",
    " vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));",
    " vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;",
    " vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);",
    " vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));",
    " p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;",
    " vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;",
    " return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));",
    "}"
  ].join("\n");

  var VERT = [
    "uniform float uTime; uniform float uAmp; uniform float uFreq; uniform vec2 uMouse;",
    "varying vec3 vView; varying float vN;",
    NOISE,
    "void main(){",
    "  vec3 p = position;",
    "  float n = snoise(normal * uFreq + vec3(uTime*0.18, uTime*0.12, uMouse.x*0.4));",
    "  float n2 = snoise(normal * uFreq * 2.3 - uTime*0.1) * 0.35;",
    "  vN = n + n2;",
    "  p += normal * (n + n2) * uAmp;",
    "  vec4 mv = modelViewMatrix * vec4(p, 1.0);",
    "  vView = mv.xyz;",
    "  gl_Position = projectionMatrix * mv;",
    "}"
  ].join("\n");

  var FRAG = [
    "uniform float uTime; uniform vec3 uDeep; uniform vec3 uTeal; uniform vec3 uGlow;",
    "varying vec3 vView; varying float vN;",
    "void main(){",
    "  vec3 n = normalize(cross(dFdx(vView), dFdy(vView)));",
    "  vec3 v = normalize(-vView);",
    "  float fres = pow(1.0 - clamp(abs(dot(n, v)), 0.0, 1.0), 2.2);",
    "  vec3 L = normalize(vec3(0.6, 0.9, 0.7));",
    "  float diff = max(dot(n, L), 0.0);",
    "  float spec = pow(max(dot(reflect(-L, n), v), 0.0), 40.0);",
    "  float bands = smoothstep(0.45, 0.5, fract(vN * 3.0 + uTime * 0.04)) * 0.06;",
    "  vec3 col = uDeep;",
    "  col += uTeal * diff * 0.35;",
    "  col = mix(col, uTeal, fres * 0.85);",
    "  col += uGlow * pow(fres, 4.0) * 0.55;",
    "  col += uGlow * spec * 0.35;",
    "  col += uTeal * bands;",
    "  gl_FragColor = vec4(col, 1.0);",
    "}"
  ].join("\n");

  var COLORS = {
    uDeep: new THREE.Color("#050505"),
    uTeal: new THREE.Color("#5c5c5c"),
    uGlow: new THREE.Color("#f0f0f0")
  };

  function makeMaterial(amp, freq) {
    return new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      extensions: { derivatives: true },
      uniforms: {
        uTime: { value: 0 },
        uAmp: { value: amp },
        uFreq: { value: freq },
        uMouse: { value: new THREE.Vector2() },
        uDeep: { value: COLORS.uDeep },
        uTeal: { value: COLORS.uTeal },
        uGlow: { value: COLORS.uGlow }
      }
    });
  }

  function makeDust(count, rMin, rMax, size) {
    var g = new THREE.BufferGeometry();
    var pos = new Float32Array(count * 3);
    for (var i = 0; i < count; i++) {
      var u = Math.random() * 2 - 1, t = Math.random() * Math.PI * 2;
      var r = rMin + Math.random() * (rMax - rMin), s = Math.sqrt(1 - u * u);
      pos[i * 3] = r * s * Math.cos(t);
      pos[i * 3 + 1] = r * u;
      pos[i * 3 + 2] = r * s * Math.sin(t);
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return new THREE.Points(g, new THREE.PointsMaterial({
      size: size, color: 0xd6d6d6, transparent: true, opacity: 0.55, depthWrite: false, sizeAttenuation: true
    }));
  }

  function build(variant, mobile) {
    var group = new THREE.Group();
    var mats = [];
    var spin = [];
    var detail = mobile ? 40 : 72;

    if (variant === "knot") {
      var mk = makeMaterial(0.12, 1.4);
      var knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.05, 0.34, mobile ? 220 : 360, mobile ? 28 : 48, 2, 3), mk);
      group.add(knot); mats.push(mk); spin.push([knot, 0.0015, 0.003]);
      group.add(makeDust(mobile ? 500 : 1200, 2.4, 4.2, 0.016));
    } else if (variant === "rings") {
      for (var i = 0; i < 4; i++) {
        var mr = makeMaterial(0.05, 2.0);
        var ring = new THREE.Mesh(new THREE.TorusGeometry(0.75 + i * 0.42, 0.045 + i * 0.012, 24, mobile ? 120 : 200), mr);
        ring.rotation.x = Math.PI / 2 + i * 0.32;
        ring.rotation.y = i * 0.5;
        group.add(ring); mats.push(mr); spin.push([ring, 0.002 + i * 0.0012, 0.0015 * (i % 2 ? -1 : 1)]);
      }
      var mc = makeMaterial(0.18, 1.6);
      var core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.45, mobile ? 20 : 32), mc);
      group.add(core); mats.push(mc);
      group.add(makeDust(mobile ? 400 : 900, 2.6, 4.5, 0.015));
    } else if (variant === "crystal") {
      var mx = makeMaterial(0.08, 0.9);
      var cr = new THREE.Mesh(new THREE.OctahedronGeometry(1.25, 3), mx);
      cr.scale.set(0.8, 1.3, 0.8);
      group.add(cr); mats.push(mx); spin.push([cr, 0.001, 0.004]);
      var wire = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.OctahedronGeometry(1.75, 0)),
        new THREE.LineBasicMaterial({ color: 0x9a9a9a, transparent: true, opacity: 0.35 })
      );
      wire.scale.set(0.8, 1.3, 0.8);
      group.add(wire); spin.push([wire, -0.002, -0.002]);
      group.add(makeDust(mobile ? 400 : 900, 2.4, 4.4, 0.015));
    } else { // blob (home hero)
      var mb = makeMaterial(0.32, 0.85);
      var blob = new THREE.Mesh(new THREE.IcosahedronGeometry(1.35, detail), mb);
      group.add(blob); mats.push(mb); spin.push([blob, 0.0008, 0.0016]);
      var orbit = new THREE.Mesh(
        new THREE.TorusGeometry(2.2, 0.006, 8, 220),
        new THREE.MeshBasicMaterial({ color: 0xf2c94c, transparent: true, opacity: 0.55 })   // yellow detail
      );
      orbit.rotation.x = 1.25; orbit.rotation.y = 0.3;
      group.add(orbit); spin.push([orbit, 0, 0.0025]);
      group.add(makeDust(mobile ? 700 : 1800, 2.0, 5.0, 0.014));
    }
    return { group: group, mats: mats, spin: spin };
  }

  function initScene(el) {
    var variant = el.getAttribute("data-scene") || "blob";
    var mobile = window.matchMedia("(max-width: 767px)").matches;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !mobile, alpha: true, powerPreference: "high-performance" });
    } catch (e) { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 7);

    var built = build(variant, mobile);
    scene.add(built.group);

    // The canvas is fixed to the viewport (see .hero-canvas in style.css), so the object
    // sits dead centre and stays with the reader while the page scrolls.
    var layout = { x: 0, y: 0, s: 1 };
    function resize() {
      var w = el.clientWidth || 1, h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      var aspect = w / h;
      var fit = Math.min(1, aspect * 1.25);          // shrink on tall phone screens so it stays in frame
      var base = variant === "blob" ? 1.0 : 0.9;
      if (w < 768) layout = { x: 0, y: 0, s: base * fit * 0.9 };
      else if (w < 1100) layout = { x: 0, y: 0, s: base * fit };
      else layout = { x: 0, y: 0, s: base * 1.05 };
    }
    resize();
    if (window.ResizeObserver) new ResizeObserver(resize).observe(el);
    else window.addEventListener("resize", resize);

    var mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    window.addEventListener("pointermove", function (e) {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });

    var visible = true;
    if (window.IntersectionObserver) {
      new IntersectionObserver(function (ent) { visible = ent[0].isIntersecting; }).observe(el);
    }

    var clock = new THREE.Clock();
    var t = 0;
    function frame() {
      requestAnimationFrame(frame);
      // paused by the off-screen check, a hidden tab, or the site's "pause motion" toggle
      if (!visible || document.hidden || document.documentElement.classList.contains("motion-off")) { clock.getDelta(); return; }
      var dt = Math.min(clock.getDelta(), 0.05);
      t += dt;
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      // scroll drives a slow extra turn (whole page) and a fade after the first screen
      var vh = window.innerHeight || 1;
      var maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);
      var pageProg = Math.min(1, window.scrollY / maxScroll);           // 0..1 over the whole page
      var heroProg = Math.min(1, window.scrollY / vh);                   // 0..1 over the first screen
      el.style.opacity = (1 - heroProg * 0.6).toFixed(3);               // stays at 40% behind content

      for (var i = 0; i < built.mats.length; i++) {
        built.mats[i].uniforms.uTime.value = t;
        built.mats[i].uniforms.uMouse.value.set(mouse.x, mouse.y);
      }
      for (var j = 0; j < built.spin.length; j++) {
        built.spin[j][0].rotation.x += built.spin[j][1];
        built.spin[j][0].rotation.y += built.spin[j][2];
      }
      var g = built.group;
      g.position.x = layout.x + mouse.x * 0.15;
      g.position.y = layout.y - mouse.y * 0.12;
      g.rotation.y = mouse.x * 0.35 + pageProg * Math.PI * 2;           // one full turn top → bottom
      g.rotation.x = mouse.y * 0.2 + pageProg * 0.6;
      var s = layout.s * (1 - heroProg * 0.15);
      g.scale.set(s, s, s);
      renderer.render(scene, camera);
    }

    if (reduce) {
      for (var k = 0; k < built.mats.length; k++) built.mats[k].uniforms.uTime.value = 2.0;
      built.group.position.set(layout.x, layout.y, 0);
      built.group.scale.setScalar(layout.s);
      renderer.render(scene, camera);
    } else {
      frame();
    }
    el.classList.add("is-ready");
  }

  window.initScenes = function () {
    var els = document.querySelectorAll("[data-scene]");
    for (var i = 0; i < els.length; i++) initScene(els[i]);
  };
})();
