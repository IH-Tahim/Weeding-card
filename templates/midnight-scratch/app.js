/* Midnight — scratch-to-reveal invitation. No need to edit this file per client. */
(function () {
  "use strict";
  const D = window.INVITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const TZ = "Asia/Dhaka";

  const L = {
    en: {
      dear: "Dear", secret: "A special date is hidden under the gold.", scratchHint: "Scratch with your finger ✨",
      foil: "SCRATCH HERE", enter: "Open the invitation", skip: "Can't scratch? Tap here",
      weddingOf: "The wedding of", families: "With the blessings of", groom: "The Groom", bride: "The Bride",
      schedule: "Celebrations", scheduleH: "The Schedule", directions: "Directions", calendar: "Add to calendar",
      countdown: "Counting down to", days: "Days", hours: "Hours", minutes: "Min", seconds: "Sec", married: "Happily Married",
      moments: "Our moments", rsvp: "Kindly reply", rsvpH: "Will you join us?", replyBy: "Please reply by",
      yourName: "Your name", accept: "Joyfully accept", decline: "Regretfully decline", guests: "Number of guests",
      wish: "Your wishes (optional)", send: "Send reply", sending: "Sending…", sent: "Thank you! Your reply has been sent.",
      needName: "Please write your name.", openedWa: "WhatsApp opened — please press send there.",
      thanks: "Thank You", rotate: "Please hold your phone upright.", langSwitch: "বাংলা"
    },
    bn: {
      dear: "প্রিয়", secret: "সোনালি পর্দার নিচে লুকিয়ে আছে একটি বিশেষ তারিখ।", scratchHint: "আঙুল দিয়ে ঘষুন ✨",
      foil: "এখানে ঘষুন", enter: "নিমন্ত্রণপত্র খুলুন", skip: "ঘষতে পারছেন না? এখানে চাপুন",
      weddingOf: "শুভ বিবাহ", families: "পরিবারের দোয়ায়", groom: "বর", bride: "কনে",
      schedule: "অনুষ্ঠানসূচি", scheduleH: "অনুষ্ঠানের সময়সূচি", directions: "লোকেশন", calendar: "ক্যালেন্ডারে যোগ করুন",
      countdown: "যে অনুষ্ঠানের অপেক্ষা", days: "দিন", hours: "ঘণ্টা", minutes: "মিনিট", seconds: "সেকেন্ড", married: "শুভ বিবাহ সম্পন্ন",
      moments: "আমাদের মুহূর্ত", rsvp: "অনুগ্রহ করে জানান", rsvpH: "আপনি কি আসছেন?", replyBy: "উত্তর দেওয়ার শেষ তারিখ",
      yourName: "আপনার নাম", accept: "অবশ্যই আসব", decline: "আসতে পারছি না", guests: "অতিথির সংখ্যা",
      wish: "শুভেচ্ছা বার্তা (ঐচ্ছিক)", send: "উত্তর পাঠান", sending: "পাঠানো হচ্ছে…", sent: "ধন্যবাদ! আপনার উত্তর পৌঁছে গেছে।",
      needName: "অনুগ্রহ করে আপনার নাম লিখুন।", openedWa: "হোয়াটসঅ্যাপ খুলেছে — সেখানে সেন্ড চাপুন।",
      thanks: "ধন্যবাদ", rotate: "অনুগ্রহ করে ফোনটি সোজা করে ধরুন।", langSwitch: "English"
    }
  };

  const params = new URLSearchParams(location.search);
  const guest = (params.get("to") || "").trim().slice(0, 40);
  let lang = ["bn", "en"].includes(params.get("lang")) ? params.get("lang") : (D.defaultLang || "en");

  const t = (v) => (v && typeof v === "object" ? (v[lang] || v.en || "") : (v || ""));
  const s = (k) => L[lang][k];
  const locale = () => (lang === "bn" ? "bn-BD" : "en-GB");
  const fmt = (iso, o) => new Intl.DateTimeFormat(locale(), { timeZone: TZ, ...o }).format(new Date(iso));
  const num = (n) => new Intl.NumberFormat(locale(), { useGrouping: false }).format(n);
  const utc = (iso) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const main = () => D.events[D.countdownEvent] || D.events[0];
  const couple = () => `${t(D.groom.short)} & ${t(D.bride.short)}`;
  function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  const shortDate = (iso) => fmt(iso, { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, " · ");

  // ---------- Render ----------
  function render() {
    document.documentElement.lang = lang;
    document.title = `${couple()} — ${lang === "bn" ? "বিবাহের নিমন্ত্রণ" : "Wedding Invitation"}`;
    $$("[data-i18n]").forEach((n) => (n.textContent = s(n.dataset.i18n)));
    $$("[data-mono]").forEach((n) => (n.textContent = D.monogram));
    $$("[data-lang-toggle]").forEach((n) => (n.textContent = s("langSwitch")));

    $("#dear").textContent = guest ? `${s("dear")} ${guest}` : couple();
    $("#uNames").textContent = couple();
    $("#uDate").textContent = shortDate(main().start);
    $("#bismillah").hidden = !D.showBismillah;
    $("#gName").textContent = t(D.groom.short);
    $("#bName").textContent = t(D.bride.short);
    $("#message").textContent = t(D.message);
    $("#heroDate").textContent = shortDate(main().start);
    $("#gFull").textContent = t(D.groom.full); $("#gParents").textContent = t(D.groom.parents);
    $("#bFull").textContent = t(D.bride.full); $("#bParents").textContent = t(D.bride.parents);
    $("#closing").textContent = t(D.closing);
    $("#sign").textContent = couple();
    $("#hashtag").textContent = D.hashtag || "";
    $("#brand").textContent = D.brand || "Your Brand";
    $("#cdTitle").textContent = t(main().title);

    // Timeline
    const tl = $("#timeline"); tl.textContent = "";
    D.events.forEach((ev) => {
      const li = el("li");
      li.append(
        el("p", "tl-date", `${fmt(ev.start, { weekday: "long", day: "numeric", month: "long" })} · ${fmt(ev.start, { hour: "numeric", minute: "2-digit", hour12: true })}`),
        el("h3", "tl-title", t(ev.title)),
        el("p", "tl-venue", t(ev.venue)),
        el("p", "tl-addr", t(ev.address))
      );
      const b = el("div", "tl-btns");
      if (ev.map) { const a = el("a", "btn", s("directions")); a.href = ev.map; a.target = "_blank"; a.rel = "noopener"; b.append(a); }
      const c = el("a", "btn ghost", s("calendar"));
      c.href = "https://calendar.google.com/calendar/render?" + new URLSearchParams({
        action: "TEMPLATE", text: `${t(ev.title)} — ${couple()}`, dates: `${utc(ev.start)}/${utc(ev.end || ev.start)}`,
        location: `${t(ev.venue)}, ${t(ev.address)}`, ctz: TZ
      });
      c.target = "_blank"; c.rel = "noopener"; b.append(c);
      li.append(b); tl.append(li);
    });

    // Rings
    const rings = $("#rings"); rings.textContent = "";
    [["d", "days"], ["h", "hours"], ["m", "minutes"], ["s", "seconds"]].forEach(([u, k], i) => {
      const r = el("div", "ring");
      r.innerHTML = `<svg viewBox="0 0 100 100" aria-hidden="true">${i === 0 ? '<defs><linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff1c9"/><stop offset="1" stop-color="#c9a24f"/></linearGradient></defs>' : ""}<circle class="bg" cx="50" cy="50" r="45"/><circle class="fg" cx="50" cy="50" r="45" stroke-dasharray="282.7" stroke-dashoffset="282.7" data-ring="${u}"/></svg><div><b data-cd="${u}">0</b><span></span></div>`;
      r.querySelector("span").textContent = s(k);
      rings.append(r);
    });

    // Gallery
    const st = $("#strip"); st.textContent = "";
    $("#gallerySec").hidden = !(D.gallery && D.gallery.length);
    (D.gallery || []).forEach((src) => { const i = el("img"); i.src = src; i.alt = ""; i.loading = "lazy"; st.append(i); });

    // RSVP + contacts
    $("#rsvpSec").hidden = !(D.rsvp && D.rsvp.enabled);
    $("#deadline").textContent = D.rsvp && D.rsvp.deadline ? `${s("replyBy")} ${fmt(D.rsvp.deadline, { day: "numeric", month: "long", year: "numeric" })}` : "";
    const cb = $("#contacts"); cb.textContent = "";
    (D.contacts || []).forEach((p) => {
      const a = el("a"); a.href = "tel:" + p.phone.replace(/[^\d+]/g, "");
      a.append(el("span", null, t(p.name)), el("b", null, p.phone)); cb.append(a);
    });

    drawFoil();
    tick();
  }

  // ---------- Countdown rings ----------
  function tick() {
    const diff = new Date(main().start) - Date.now();
    if (diff <= 0) { $("#rings").hidden = true; $("#cdDone").hidden = false; return; }
    const v = { d: Math.floor(diff / 864e5), h: Math.floor(diff / 36e5) % 24, m: Math.floor(diff / 6e4) % 60, s: Math.floor(diff / 1e3) % 60 };
    const max = { d: 365, h: 24, m: 60, s: 60 };
    $$("[data-cd]").forEach((n) => (n.textContent = num(v[n.dataset.cd])));
    $$("[data-ring]").forEach((c) => {
      const u = c.dataset.ring;
      c.style.strokeDashoffset = 282.7 * (1 - Math.min(v[u], max[u]) / max[u]);
    });
  }

  // ---------- Scratch foil ----------
  const canvas = $("#foil"), ctx = canvas.getContext("2d");
  let revealed = false, moves = 0, last = null;
  function drawFoil() {
    if (revealed) return;
    const r = canvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(r.width * dpr); canvas.height = Math.round(r.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const w = r.width, h = r.height;
    ctx.globalCompositeOperation = "source-over";
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#a8802f"); g.addColorStop(.3, "#f3d98f"); g.addColorStop(.5, "#c9a24f");
    g.addColorStop(.72, "#fff1c9"); g.addColorStop(1, "#b08835");
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 900; i++) { // glitter
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * .35})`;
      ctx.fillRect(Math.random() * w, Math.random() * h, 1.2, 1.2);
    }
    ctx.strokeStyle = "rgba(120,85,25,.35)"; ctx.lineWidth = 1; ctx.strokeRect(10, 10, w - 20, h - 20);
    ctx.fillStyle = "rgba(95,64,15,.75)"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.font = lang === "bn" ? "600 20px 'Noto Serif Bengali', serif" : "600 18px Cinzel, serif";
    ctx.fillText(`✦  ${s("foil")}  ✦`, w / 2, h / 2);
  }
  function scratchAt(x, y) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 42; ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.beginPath();
    if (last) { ctx.moveTo(last.x, last.y); ctx.lineTo(x, y); } else { ctx.arc(x, y, 21, 0, Math.PI * 2); ctx.fill(); }
    ctx.stroke(); last = { x, y };
    if (++moves % 10 === 0) checkCleared();
  }
  function checkCleared() {
    const { width: w, height: h } = canvas;
    const data = ctx.getImageData(0, 0, w, h).data;
    let clear = 0, total = 0;
    for (let i = 3; i < data.length; i += 4 * 24) { total++; if (data[i] < 40) clear++; }
    if (clear / total > 0.5) reveal();
  }
  function pos(e) { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
  canvas.addEventListener("pointerdown", (e) => { canvas.setPointerCapture(e.pointerId); last = null; const p = pos(e); scratchAt(p.x, p.y); });
  canvas.addEventListener("pointermove", (e) => { if (e.buttons || e.pointerType === "touch") { if (!canvas.hasPointerCapture(e.pointerId)) return; const p = pos(e); scratchAt(p.x, p.y); } });
  canvas.addEventListener("pointerup", () => { last = null; checkCleared(); });

  function reveal() {
    if (revealed) return; revealed = true;
    canvas.classList.add("cleared");
    $("#hint").hidden = true; $("#skipBtn").hidden = true; $("#enterBtn").hidden = false;
    const r = $("#scratch").getBoundingClientRect();
    sparkles(r.left + r.width / 2, r.top + r.height / 2, 36);
    if (navigator.vibrate) navigator.vibrate(30);
  }
  function sparkles(x, y, n) {
    for (let i = 0; i < n; i++) {
      const sp = el("i", "sparkle");
      const a = Math.random() * Math.PI * 2, d = 60 + Math.random() * 140;
      sp.style.left = x + "px"; sp.style.top = y + "px";
      sp.style.setProperty("--dx", Math.cos(a) * d + "px"); sp.style.setProperty("--dy", Math.sin(a) * d + "px");
      sp.addEventListener("animationend", () => sp.remove());
      document.body.append(sp);
    }
  }
  $("#skipBtn").addEventListener("click", reveal);

  // ---------- Enter ----------
  const audio = $("#music"), mBtn = $("#musicBtn");
  if (D.music) {
    audio.src = D.music; mBtn.hidden = false;
    mBtn.addEventListener("click", () => {
      if (audio.paused) { audio.play().catch(() => {}); mBtn.classList.remove("off"); } else { audio.pause(); mBtn.classList.add("off"); }
    });
  }
  $("#enterBtn").addEventListener("click", () => {
    if (D.music) audio.play().catch(() => mBtn.classList.add("off"));
    $("#intro").classList.add("gone");
    $("#page").hidden = false;
    document.body.classList.remove("locked");
    window.scrollTo(0, 0);
  });

  // ---------- Lanterns ----------
  const lh = $(".lanterns");
  for (let i = 0; i < 9; i++) {
    const l = el("i");
    l.style.left = 5 + Math.random() * 90 + "%";
    l.style.setProperty("--dx", (Math.random() * 60 - 30) + "px");
    l.style.animationDuration = 18 + Math.random() * 16 + "s";
    l.style.animationDelay = -Math.random() * 30 + "s";
    l.style.transform = `scale(${0.6 + Math.random() * 0.7})`;
    lh.append(l);
  }

  // ---------- Reveal on scroll ----------
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
  $$(".fade").forEach((n) => io.observe(n));

  // ---------- RSVP ----------
  const form = $("#rsvpForm"), status = $("#status");
  if (guest) $("#rName").value = guest;
  form.addEventListener("change", () => { $("#guestsWrap").hidden = form.elements.attending.value === "no"; });
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = $("#rName").value.trim();
    if (!name) { status.textContent = s("needName"); $("#rName").focus(); return; }
    const yes = form.elements.attending.value === "yes";
    const data = { name, attending: yes ? "yes" : "no", guests: yes ? form.elements.guests.value : "0",
      message: form.elements.message.value.trim(), card: location.host + location.pathname };
    const btn = form.querySelector("button[type=submit]");
    if (D.rsvp.sheetUrl) {
      btn.disabled = true; status.textContent = s("sending");
      try {
        await fetch(D.rsvp.sheetUrl, { method: "POST", mode: "no-cors", body: new URLSearchParams(data) });
        status.textContent = s("sent");
        const r = btn.getBoundingClientRect(); sparkles(r.left + r.width / 2, r.top, 24);
      } catch (err) { status.textContent = "⚠ " + err.message; } finally { btn.disabled = false; }
    } else {
      const text = `RSVP — ${couple()}\nName: ${name}\n${yes ? "✅ Attending" : "❌ Not attending"}` +
        (yes ? `\nGuests: ${data.guests}` : "") + (data.message ? `\nNote: ${data.message}` : "");
      window.open(`https://wa.me/${(D.rsvp.whatsapp || "").replace(/\D/g, "")}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
      status.textContent = s("openedWa");
    }
  });

  // ---------- Language ----------
  $$("[data-lang-toggle]").forEach((b) => b.addEventListener("click", () => { lang = lang === "en" ? "bn" : "en"; render(); }));
  let lastW = innerWidth; // phones fire resize when the address bar hides — only redraw on real width changes
  window.addEventListener("resize", () => { if (!revealed && innerWidth !== lastW) { lastW = innerWidth; drawFoil(); } });

  render();
  if (document.fonts) document.fonts.ready.then(drawFoil);
  setInterval(tick, 1000);
})();
