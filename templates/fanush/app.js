/* Fanush — release the lantern to open; lanterns keep rising, the sky deepens as you scroll, tap the sky to send one up. */
(function () {
  "use strict";
  window.TPL_STRINGS = {
    en: { releaseHint: "Tap the lantern to release it", tapSky: "Tap anywhere in the sky to release a lantern", eventsH: "Under the lanterns", events: "The celebrations",
      wishLantern: "A wish for us (it rides up on a lantern)", sendLantern: "Send reply & a lantern" },
    bn: { releaseHint: "ফানুসে চাপ দিয়ে উড়িয়ে দিন", tapSky: "আকাশের যেকোনো জায়গায় চাপ দিয়ে ফানুস ওড়ান", eventsH: "ফানুসের আলোয়", events: "অনুষ্ঠানমালা",
      wishLantern: "আমাদের জন্য একটি শুভকামনা (ফানুসে উড়বে)", sendLantern: "উত্তর ও ফানুস পাঠান" }
  };
  const core = window.SC.core;
  const $ = (s) => document.querySelector(s);
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const host = $("#lanterns");

  // ---------- Floating lanterns ----------
  function lantern(xPct, opts = {}) {
    if (document.hidden || host.childElementCount > 26) return;
    const d = document.createElement("div"); d.className = "fl";
    const w = opts.w || 16 + Math.random() * 22;
    d.style.left = (xPct != null ? xPct : Math.random() * 96) + "%";
    if (opts.bottom != null) d.style.bottom = opts.bottom + "px";
    d.style.setProperty("--w", w + "px");
    d.style.setProperty("--t", (opts.t || 13 + Math.random() * 10) + "s");
    d.style.setProperty("--dx", (Math.random() * 120 - 60) + "px");
    d.style.setProperty("--o", (0.55 + w / 80).toFixed(2));
    d.innerHTML = '<svg viewBox="0 0 60 80"><use href="#lantern"/></svg>';
    d.addEventListener("animationend", (e) => { if (e.target === d) d.remove(); });
    host.append(d);
  }
  let timer = 0;
  function startSky() { if (reduce) { for (let i = 0; i < 6; i++) lantern(); return; } for (let i = 0; i < 5; i++) setTimeout(lantern, i * 500); timer = setInterval(lantern, 1700); }

  // ---------- Open ----------
  let opened = false;
  function open() {
    if (opened) return; opened = true;
    $("#intro").classList.add("up");
    core.reveal(1500);
    setTimeout(() => { $("#intro").hidden = true; }, 2400);
    startSky();
  }
  $("#release").addEventListener("click", open);
  document.addEventListener("keydown", (e) => { if (!opened && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); open(); } });
  // Before opening, a few lanterns already drift over the river
  for (let i = 0; i < 3; i++) setTimeout(() => lantern(10 + Math.random() * 80, { w: 14 + Math.random() * 8 }), 400 + i * 900);

  // ---------- Tap the sky to release one ----------
  document.addEventListener("click", (e) => {
    if (!opened || e.target.closest("a,button,input,select,textarea,label,summary,details,form,.sc-dock,.sc-sheet")) return;
    const xPct = (e.clientX / innerWidth) * 100 - 2;
    lantern(xPct, { w: 34, t: 11, bottom: innerHeight - e.clientY - 40 });
  });

  // ---------- Sky deepens with scroll ----------
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => { ticking = false; const max = document.documentElement.scrollHeight - innerHeight; document.documentElement.style.setProperty("--p", Math.min(1, scrollY / Math.max(1, max * 0.6)).toFixed(3)); });
  }, { passive: true });

  // ---------- A lantern for each reply ----------
  const form = $("#rsvpForm");
  if (form) form.addEventListener("submit", () => { if (form.elements.name.value.trim()) { const r = form.querySelector("button[type=submit]").getBoundingClientRect(); lantern((r.left + r.width / 2) / innerWidth * 100 - 3, { w: 44, t: 10, bottom: innerHeight - r.top }); } });
})();
