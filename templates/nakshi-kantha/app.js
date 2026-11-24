/* Nakshi Kantha — tap the spool and the lotus medallion is stitched petal by petal, then the quilt opens. */
(function () {
  "use strict";
  window.TPL_STRINGS = {
    en: { openStitch: "Tap the thread to open", shubho: "Shubho Bibaho", weds: "weds", eventsH: "Celebrations", events: "Join us" },
    bn: { openStitch: "সুতোয় চাপ দিয়ে খুলুন", shubho: "শুভ বিবাহ", weds: "ও", eventsH: "অনুষ্ঠানমালা", events: "আমন্ত্রণ" }
  };
  const core = window.SC.core;
  const $ = (s) => document.querySelector(s);
  const NS = "http://www.w3.org/2000/svg";
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const C = { red: "#b3261e", indigo: "#1f3a6b", green: "#3d7a4a", turmeric: "#d08c12" };

  // ---------- Build the lotus medallion out of dashed "stitches" ----------
  const svg = $("#lotus");
  const steps = []; // [element, x, y] in viewBox units, in stitching order
  const add = (tag, attrs, colour, x, y) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    n.setAttribute("class", "st"); n.setAttribute("stroke", colour);
    svg.append(n); steps.push([n, x, y]); return n;
  };
  const rot = (deg, r) => [Math.sin(deg * Math.PI / 180) * r, -Math.cos(deg * Math.PI / 180) * r];
  add("circle", { r: 10 }, C.turmeric, 0, -10);
  add("circle", { r: 17 }, C.red, 0, -17);
  for (let i = 0; i < 8; i++) { const a = i * 45; add("path", { d: "M0 -20 C13 -30 13 -50 0 -60 C-13 -50 -13 -30 0 -20Z", transform: `rotate(${a})` }, C.indigo, ...rot(a, 60)); }
  for (let i = 0; i < 8; i++) { const a = i * 45 + 22.5; add("path", { d: "M0 -30 C6 -36 6 -44 0 -50 C-6 -44 -6 -36 0 -30Z", transform: `rotate(${a})` }, C.green, ...rot(a, 50)); }
  for (let i = 0; i < 12; i++) { const a = i * 30 + 15; add("path", { d: "M0 -62 C17 -70 17 -84 0 -94 C-17 -84 -17 -70 0 -62Z", transform: `rotate(${a})` }, C.red, ...rot(a, 94)); }
  add("circle", { r: 99 }, C.indigo, 0, -99);
  for (let i = 0; i < 24; i++) { const a = i * 15; const [x, y] = rot(a, 105); add("circle", { cx: x.toFixed(1), cy: y.toFixed(1), r: 2.6 }, C.turmeric, x, y); }

  // ---------- Stitch it ----------
  let started = false;
  function open() {
    if (started) return; started = true;
    const intro = $("#intro"), needle = $("#needle");
    intro.classList.add("stitching");
    if (reduce) { steps.forEach(([n]) => n.classList.add("on")); return finish(600); }
    needle.classList.add("on");
    const scale = () => svg.getBoundingClientRect().width / 220;
    steps.forEach(([n, x, y], i) => setTimeout(() => {
      n.classList.add("on");
      const s = scale(); needle.style.transform = `translate(${(x * s).toFixed(1)}px, ${(y * s).toFixed(1)}px)`;
      if (i === steps.length - 1) { needle.classList.remove("on"); finish(700); }
    }, i * 70));
  }
  function finish(wait) {
    setTimeout(() => {
      $("#intro").classList.add("done");
      core.reveal(300);
      setTimeout(() => { $("#intro").hidden = true; }, 1300);
    }, wait);
  }
  $("#spool").addEventListener("click", open);
  $(".hoop").addEventListener("click", open);
  document.addEventListener("keydown", (e) => { if (!started && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); open(); } });
})();
