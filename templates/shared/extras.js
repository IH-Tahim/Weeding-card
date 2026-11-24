/*
  Shubho Chithi — extra card sections, shared by every design (load after media.js, before app.js).
  Every section is optional and comes from data.js. Delete a block in data.js to hide that section.

    calendar  — month calendar with the wedding day marked + the Bangla date (automatic; set extras.calendar = false to hide)
    story     — "Our story" milestones           [{ when, title, text, icon }]
    schedule  — programme of the main day          [{ time, title, icon }]
    dress     — dress code with colour swatches    { note, colors: [{ name, hex }] }
    menu      — feast menu                         [ "Kacchi biryani", ... ]
    gifts     — gift note (+ optional bKash)       { text, bkash }
    stay      — hotels for out-of-town guests      [{ name, note, map }]
    faq       — questions & answers                [{ q, a }]

  The sections borrow the design's own section, label and title styles, so they match each card.
  Also adds SC.bangla(iso) → "১ মাঘ ১৪৩৩ বঙ্গাব্দ" / "1 Magh 1433 BS".
*/
(function () {
  "use strict";
  const D = window.INVITE || {};
  const X = Object.assign({}, D.extras || {}); // a copy, so skipping a section never changes data.js
  const SC = (window.SC = window.SC || {});
  const TZ = "Asia/Dhaka";
  const isBn = () => (document.documentElement.lang || "en").startsWith("bn");
  const t = (v) => (v && typeof v === "object" ? (isBn() ? v.bn || v.en : v.en || v.bn) || "" : v || "");
  const L = (en, bn) => (isBn() ? bn : en);
  const loc = () => (isBn() ? "bn-BD" : "en-GB");
  const num = (n) => new Intl.NumberFormat(loc(), { useGrouping: false }).format(n);
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };

  // ---------- Bangla (Bangabda) date — Bangladesh revised calendar (Pohela Boishakh = 14 April) ----------
  const BM = {
    bn: ["বৈশাখ", "জ্যৈষ্ঠ", "আষাঢ়", "শ্রাবণ", "ভাদ্র", "আশ্বিন", "কার্তিক", "অগ্রহায়ণ", "পৌষ", "মাঘ", "ফাল্গুন", "চৈত্র"],
    en: ["Boishakh", "Joishtho", "Asharh", "Srabon", "Bhadro", "Ashwin", "Kartik", "Ogrohayon", "Poush", "Magh", "Falgun", "Choitro"]
  };
  function ymd(iso) {
    const p = Object.fromEntries(new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "numeric", day: "numeric" })
      .formatToParts(new Date(iso)).map((x) => [x.type, +x.value]));
    return [p.year, p.month, p.day];
  }
  function bangabda(iso) {
    const [y, m, d] = ymd(iso);
    const day = Date.UTC(y, m - 1, d);
    const sy = day >= Date.UTC(y, 3, 14) ? y : y - 1;
    let n = Math.round((day - Date.UTC(sy, 3, 14)) / 864e5);
    const leap = (z) => (z % 4 === 0 && z % 100 !== 0) || z % 400 === 0;
    const len = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, leap(sy + 1) ? 30 : 29, 30];
    let mi = 0; while (mi < 11 && n >= len[mi]) { n -= len[mi]; mi++; }
    return { day: n + 1, month: mi, year: sy - 593 };
  }
  SC.bangla = (iso) => {
    const b = bangabda(iso);
    return isBn() ? `${num(b.day)} ${BM.bn[b.month]} ${num(b.year)} বঙ্গাব্দ` : `${b.day} ${BM.en[b.month]} ${b.year} BS`;
  };

  // Time of day, Bangla style: "সন্ধ্যা ৭:০০" / "7:00 PM"
  SC.time = (iso) => {
    const d = new Date(iso);
    if (!isBn()) return new Intl.DateTimeFormat("en-GB", { timeZone: TZ, hour: "numeric", minute: "2-digit", hour12: true }).format(d).replace(/\s?(am|pm)/i, (x) => " " + x.trim().toUpperCase());
    const [h, mi] = new Intl.DateTimeFormat("en-GB", { timeZone: TZ, hour: "numeric", minute: "numeric", hourCycle: "h23" }).format(d).split(":").map(Number);
    const part = h >= 4 && h < 12 ? "সকাল" : h < 15 && h >= 12 ? "দুপুর" : h >= 15 && h < 18 ? "বিকেল" : h >= 18 && h < 20 ? "সন্ধ্যা" : "রাত";
    return `${part} ${num(h % 12 || 12)}:${num(String(mi).padStart(2, "0")).padStart(2, "০")}`;
  };

  // ---------- Small line icons ----------
  const ICONS = {
    ring: '<circle cx="12" cy="15" r="6"/><path d="M9 6l3-3 3 3-3 3z"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    plate: '<circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="3"/><path d="M3 4v6M5 4v6M3 10h2M4 10v10M21 4c-2 1-2 5 0 6v10"/>',
    camera: '<rect x="3" y="7" width="18" height="12" rx="2"/><circle cx="12" cy="13" r="3.5"/><path d="M8 7l1.5-3h5L16 7"/>',
    music: '<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
    car: '<path d="M4 16l1.5-5h13L20 16M3 16h18v3H3z"/><circle cx="7" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/>',
    door: '<path d="M6 21V4h12v17M3 21h18"/><circle cx="14.5" cy="12.5" r=".8"/>',
    tea: '<path d="M4 9h12v4a6 6 0 0 1-12 0zM16 10h2a2 2 0 0 1 0 4h-2M7 3c0 2 2 2 2 4M11 3c0 2 2 2 2 4"/>',
    chat: '<path d="M4 5h16v10H9l-5 4z"/>',
    home: '<path d="M3 11l9-7 9 7M5 10v10h14V10"/>',
    star: '<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.5 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>',
    moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
    flower: '<circle cx="12" cy="12" r="2.5"/><path d="M12 9.5C10 6 12 3 12 3s2 3 0 6.5M14.5 12C18 10 21 12 21 12s-3 2-6.5 0M12 14.5C14 18 12 21 12 21s-2-3 0-6.5M9.5 12C6 14 3 12 3 12s3-2 6.5 0"/>',
    gift: '<rect x="3" y="9" width="18" height="12" rx="1"/><path d="M12 9v12M3 13h18M12 9c-2-5-7-4-5-1 1 1 5 1 5 1zM12 9c2-5 7-4 5-1-1 1-5 1-5 1z"/>',
    bed: '<path d="M3 18V7M3 14h18v4M21 18v-4a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="11" r="2"/>',
    pin: '<path d="M12 21s-6-6-6-11a6 6 0 0 1 12 0c0 5-6 11-6 11z"/><circle cx="12" cy="10" r="2.2"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>'
  };
  const icon = (name) => {
    const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("aria-hidden", "true"); s.setAttribute("class", "xs-ic");
    s.innerHTML = ICONS[name] || ICONS.heart;
    return s;
  };

  // ---------- Styles (follow the design's text colour; tweak with --xs-accent / --xs-card) ----------
  const css = `
  .xs-wrap{--xs-line:color-mix(in srgb,currentColor 18%,transparent);--xs-soft:color-mix(in srgb,currentColor 6%,transparent);max-width:520px;margin:0 auto;text-align:center}
  .xs-label{margin:0 0 4px;font-size:.75em;letter-spacing:.2em;text-transform:uppercase;opacity:.7}
  .xs-ic{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
  .xs-cal{display:inline-grid;gap:10px;padding:18px 16px 16px;border:1px solid var(--xs-line);border-radius:16px;background:var(--xs-card,var(--xs-soft));min-width:min(100%,300px)}
  .xs-cal h3{margin:0;font:inherit;font-size:1.15em;letter-spacing:.08em;text-transform:uppercase;opacity:.85}
  .xs-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:4px 2px;font-variant-numeric:tabular-nums}
  .xs-grid b{font-size:.68em;font-weight:600;letter-spacing:.04em;opacity:.6;padding-bottom:4px}
  .xs-grid span{font-size:.9em;line-height:2.1;border-radius:50%;position:relative}
  .xs-grid span.on{color:var(--xs-on,#fff);font-weight:700}
  .xs-grid span.on::before{content:"";position:absolute;inset:50% auto auto 50%;width:2.3em;height:2.3em;transform:translate(-50%,-50%);border-radius:50%;background:var(--xs-accent,currentColor);z-index:-1;box-shadow:0 0 0 4px color-mix(in srgb,var(--xs-accent,currentColor) 25%,transparent)}
  .xs-grid span.on{z-index:0;isolation:isolate}
  .xs-bd{margin:0;font-size:.95em;opacity:.85}
  .xs-bd b{font-weight:600}
  .xs-list{display:grid;gap:12px;text-align:left;margin-top:14px}
  .xs-story{position:relative;display:grid;gap:18px;margin-top:16px;text-align:left;padding-left:34px}
  .xs-story::before{content:"";position:absolute;left:13px;top:6px;bottom:6px;border-left:1.5px dashed var(--xs-line)}
  .xs-step{position:relative}
  .xs-step .xs-dot{position:absolute;left:-34px;top:0;width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:var(--xs-card,var(--xs-bg,#fff));border:1px solid var(--xs-line);color:var(--xs-accent,currentColor)}
  .xs-step .xs-dot .xs-ic{width:15px;height:15px}
  .xs-step small{display:block;font-size:.72em;letter-spacing:.12em;text-transform:uppercase;opacity:.65}
  .xs-step h4{margin:2px 0 4px;font:inherit;font-weight:600;font-size:1.05em}
  .xs-step p{margin:0;font-size:.92em;opacity:.85;line-height:1.6}
  .xs-sched{display:grid;gap:0;margin-top:14px}
  .xs-row{display:grid;grid-template-columns:1fr 44px 1fr;align-items:center;gap:12px;min-height:64px;position:relative}
  .xs-row::before{content:"";position:absolute;left:50%;top:0;bottom:0;border-left:1px solid var(--xs-line)}
  .xs-row:first-child::before{top:50%}.xs-row:last-child::before{bottom:50%}
  .xs-row .xs-bub{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;border:1px solid var(--xs-line);background:var(--xs-card,var(--xs-bg,#fff));color:var(--xs-accent,currentColor);position:relative;z-index:1}
  .xs-row .xs-tm{font-size:.82em;letter-spacing:.06em;opacity:.7;font-variant-numeric:tabular-nums}
  .xs-row .xs-tt{font-weight:600;font-size:.95em;letter-spacing:.02em}
  .xs-row>div:first-child{text-align:right}.xs-row>div:last-child{text-align:left}
  .xs-sw{display:flex;flex-wrap:wrap;justify-content:center;gap:14px;margin-top:16px}
  .xs-sw div{display:grid;justify-items:center;gap:6px;font-size:.75em;opacity:.9;max-width:72px}
  .xs-sw i{width:46px;height:46px;border-radius:50%;border:3px solid var(--xs-card,#fff);box-shadow:0 0 0 1px var(--xs-line),0 6px 14px -8px rgba(0,0,0,.5)}
  .xs-menu{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-top:14px}
  .xs-menu span{padding:7px 14px;border-radius:999px;border:1px solid var(--xs-line);background:var(--xs-soft);font-size:.9em}
  .xs-card{border:1px solid var(--xs-line);border-radius:14px;padding:14px 16px;background:var(--xs-card,var(--xs-soft));display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:center;text-align:left}
  .xs-card .xs-ic{color:var(--xs-accent,currentColor)}
  .xs-card b{display:block;font-weight:600}.xs-card small{opacity:.75;font-size:.85em}
  .xs-card a,.xs-btn{color:inherit;font-size:.8em;border:1px solid var(--xs-line);border-radius:999px;padding:6px 12px;text-decoration:none;white-space:nowrap;background:transparent;cursor:pointer;font-family:inherit;display:inline-flex;gap:6px;align-items:center}
  .xs-btn .xs-ic{width:15px;height:15px}
  .xs-faq{display:grid;gap:8px;margin-top:14px;text-align:left}
  .xs-faq details{border:1px solid var(--xs-line);border-radius:12px;background:var(--xs-soft);padding:0 14px}
  .xs-faq summary{cursor:pointer;padding:12px 0;font-weight:600;list-style:none;display:flex;justify-content:space-between;gap:10px}
  .xs-faq summary::-webkit-details-marker{display:none}
  .xs-faq summary::after{content:"+";opacity:.6;font-weight:400;transition:transform .2s}
  .xs-faq details[open] summary::after{transform:rotate(45deg)}
  .xs-faq p{margin:0 0 12px;opacity:.85;font-size:.92em;line-height:1.6}
  .xs-note{margin:10px auto 0;max-width:42ch;opacity:.85;font-size:.95em;line-height:1.65}
  .xs-wrap a:focus-visible,.xs-wrap button:focus-visible,.xs-faq summary:focus-visible{outline:2px solid currentColor;outline-offset:2px}
  @media (max-width:380px){.xs-row{grid-template-columns:1fr 38px 1fr;gap:8px}.xs-row .xs-bub{width:38px;height:38px}}
  `;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  // ---------- Where to put the sections: before the RSVP block, using its classes ----------
  const anchor = document.querySelector("#extras, #rsvpSec, #rsvpSection, .sec.end, .thanks");
  const main = () => (D.events || [])[D.countdownEvent] || (D.events || [])[0];
  const blocks = [];

  function section(key, labelEn, labelBn, titleEn, titleBn) {
    const ref = anchor && anchor.id !== "extras" ? anchor : null;
    const sec = document.createElement("section");
    sec.className = (ref ? ref.className.replace(/\b(end|thanks|in|show|visible)\b/g, "") : "sec").trim() + " xs-sec";
    sec.dataset.xs = key; sec.hidden = false;
    const lab = document.querySelector("p.label, p.eyebrow, p.kicker");
    const tit = (ref && ref.querySelector("h2")) || document.querySelector("main h2, section h2");
    const wrap = el("div", "xs-wrap");
    const p = el("p", lab ? lab.className : "xs-label"); p.dataset.en = labelEn; p.dataset.bn = labelBn;
    const h = el("h2", tit ? tit.className : "title"); h.dataset.en = titleEn; h.dataset.bn = titleBn;
    wrap.append(p, h); sec.append(wrap);
    blocks.push(sec);
    return wrap;
  }
  const head = (w) => w.querySelectorAll("[data-en]").forEach((n) => (n.textContent = isBn() ? n.dataset.bn : n.dataset.en));

  const builders = [];
  // A design that shows a section its own way lists it in <body data-xs-skip="story,schedule">.
  const skip = new Set((document.body.dataset.xsSkip || "").split(",").map((x) => x.trim()).filter(Boolean));
  ["story", "schedule", "dress", "menu", "gifts", "stay", "faq"].forEach((k) => { if (skip.has(k)) delete X[k]; });
  if (skip.has("calendar")) X.calendar = false;
  // Calendar + Bangla date
  if (X.calendar !== false && main()) {
    const w = section("calendar", "Save the date", "তারিখটি মনে রাখুন", "The big day", "শুভ দিন");
    builders.push(() => {
      head(w); w.querySelectorAll(".xs-cal,.xs-bd").forEach((n) => n.remove());
      const ev = main(); const [y, m, d] = ymd(ev.start);
      const box = el("div", "xs-cal");
      box.append(el("h3", null, new Intl.DateTimeFormat(loc(), { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(y, m - 1, 1)))));
      const g = el("div", "xs-grid");
      for (let i = 0; i < 7; i++) g.append(el("b", null, new Intl.DateTimeFormat(loc(), { weekday: isBn() ? "short" : "narrow", timeZone: "UTC" }).format(new Date(Date.UTC(2023, 0, 1 + i)))));
      const first = new Date(Date.UTC(y, m - 1, 1)).getUTCDay(), days = new Date(Date.UTC(y, m, 0)).getUTCDate();
      for (let i = 0; i < first; i++) g.append(el("span"));
      for (let i = 1; i <= days; i++) { const c = el("span", i === d ? "on" : null, num(i)); if (i === d) c.setAttribute("aria-label", "wedding day"); g.append(c); }
      box.append(g);
      const bd = el("p", "xs-bd");
      bd.append(el("b", null, `${new Intl.DateTimeFormat(loc(), { timeZone: TZ, weekday: "long" }).format(new Date(ev.start))} · ${SC.time(ev.start)}`), document.createTextNode(" · " + SC.bangla(ev.start)));
      w.append(box, bd);
    });
  }
  if (Array.isArray(X.story) && X.story.length) {
    const w = section("story", "How it began", "আমাদের গল্প", "Our story", "আমাদের পথচলা");
    builders.push(() => {
      head(w); w.querySelectorAll(".xs-story").forEach((n) => n.remove());
      const box = el("div", "xs-story");
      X.story.forEach((s) => { const it = el("div", "xs-step"); const dot = el("span", "xs-dot"); dot.append(icon(s.icon || "heart")); it.append(dot, el("small", null, t(s.when)), el("h4", null, t(s.title))); if (s.text) it.append(el("p", null, t(s.text))); box.append(it); });
      w.append(box);
    });
  }
  if (Array.isArray(X.schedule) && X.schedule.length) {
    const w = section("schedule", "On the day", "অনুষ্ঠানের দিন", "Programme", "অনুষ্ঠানসূচি");
    builders.push(() => {
      head(w); w.querySelectorAll(".xs-sched").forEach((n) => n.remove());
      const box = el("div", "xs-sched");
      X.schedule.forEach((s, i) => {
        const row = el("div", "xs-row"), a = el("div"), b = el("span", "xs-bub"), c = el("div");
        b.append(icon(s.icon || "star"));
        const tm = el("div", "xs-tm", t(s.time)), tt = el("div", "xs-tt", t(s.title));
        if (i % 2 === 0) { a.append(tt); c.append(tm); } else { a.append(tm); c.append(tt); }
        row.append(a, b, c); box.append(row);
      });
      w.append(box);
    });
  }
  if (X.dress && (X.dress.colors || X.dress.note)) {
    const w = section("dress", "What to wear", "কী পরবেন", "Dress code", "পোশাকের থিম");
    builders.push(() => {
      head(w); w.querySelectorAll(".xs-sw,.xs-note").forEach((n) => n.remove());
      if (X.dress.note) w.append(el("p", "xs-note", t(X.dress.note)));
      const sw = el("div", "xs-sw");
      (X.dress.colors || []).forEach((c) => { const d = el("div"); const i = el("i"); i.style.background = c.hex; d.append(i, el("span", null, t(c.name))); sw.append(d); });
      w.append(sw);
    });
  }
  if (Array.isArray(X.menu) && X.menu.length) {
    const w = section("menu", "The feast", "প্রীতিভোজ", "On the menu", "ভোজের আয়োজন");
    builders.push(() => { head(w); w.querySelectorAll(".xs-menu").forEach((n) => n.remove()); const m = el("div", "xs-menu"); X.menu.forEach((x) => m.append(el("span", null, t(x)))); w.append(m); });
  }
  if (X.gifts && (X.gifts.text || X.gifts.bkash)) {
    const w = section("gifts", "With love", "ভালোবাসায়", "Gifts", "উপহার");
    builders.push(() => {
      head(w); w.querySelectorAll(".xs-note,.xs-list").forEach((n) => n.remove());
      if (X.gifts.text) w.append(el("p", "xs-note", t(X.gifts.text)));
      if (X.gifts.bkash) {
        const list = el("div", "xs-list"), c = el("div", "xs-card"), info = el("div"), btn = el("button", "xs-btn");
        info.append(el("b", null, X.gifts.bkash), el("small", null, t(X.gifts.bkashLabel) || L("bKash (Send Money)", "বিকাশ (সেন্ড মানি)")));
        btn.type = "button"; btn.append(icon("copy"), document.createTextNode(L("Copy", "কপি")));
        btn.addEventListener("click", async () => { try { await navigator.clipboard.writeText(X.gifts.bkash.replace(/\s/g, "")); btn.lastChild.textContent = L("Copied", "কপি হয়েছে"); } catch (e) { btn.lastChild.textContent = X.gifts.bkash; } setTimeout(() => (btn.lastChild.textContent = L("Copy", "কপি")), 1800); });
        c.append(icon("gift"), info, btn); list.append(c); w.append(list);
      }
    });
  }
  if (Array.isArray(X.stay) && X.stay.length) {
    const w = section("stay", "Coming from afar?", "দূর থেকে আসছেন?", "Where to stay", "থাকার ব্যবস্থা");
    builders.push(() => {
      head(w); w.querySelectorAll(".xs-list").forEach((n) => n.remove());
      const list = el("div", "xs-list");
      X.stay.forEach((h) => { const c = el("div", "xs-card"), info = el("div"); info.append(el("b", null, t(h.name)), el("small", null, t(h.note))); c.append(icon("bed"), info); if (h.map) { const a = el("a", "venue-link", L("Map", "ম্যাপ")); a.href = h.map; a.target = "_blank"; a.rel = "noopener"; c.append(a); } else c.append(el("span")); list.append(c); });
      w.append(list);
    });
  }
  if (Array.isArray(X.faq) && X.faq.length) {
    const w = section("faq", "Good to know", "জেনে রাখুন", "Questions", "জিজ্ঞাসা");
    builders.push(() => { head(w); w.querySelectorAll(".xs-faq").forEach((n) => n.remove()); const f = el("div", "xs-faq"); X.faq.forEach((q) => { const d = el("details"); d.append(el("summary", null, t(q.q)), el("p", null, t(q.a))); f.append(d); }); w.append(f); });
  }

  // Accent = the design's title colour, unless the design sets --xs-accent itself.
  function accent() {
    blocks.forEach((sec) => {
      const w = sec.querySelector(".xs-wrap"), h = w && w.querySelector("h2");
      if (!h || getComputedStyle(w).getPropertyValue("--xs-accent").trim()) return;
      const m = getComputedStyle(h).color.match(/[\d.]+/g); if (!m) return;
      const [r, g, b2] = m.map(Number), lum = (0.299 * r + 0.587 * g + 0.114 * b2) / 255;
      w.style.setProperty("--xs-accent", `rgb(${r},${g},${b2})`);
      w.style.setProperty("--xs-on", lum > 0.6 ? "#2b1d16" : "#fff");
    });
  }
  function renderAll() { builders.forEach((b) => b()); accent(); }

  // Place the sections now (before app.js runs, so the design's reveal-on-scroll picks them up).
  SC.extrasSections = blocks;
  if (anchor && blocks.length) {
    if (anchor.id === "extras") anchor.replaceWith(...blocks);
    else anchor.before(...blocks);
  }
  // A design without a suitable spot (e.g. story slides) can mount them itself: SC.mountExtras(container)
  SC.mountExtras = (host) => { blocks.forEach((b) => { b.className = "xs-sec"; host.append(b); }); renderAll(); };
  SC.renderExtras = renderAll;
  renderAll();
  // Re-render when the design switches language (it sets <html lang>).
  new MutationObserver(renderAll).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
})();
