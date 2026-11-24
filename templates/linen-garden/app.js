/* Linen Garden — doors, scratch-to-reveal heart, timeline grouped by day. Text comes from data.js via shared/core.js. */
(function () {
  "use strict";
  window.TPL_STRINGS = {
    en: { married: "We're getting married", scratchH: "Scratch to reveal", scratchHint: "Scratch the heart", invitedShort: "You're invited!",
      married2: "Happily married", timeline: "Programme", cantWait: "We can't wait to celebrate with you!" },
    bn: { married: "আমরা বিয়ে করছি", scratchH: "ঘষে দেখুন", scratchHint: "হৃদয়টি আঙুলে ঘষুন", invitedShort: "আপনি আমন্ত্রিত!",
      married2: "শুভ বিবাহ সম্পন্ন", timeline: "অনুষ্ঠানসূচি", cantWait: "আপনার সাথে উদ্‌যাপনের অপেক্ষায়!" }
  };
  const core = window.SC.core;
  const $ = (s) => document.querySelector(s);
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Open the doors ----------
  let opened = false;
  function open() {
    if (opened) return; opened = true;
    $("#intro").classList.add("open");
    core.reveal(1100);
    setTimeout(() => $("#intro").classList.add("gone"), 2000);
  }
  $("#plaque").addEventListener("click", open);
  $("#intro").addEventListener("click", (e) => { if (!e.target.closest(".pill")) open(); });
  document.addEventListener("keydown", (e) => { if (!opened && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); open(); } });

  // ---------- Timeline grouped by day ----------
  core.on("render", (c) => {
    const box = $("#timeline"); box.textContent = "";
    const key = (iso) => c.fmt(iso, { year: "numeric", month: "2-digit", day: "2-digit" });
    let last = "";
    c.D.events.forEach((ev) => {
      if (key(ev.start) !== last) { last = key(ev.start); box.append(el("p", "tl-day", c.fmt(ev.start, { weekday: "long", day: "numeric", month: "short", year: "numeric" }))); }
      const row = el("div", "tl-row"), info = el("div");
      info.append(el("h3", null, c.t(ev.title)), el("p", null, [c.t(ev.venue), c.t(ev.address)].filter(Boolean).join(", ")));
      if (ev.dressCode) info.append(el("p", null, "👗 " + c.t(ev.dressCode)));
      const acts = el("div", "acts");
      if (ev.map) { const a = el("a", null, c.s("map")); a.href = ev.map; a.target = "_blank"; a.rel = "noopener"; acts.append(a); }
      const b = el("button", null, c.s("save")); b.type = "button"; b.addEventListener("click", () => c.openCal(ev)); acts.append(b);
      info.append(acts);
      row.append(el("div", "tm", c.time(ev.start)), info); box.append(row);
    });
  });

  // ---------- Scratch the heart ----------
  const cv = $("#scratch"), ctx = cv.getContext("2d");
  const HEART = new Path2D("M130 228C40 160 0 110 0 66 0 28 30 0 68 0c30 0 50 18 62 40C142 18 162 0 192 0c38 0 68 28 68 66 0 44-40 94-130 162Z");
  let total = 0, done = false, moves = 0;
  function paint() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = 260 * dpr; cv.height = 240 * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const g = ctx.createRadialGradient(110, 80, 10, 130, 110, 170);
    g.addColorStop(0, "#b9c6a6"); g.addColorStop(.55, "#8a9a76"); g.addColorStop(1, "#5f6f4e");
    ctx.fillStyle = g; ctx.fill(HEART);
    ctx.save(); ctx.clip(HEART);
    for (let i = 0; i < 520; i++) { ctx.fillStyle = `rgba(255,255,245,${Math.random() * .7})`; const r = Math.random() * 1.6; ctx.beginPath(); ctx.arc(Math.random() * 260, Math.random() * 240, r, 0, 6.3); ctx.fill(); }
    ctx.strokeStyle = "rgba(255,250,235,.55)"; ctx.lineWidth = 2; ctx.stroke(HEART);
    ctx.restore();
    ctx.globalCompositeOperation = "destination-out";
    total = count();
  }
  function count() { const d = ctx.getImageData(0, 0, cv.width, cv.height).data; let n = 0; for (let i = 3; i < d.length; i += 64) if (d[i] > 40) n++; return n; }
  function point(e) { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * 260 / r.width, (e.clientY - r.top) * 240 / r.height]; }
  let down = false, prev = null;
  function scratch(e) {
    if (!down || done) return;
    const [x, y] = point(e);
    ctx.lineCap = "round"; ctx.lineWidth = 42;
    ctx.beginPath(); ctx.moveTo(...(prev || [x, y])); ctx.lineTo(x, y); ctx.stroke();
    prev = [x, y];
    if (++moves % 8 === 0 && count() < total * 0.45) finish();
  }
  function finish() {
    if (done) return; done = true; cv.classList.add("done"); $("#scratchHint").hidden = true;
    if (navigator.vibrate) try { navigator.vibrate(20); } catch (x) {}
    if (reduce) return;
    const r = cv.getBoundingClientRect();
    for (let i = 0; i < 18; i++) {
      const h = el("span", "heart-pop", "♥");
      h.style.left = r.left + r.width / 2 + "px"; h.style.top = r.top + r.height / 2 + "px";
      h.style.setProperty("--x", (Math.random() * 260 - 130) + "px"); h.style.setProperty("--y", (Math.random() * -220 - 20) + "px"); h.style.setProperty("--r", (Math.random() * 120 - 60) + "deg");
      h.style.color = ["#d48c8a", "#e3b2ad", "#a88a4e", "#7b8b68"][i % 4];
      h.addEventListener("animationend", () => h.remove()); document.body.append(h);
    }
  }
  cv.addEventListener("pointerdown", (e) => { down = true; prev = null; cv.setPointerCapture(e.pointerId); scratch(e); });
  cv.addEventListener("pointermove", scratch);
  cv.addEventListener("pointerup", () => { down = false; prev = null; });
  cv.addEventListener("pointercancel", () => { down = false; prev = null; });
  $("#scratchHint").addEventListener("click", finish);
  cv.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") finish(); });
  cv.tabIndex = 0;
  paint();
})();
