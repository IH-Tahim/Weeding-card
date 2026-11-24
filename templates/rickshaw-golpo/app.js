/* Rickshaw Golpo — ring the bell, then a rickshaw rides down a winding road past our story and every event as you scroll. */
(function () {
  "use strict";
  window.TPL_STRINGS = {
    en: { ring: "Ring the bell!", shubho: "Shubho Bibaho", golpo: "A rickshaw love story", weds: "weds", ride: "Scroll down, the rickshaw is waiting ↓", metro: "DHAKA METRO · BIYE" },
    bn: { ring: "ঘণ্টি বাজান!", shubho: "শুভ বিবাহ", golpo: "রিকশায় চড়ে আমাদের গল্প", weds: "ও", ride: "নিচে স্ক্রল করুন — রিকশা চলবে ↓", metro: "ঢাকা মেট্রো · বিয়ে" }
  };
  const core = window.SC.core;
  const $ = (s) => document.querySelector(s);
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Bell: "kring kring" + open ----------
  function kring() {
    try {
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
      const ac = new AC();
      [0, 0.22].forEach((at) => [2100, 2650, 3400].forEach((f, i) => {
        const o = ac.createOscillator(), g = ac.createGain(); o.type = "sine"; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, ac.currentTime + at); g.gain.exponentialRampToValueAtTime(0.18 / (i + 1), ac.currentTime + at + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + at + 0.5); o.connect(g).connect(ac.destination); o.start(ac.currentTime + at); o.stop(ac.currentTime + at + 0.55);
      }));
      setTimeout(() => ac.close(), 1500);
    } catch (e) {}
  }
  let opened = false;
  function open() {
    if (opened) return; opened = true; kring();
    $("#intro").classList.add("go");
    core.reveal(500);
    setTimeout(() => { $("#intro").hidden = true; }, 1200);
  }
  $("#bell").addEventListener("click", open);
  $("#plate").addEventListener("click", open);
  document.addEventListener("keydown", (e) => { if (!opened && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); open(); } });

  // ---------- Stops: story milestones, then every event ----------
  core.on("render", (c) => {
    const box = $("#stops"); box.textContent = "";
    const story = (c.D.extras && c.D.extras.story) || [];
    const ICON = { chat: "💬", tea: "☕", ring: "💍", home: "🏡", heart: "❤️", star: "⭐", plate: "🍽️", camera: "📸", music: "🎶", car: "🚗", moon: "🌙", flower: "🌸" };
    story.forEach((s) => {
      const d = el("article", "stop fade"); d.append(el("span", "ic", ICON[s.icon] || "❤️"), el("span", "when", c.t(s.when)), el("h3", null, c.t(s.title)));
      if (s.text) d.append(el("p", null, c.t(s.text)));
      box.append(d);
    });
    c.D.events.forEach((ev) => {
      const d = el("article", "stop event fade");
      d.append(el("span", "ic", c.iconOf(ev)), el("span", "when", c.fmt(ev.start, { weekday: "long", day: "numeric", month: "long" })), el("h3", null, c.t(ev.title)),
        el("p", null, `${c.time(ev.start)} · ${c.t(ev.venue)}`), el("p", "bd", [c.t(ev.address), window.SC.bangla ? SC.bangla(ev.start) : ""].filter(Boolean).join(" · ")));
      if (ev.dressCode) d.append(el("p", "bd", "👗 " + c.t(ev.dressCode)));
      const acts = el("div", "acts");
      if (ev.map) { const a = el("a", null, c.s("map")); a.href = ev.map; a.target = "_blank"; a.rel = "noopener"; acts.append(a); }
      const b = el("button", null, c.s("save")); b.type = "button"; b.addEventListener("click", () => c.openCal(ev)); acts.append(b);
      d.append(acts); box.append(d);
    });
    requestAnimationFrame(layoutRoad);
  });
  core.on("open", layoutRoad);

  // ---------- Road: a smooth S-curve that weaves past each card ----------
  const journey = $("#journey"), path = $("#roadPath"), lane = $("#roadLane"), rick = $("#rickshaw");
  let len = 0;
  function layoutRoad() {
    const W = journey.clientWidth, H = journey.clientHeight; if (!W || !H) return;
    $("#road").setAttribute("viewBox", `0 0 ${W} ${H}`);
    const pts = [[W / 2, 0]];
    const pad = parseFloat(getComputedStyle(journey).paddingTop);
    // Run alongside each card on its free side, and cross over only in the gap between cards.
    [...document.querySelectorAll("#stops .stop")].forEach((s, i) => { const x = i % 2 === 0 ? W * 0.83 : W * 0.17, top = s.offsetTop + pad; pts.push([x, top + 8], [x, top + s.offsetHeight - 8]); });
    pts.push([W / 2, H]);
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x, y] = pts[i], dy = (y - y0) * 0.55; d += ` C${x0} ${y0 + dy} ${x} ${y - dy} ${x} ${y}`; }
    path.setAttribute("d", d); lane.setAttribute("d", d);
    len = path.getTotalLength();
    move();
  }
  // Where the rickshaw is: the point on the road level with 55% down the screen.
  function atY(y) { let lo = 0, hi = len; for (let k = 0; k < 22; k++) { const mid = (lo + hi) / 2; if (path.getPointAtLength(mid).y < y) lo = mid; else hi = mid; } return lo; }
  let ticking = false;
  function move() {
    ticking = false; if (!len) return;
    const r = journey.getBoundingClientRect();
    const y = Math.max(0, Math.min(r.height, innerHeight * 0.55 - r.top));
    const l = atY(y), p = path.getPointAtLength(l), q = path.getPointAtLength(Math.min(len, l + 6));
    const dx = q.x - p.x, dy = q.y - p.y;
    const left = dx < -0.3, tilt = Math.max(-18, Math.min(18, Math.atan2(dy, Math.abs(dx) + 4) * 180 / Math.PI * 0.35));
    rick.style.transform = `translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px) scaleX(${left ? -1 : 1}) rotate(${tilt.toFixed(1)}deg)`;
  }
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(move); } }, { passive: true });
  window.addEventListener("resize", () => requestAnimationFrame(layoutRoad));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => requestAnimationFrame(layoutRoad));
  if (reduce) rick.style.transition = "none";
})();
