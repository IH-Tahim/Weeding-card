/*
  Shubho Chithi — shared card features (load after data.js, before app.js):
  • Music: soft background music that starts very quietly on the guest's first tap and fades up slowly.
    Uses the couple's own file (data.js → music: "song.mp3") or, if none, a gentle built-in instrumental
    (Raag Bhupali-style santoor + tanpura drone, generated in the browser — no file, no copyright issues).
    A floating button turns it off/on; the choice is remembered.
  • Calendar: every "Add to calendar" button opens a sheet with Google Calendar AND a phone-calendar file
    (.ics for iPhone / Samsung / Outlook) that includes reminders 1 day and 3 hours before.
  • Map: every "Directions/লোকেশন" button opens a sheet with a live map of the venue, Google Maps directions
    and a "share location" button.
  • Share: a floating button to share the invitation link.
  • Photo: window.SC.photo is the couple's photo (data.js → photo) or the built-in couple illustration.
*/
(function () {
  "use strict";
  const D = window.INVITE || {};
  const here = document.currentScript ? new URL(".", document.currentScript.src).href : "";
  const SC = (window.SC = window.SC || {});
  SC.photo = D.photo || here + "couple.svg";
  SC.photoIsDefault = !D.photo;

  // Take music over from the templates so it is never played twice.
  const musicSrc = D.music || "";
  D.music = "";
  const musicEnabled = D.musicEnabled !== false;

  const bn = () => (document.documentElement.lang || "en").startsWith("bn");
  const T = (en, b) => (bn() ? b : en);
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  // ---------------- Styles ----------------
  const css = `
  .sc-dock{position:fixed;left:max(26px,env(safe-area-inset-left));bottom:max(16px,env(safe-area-inset-bottom));z-index:60;display:flex;gap:8px;opacity:0;transform:translateY(12px);transition:opacity .6s,transform .6s;pointer-events:none}
  .sc-dock.on{opacity:1;transform:none;pointer-events:auto}
  .sc-fab{width:44px;height:44px;border-radius:50%;border:1px solid rgba(255,255,255,.55);background:rgba(30,18,14,.55);color:#fff;display:grid;place-items:center;cursor:pointer;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);box-shadow:0 6px 18px -6px rgba(0,0,0,.5);padding:0}
  .sc-fab svg{width:20px;height:20px}
  .sc-fab:focus-visible{outline:3px solid #f3e2ac;outline-offset:2px}
  .sc-bars{display:flex;gap:2px;align-items:flex-end;height:16px}
  .sc-bars i{width:3px;background:#fff;border-radius:2px;height:4px;animation:scbar 1s ease-in-out infinite}
  .sc-bars i:nth-child(2){animation-delay:.2s}.sc-bars i:nth-child(3){animation-delay:.4s}.sc-bars i:nth-child(4){animation-delay:.1s}
  .sc-fab.off .sc-bars i{animation:none;height:3px;opacity:.6}
  .sc-fab.off::after{content:"";position:absolute;width:26px;height:2px;background:#fff;transform:rotate(-45deg);border-radius:2px}
  .sc-fab{position:relative}
  @keyframes scbar{50%{height:16px}}
  .sc-toast{position:fixed;left:50%;bottom:76px;transform:translateX(-50%);z-index:70;background:rgba(30,18,14,.85);color:#fff;font:14px/1.4 "Hind Siliguri",system-ui,sans-serif;padding:8px 14px;border-radius:99px;opacity:0;transition:opacity .4s;pointer-events:none;white-space:nowrap}
  .sc-toast.on{opacity:1}
  .sc-sheet-bg{position:fixed;inset:0;z-index:80;background:rgba(20,10,8,.45);opacity:0;transition:opacity .3s}
  .sc-sheet-bg.on{opacity:1}
  .sc-sheet{position:fixed;left:0;right:0;bottom:0;z-index:81;max-width:480px;margin:0 auto;background:#fffaf3;color:#2b1d16;border-radius:20px 20px 0 0;padding:10px 18px max(18px,env(safe-area-inset-bottom));font:15px/1.5 "Hind Siliguri","Li Ador Noirrit",system-ui,sans-serif;transform:translateY(100%);transition:transform .35s cubic-bezier(.2,.8,.2,1);box-shadow:0 -10px 40px rgba(0,0,0,.25)}
  .sc-sheet.on{transform:none}
  .sc-grab{width:44px;height:5px;border-radius:9px;background:#e3d6c2;margin:0 auto 10px}
  .sc-sheet h3{font-size:18px;margin:0 0 2px;font-weight:700}
  .sc-sheet p.sub{margin:0 0 12px;color:#7a6a5c;font-size:14px}
  .sc-sheet .sc-map{width:100%;height:220px;border:0;border-radius:14px;background:#eee;display:block;margin-bottom:12px}
  .sc-opts{display:grid;gap:8px}
  .sc-opt{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:14px;border:1px solid #eadfcb;background:#fff;color:inherit;text-decoration:none;font:inherit;text-align:left;cursor:pointer;width:100%}
  .sc-opt b{display:block;font-weight:700}
  .sc-opt small{display:block;color:#7a6a5c;font-size:13px}
  .sc-opt .ic{width:38px;height:38px;border-radius:12px;display:grid;place-items:center;font-size:20px;background:var(--sc-accent-soft,#f6e6e2);flex:none}
  .sc-opt.primary{background:var(--sc-accent,#7a1f2b);border-color:transparent;color:#fff}
  .sc-opt.primary small{color:rgba(255,255,255,.8)}
  .sc-opt.primary .ic{background:rgba(255,255,255,.18)}
  .sc-close{display:block;margin:12px auto 0;border:0;background:none;color:#7a6a5c;font:inherit;cursor:pointer;padding:6px 12px}
  @media (prefers-reduced-motion: reduce){.sc-sheet,.sc-sheet-bg,.sc-dock{transition:none}.sc-bars i{animation:none}}
  `;
  const st = document.createElement("style"); st.textContent = css; document.head.append(st);

  // ---------------- Music ----------------
  const TARGET = 0.5;      // final volume
  const FADE_IN = 9;       // seconds from silence to full
  let ctx = null, master = null, started = false, playing = false, audioEl = null, timer = null;

  function impulse(c, seconds, decay) {
    const len = c.sampleRate * seconds, buf = c.createBuffer(2, len, c.sampleRate);
    for (let ch = 0; ch < 2; ch++) { const d = buf.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay); }
    return buf;
  }
  function buildSynth() {
    // Gentle Raag Bhupali (Sa Re Ga Pa Dha) on D: santoor-like plucks over a soft tanpura drone.
    const bus = ctx.createBiquadFilter(); bus.type = "lowpass"; bus.frequency.value = 3400;
    const rev = ctx.createConvolver(); rev.buffer = impulse(ctx, 3.2, 2.6);
    const wet = ctx.createGain(); wet.gain.value = 0.45; const dry = ctx.createGain(); dry.gain.value = 0.75;
    bus.connect(dry).connect(master); bus.connect(rev); rev.connect(wet).connect(master);

    // Drone (D2 + A2 + D3), slowly breathing
    [73.42, 110, 146.83].forEach((f, i) => {
      const o = ctx.createOscillator(); o.type = "sawtooth"; o.frequency.value = f; o.detune.value = (i - 1) * 4;
      const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 520; lp.Q.value = 0.7;
      const g = ctx.createGain(); g.gain.value = 0.028;
      const lfo = ctx.createOscillator(); lfo.frequency.value = 0.07 + i * 0.03; const lg = ctx.createGain(); lg.gain.value = 180;
      lfo.connect(lg).connect(lp.frequency); o.connect(lp).connect(g).connect(bus); o.start(); lfo.start();
    });

    const N = { A3: 220, B3: 246.94, D4: 293.66, E4: 329.63, Fs4: 369.99, A4: 440, B4: 493.88, D5: 587.33, E5: 659.25 };
    const phrases = [
      ["A4", 0, "Fs4", "E4", "D4", 0, "E4", "Fs4", "A4", 0, "B4", "A4", "Fs4", 0, "E4", 0],
      ["D5", 0, "B4", "A4", "Fs4", 0, "A4", "B4", "A4", 0, "Fs4", "E4", "D4", 0, 0, 0],
      ["E4", "Fs4", "A4", 0, "B4", 0, "A4", "Fs4", "E4", 0, "D4", "E4", "Fs4", 0, 0, 0],
      ["A4", "B4", "D5", 0, "E5", 0, "D5", "B4", "A4", 0, "Fs4", 0, "E4", "D4", 0, 0]
    ];
    const STEP = 0.43; let step = 0, next = ctx.currentTime + 0.3;
    function pluck(freq, t, vel) {
      const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.16 * vel, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + 2.4);
      const p = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      const o1 = ctx.createOscillator(); o1.type = "triangle"; o1.frequency.value = freq;
      const o2 = ctx.createOscillator(); o2.type = "sine"; o2.frequency.value = freq * 2.01; const g2 = ctx.createGain(); g2.gain.value = 0.25;
      o1.connect(g); o2.connect(g2).connect(g);
      if (p) { p.pan.value = (Math.random() - 0.5) * 0.6; g.connect(p).connect(bus); } else g.connect(bus);
      o1.start(t); o2.start(t); o1.stop(t + 2.6); o2.stop(t + 2.6);
    }
    function tick() {
      while (next < ctx.currentTime + 0.6) {
        const ph = phrases[Math.floor(step / 16) % phrases.length], n = ph[step % 16];
        if (n) pluck(N[n], next, 0.75 + Math.random() * 0.25);
        if (step % 8 === 0) pluck(step % 16 === 0 ? N.D4 / 2 : N.A3 / 2, next, 0.55);
        step++; next += STEP * (Math.random() < 0.08 ? 1.12 : 1);
      }
    }
    timer = setInterval(tick, 120); tick();
  }
  function startMusic() {
    if (started || !musicEnabled) return;
    started = true;
    try {
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
      ctx = new AC(); master = ctx.createGain(); master.gain.value = 0.0001; master.connect(ctx.destination);
      if (musicSrc) {
        audioEl = new Audio(musicSrc); audioEl.loop = true; audioEl.crossOrigin = "anonymous"; audioEl.preload = "auto";
        ctx.createMediaElementSource(audioEl).connect(master);
        audioEl.play().catch(() => {});
      } else buildSynth();
      if (store.get("sc-music") === "off") { setUI(false); ctx.suspend(); return; }
      fadeTo(TARGET, FADE_IN); playing = true; setUI(true);
    } catch (e) { /* music is optional */ }
  }
  function fadeTo(v, secs) {
    const t = ctx.currentTime; master.gain.cancelScheduledValues(t);
    master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), t);
    master.gain.linearRampToValueAtTime(Math.max(v, 0.0001), t + secs);
  }
  function toggleMusic() {
    if (!started) { store.set("sc-music", "on"); startMusic(); return; }
    if (!ctx) return;
    if (playing) {
      playing = false; setUI(false); store.set("sc-music", "off"); fadeTo(0, 0.8);
      setTimeout(() => { if (!playing) { ctx.suspend(); if (audioEl) audioEl.pause(); } }, 900);
    } else {
      playing = true; setUI(true); store.set("sc-music", "on");
      ctx.resume().then(() => { if (audioEl) audioEl.play().catch(() => {}); fadeTo(TARGET, 4); });
    }
  }
  document.addEventListener("visibilitychange", () => {
    if (!ctx || !playing) return;
    if (document.hidden) { ctx.suspend(); if (audioEl) audioEl.pause(); }
    else ctx.resume().then(() => { if (audioEl) audioEl.play().catch(() => {}); master.gain.setValueAtTime(0.0001, ctx.currentTime); fadeTo(TARGET, 3); });
  });

  // ---------------- Dock (music + share) ----------------
  const dock = document.createElement("div"); dock.className = "sc-dock";
  const mBtn = document.createElement("button"); mBtn.className = "sc-fab off"; mBtn.type = "button";
  mBtn.innerHTML = '<span class="sc-bars" aria-hidden="true"><i></i><i></i><i></i><i></i></span>';
  const sBtn = document.createElement("button"); sBtn.className = "sc-fab"; sBtn.type = "button";
  sBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>';
  if (musicEnabled) dock.append(mBtn);
  dock.append(sBtn);
  function setUI(on) {
    mBtn.classList.toggle("off", !on);
    mBtn.setAttribute("aria-label", on ? T("Turn music off", "মিউজিক বন্ধ করুন") : T("Turn music on", "মিউজিক চালু করুন"));
    mBtn.setAttribute("aria-pressed", String(on));
  }
  setUI(false);
  sBtn.setAttribute("aria-label", "Share");
  mBtn.addEventListener("click", (e) => { e.stopPropagation(); toggleMusic(); });
  sBtn.addEventListener("click", async (e) => {
    e.stopPropagation();
    const u = new URL(location.href); u.searchParams.delete("to");
    const title = document.title;
    if (navigator.share) { try { await navigator.share({ title, url: u.href }); return; } catch (x) { return; } }
    try { await navigator.clipboard.writeText(u.href); toast(T("Link copied", "লিংক কপি হয়েছে")); }
    catch (x) { window.open("https://wa.me/?text=" + encodeURIComponent(title + "\n" + u.href), "_blank", "noopener"); }
  });
  ["pointerdown", "keydown"].forEach((ev) => document.addEventListener(ev, function first(e) {
    if (e.target && e.target.closest && e.target.closest(".sc-dock,.sc-sheet")) return;
    document.removeEventListener(ev, first, true);
    dock.classList.add("on"); startMusic();
  }, true));
  const ready = () => document.body.append(dock);
  if (document.body) ready(); else document.addEventListener("DOMContentLoaded", ready);

  let toastEl;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "sc-toast"; document.body.append(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add("on"); clearTimeout(toastEl._t); toastEl._t = setTimeout(() => toastEl.classList.remove("on"), 2200);
  }

  // ---------------- Bottom sheet ----------------
  function sheet(build) {
    const bg = document.createElement("div"); bg.className = "sc-sheet-bg";
    const sh = document.createElement("div"); sh.className = "sc-sheet"; sh.setAttribute("role", "dialog"); sh.setAttribute("aria-modal", "true");
    sh.innerHTML = '<div class="sc-grab"></div>'; build(sh);
    const close = document.createElement("button"); close.className = "sc-close"; close.type = "button"; close.textContent = T("Close", "বন্ধ করুন"); sh.append(close);
    const done = () => { bg.classList.remove("on"); sh.classList.remove("on"); setTimeout(() => { bg.remove(); sh.remove(); }, 350); document.removeEventListener("keydown", esc); };
    const esc = (e) => { if (e.key === "Escape") done(); };
    bg.addEventListener("click", done); close.addEventListener("click", done); document.addEventListener("keydown", esc);
    ["pointerdown", "pointerup", "click"].forEach((ev) => sh.addEventListener(ev, (e) => e.stopPropagation()));
    document.body.append(bg, sh); requestAnimationFrame(() => { bg.classList.add("on"); sh.classList.add("on"); });
    setTimeout(() => (sh.querySelector("a,button") || close).focus({ preventScroll: true }), 50);
    return done;
  }
  function opt(tag, icon, title, sub, primary) {
    const el = document.createElement(tag); el.className = "sc-opt" + (primary ? " primary" : "");
    if (tag === "button") el.type = "button";
    el.innerHTML = `<span class="ic" aria-hidden="true">${icon}</span><span><b></b><small></small></span>`;
    el.querySelector("b").textContent = title; el.querySelector("small").textContent = sub || "";
    return el;
  }

  // ---------------- Calendar (.ics with reminders) ----------------
  function icsFor(text, dates, location, details) {
    const [s, e] = dates.split("/");
    const esc = (v) => String(v || "").replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
    const now = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    return [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Shubho Chithi//Invitation//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
      "BEGIN:VEVENT", `UID:${s}-${Math.random().toString(36).slice(2)}@shubhochithi.com`, `DTSTAMP:${now}`,
      `DTSTART:${s}`, `DTEND:${e || s}`, `SUMMARY:${esc(text)}`, `LOCATION:${esc(location)}`, `DESCRIPTION:${esc(details)}`,
      "BEGIN:VALARM", "ACTION:DISPLAY", `DESCRIPTION:${esc(text)}`, "TRIGGER:-P1D", "END:VALARM",
      "BEGIN:VALARM", "ACTION:DISPLAY", `DESCRIPTION:${esc(text)}`, "TRIGGER:-PT3H", "END:VALARM",
      "END:VEVENT", "END:VCALENDAR"
    ].join("\r\n");
  }
  function openCalendar(href) {
    const q = new URL(href).searchParams;
    const text = q.get("text") || document.title, dates = q.get("dates") || "", loc = q.get("location") || "";
    const link = location.href.split("#")[0];
    const startD = dates ? new Date(dates.slice(0, 4) + "-" + dates.slice(4, 6) + "-" + dates.slice(6, 8) + "T" + dates.slice(9, 11) + ":" + dates.slice(11, 13) + ":00Z") : null;
    sheet((sh) => {
      const h = document.createElement("h3"); h.textContent = T("Save the date", "তারিখটি সেভ করুন");
      const p = document.createElement("p"); p.className = "sub";
      p.textContent = (startD ? startD.toLocaleString(bn() ? "bn-BD" : "en-GB", { timeZone: "Asia/Dhaka", weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit", hour12: true }) + " · " : "") + T("Reminder 1 day and 3 hours before", "১ দিন ও ৩ ঘণ্টা আগে রিমাইন্ডার");
      const box = document.createElement("div"); box.className = "sc-opts";
      const g = opt("a", "📅", "Google Calendar", T("Android / Gmail", "অ্যান্ড্রয়েড / জিমেইল"), true);
      g.href = href + "&details=" + encodeURIComponent(link); g.target = "_blank"; g.rel = "noopener";
      const ics = opt("a", "📱", T("Phone calendar (.ics)", "ফোনের ক্যালেন্ডার (.ics)"), T("iPhone, Samsung, Outlook, with reminders", "আইফোন, স্যামসাং, আউটলুক — রিমাইন্ডারসহ"));
      ics.href = "data:text/calendar;charset=utf-8," + encodeURIComponent(icsFor(text, dates, loc, link));
      ics.download = (text.replace(/[^\w\u0980-\u09FF]+/g, "-").slice(0, 40) || "invitation") + ".ics";
      box.append(g, ics); sh.append(h, p, box);
    });
  }

  // ---------------- Map sheet ----------------
  function openMap(href, label) {
    let query = "";
    try { const u = new URL(href); query = u.searchParams.get("query") || u.searchParams.get("q") || u.searchParams.get("destination") || ""; } catch (e) {}
    sheet((sh) => {
      const h = document.createElement("h3"); h.textContent = label || T("Venue location", "ভেন্যুর লোকেশন");
      const p = document.createElement("p"); p.className = "sub"; p.textContent = query || T("Tap below for directions", "দিকনির্দেশনার জন্য নিচে চাপুন");
      sh.append(h, p);
      if (query) {
        const f = document.createElement("iframe"); f.className = "sc-map"; f.loading = "lazy"; f.title = "Map";
        f.referrerPolicy = "no-referrer-when-downgrade";
        f.src = "https://maps.google.com/maps?q=" + encodeURIComponent(query) + "&z=15&output=embed"; sh.append(f);
      }
      const box = document.createElement("div"); box.className = "sc-opts";
      const dir = opt("a", "🧭", T("Get directions", "দিকনির্দেশনা দেখুন"), "Google Maps", true);
      dir.href = query ? "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(query) : href; dir.target = "_blank"; dir.rel = "noopener";
      const share = opt("button", "📤", T("Share location", "লোকেশন শেয়ার করুন"), T("Send to family on WhatsApp", "পরিবারকে WhatsApp-এ পাঠান"));
      share.addEventListener("click", async () => {
        const url = query ? "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query) : href;
        if (navigator.share) { try { await navigator.share({ title: label || "Venue", url }); } catch (e) {} }
        else window.open("https://wa.me/?text=" + encodeURIComponent((label ? label + "\n" : "") + url), "_blank", "noopener");
      });
      box.append(dir, share); sh.append(box);
    });
  }

  // Intercept the templates' own calendar / map links (no template changes needed)
  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest("a[href]"); if (!a || e.defaultPrevented) return;
    const h = a.getAttribute("href");
    if (/calendar\.google\.com\/calendar\/render/.test(h)) { e.preventDefault(); e.stopPropagation(); openCalendar(a.href); }
    else if (/google\.[a-z.]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps/.test(h)) {
      e.preventDefault(); e.stopPropagation();
      const card = a.closest("article,li,section,.event,.row");
      const t = card && (card.querySelector(".venue,.ev-venue,.tl-venue") || card.querySelector("h3,h2"));
      openMap(a.href, t ? t.textContent.trim() : "");
    }
  }, true);

  // Fill every <img data-photo> with the couple photo (or the illustration)
  const fillPhotos = () => document.querySelectorAll("img[data-photo]").forEach((i) => {
    if (!i.getAttribute("src")) { i.src = SC.photo; i.loading = "lazy"; i.decoding = "async"; }
    if (!i.alt) i.alt = SC.photoIsDefault ? "Bride and groom illustration" : "The couple";
  });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fillPhotos); else fillPhotos();

  SC.openMap = openMap; SC.openCalendar = openCalendar; SC.toast = toast;
  SC.musicStatus = () => ({ started, playing, state: ctx ? ctx.state : "none", volume: master ? +master.gain.value.toFixed(3) : 0, source: musicSrc ? "file" : "built-in" });
})();
