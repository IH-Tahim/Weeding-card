/* Lal Paar — light-the-diya invitation. No need to edit this file per client. */
(function () {
  "use strict";
  const D = window.INVITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const TZ = "Asia/Dhaka";
  const HOLD_MS = 1200;

  const L = {
    en: {
      dear: "Dear", hold: "Press & hold the lamp to light it 🪔", longer: "Hold a little longer…", skip: "Open without lighting",
      shubho: "Shubho Bibaho", weds: "weds", schedule: "Ceremonies", directions: "Directions", calendar: "Add to calendar",
      days: "Days", hours: "Hours", minutes: "Min", seconds: "Sec", married: "Shubho Bibaho completed 🙏", countdownTo: "Counting down to",
      moments: "Our moments", rsvpH: "Will you bless us with your presence?", replyBy: "Please reply by",
      yourName: "Your name", accept: "Yes, we'll come", decline: "Sorry, can't come", guests: "Number of guests",
      wish: "Your blessings (optional)", send: "Send reply", sending: "Sending…", sent: "Thank you! Your reply has been sent.",
      needName: "Please write your name.", openedWa: "WhatsApp opened — please press send there.",
      contact: "For any query", rotate: "Please hold your phone upright.", langSwitch: "বাংলা"
    },
    bn: {
      dear: "প্রিয়", hold: "প্রদীপটি চেপে ধরে জ্বালান 🪔", longer: "আরেকটু ধরে রাখুন…", skip: "প্রদীপ না জ্বালিয়ে খুলুন",
      shubho: "শুভ বিবাহ", weds: "ও", schedule: "অনুষ্ঠানসূচি", directions: "লোকেশন", calendar: "ক্যালেন্ডার",
      days: "দিন", hours: "ঘণ্টা", minutes: "মিনিট", seconds: "সেকেন্ড", married: "শুভ বিবাহ সুসম্পন্ন 🙏", countdownTo: "শুভক্ষণের অপেক্ষা",
      moments: "আমাদের মুহূর্ত", rsvpH: "আপনি কি আসছেন?", replyBy: "উত্তর দেওয়ার শেষ তারিখ",
      yourName: "আপনার নাম", accept: "অবশ্যই আসব", decline: "আসতে পারছি না", guests: "অতিথির সংখ্যা",
      wish: "আশীর্বাদ ও শুভেচ্ছা (ঐচ্ছিক)", send: "উত্তর পাঠান", sending: "পাঠানো হচ্ছে…", sent: "ধন্যবাদ! আপনার উত্তর পৌঁছে গেছে।",
      needName: "অনুগ্রহ করে আপনার নাম লিখুন।", openedWa: "হোয়াটসঅ্যাপ খুলেছে — সেখানে সেন্ড চাপুন।",
      contact: "যেকোনো প্রয়োজনে যোগাযোগ", rotate: "অনুগ্রহ করে ফোনটি সোজা করে ধরুন।", langSwitch: "English"
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

  function render() {
    document.documentElement.lang = lang;
    document.title = `${couple()} — ${s("shubho")}`;
    $$("[data-i18n]").forEach((n) => (n.textContent = s(n.dataset.i18n)));
    $$("[data-lang-toggle]").forEach((n) => (n.textContent = s("langSwitch")));
    $("#dear").textContent = guest ? `${s("dear")} ${guest}` : couple();
    $("#blessing").textContent = t(D.blessing);
    $("#blessing").hidden = !D.blessing;
    $("#message").textContent = t(D.message);
    $("#gName").textContent = t(D.groom.full); $("#gParents").textContent = t(D.groom.parents);
    $("#bName").textContent = t(D.bride.full); $("#bParents").textContent = t(D.bride.parents);
    $("#closing").textContent = t(D.closing);
    $("#sign").textContent = couple();
    $("#hashtag").textContent = D.hashtag || "";
    $("#brand").textContent = D.brand || "Your Brand";
    $("#cdTitle").textContent = t(main().title);

    const box = $("#events"); box.textContent = "";
    D.events.forEach((ev) => {
      const row = el("article", "row");
      const date = el("div", "date");
      date.append(el("b", null, fmt(ev.start, { day: "numeric" })), el("small", null, fmt(ev.start, { month: "short" })));
      const info = el("div", "info");
      info.append(el("h3", null, t(ev.title)),
        el("p", "when", `${fmt(ev.start, { weekday: "long" })} · ${fmt(ev.start, { hour: "numeric", minute: "2-digit", hour12: true })}`),
        el("p", "venue", t(ev.venue)), el("p", "addr", t(ev.address)));
      const links = el("div", "links");
      if (ev.map) { const a = el("a", null, "📍 " + s("directions")); a.href = ev.map; a.target = "_blank"; a.rel = "noopener"; links.append(a); }
      const c = el("a", null, "📅 " + s("calendar"));
      c.href = "https://calendar.google.com/calendar/render?" + new URLSearchParams({
        action: "TEMPLATE", text: `${t(ev.title)} — ${couple()}`, dates: `${utc(ev.start)}/${utc(ev.end || ev.start)}`,
        location: `${t(ev.venue)}, ${t(ev.address)}`, ctz: TZ });
      c.target = "_blank"; c.rel = "noopener"; links.append(c);
      info.append(links);
      row.append(date, info); box.append(row);
    });

    const g = $("#gallery"); g.textContent = "";
    $("#gallerySec").hidden = !(D.gallery && D.gallery.length);
    (D.gallery || []).forEach((src) => { const i = el("img"); i.src = src; i.alt = ""; i.loading = "lazy"; g.append(i); });

    $("#rsvpSec").hidden = !(D.rsvp && D.rsvp.enabled);
    $("#deadline").textContent = D.rsvp && D.rsvp.deadline ? `${s("replyBy")} ${fmt(D.rsvp.deadline, { day: "numeric", month: "long", year: "numeric" })}` : "";
    const cb = $("#contacts"); cb.textContent = "";
    (D.contacts || []).forEach((p) => { const a = el("a"); a.href = "tel:" + p.phone.replace(/[^\d+]/g, ""); a.append(el("span", null, t(p.name)), el("b", null, p.phone)); cb.append(a); });
    tick();
  }

  function tick() {
    const diff = new Date(main().start) - Date.now();
    if (diff <= 0) { $("#cd").hidden = true; $("#cdDone").hidden = false; return; }
    const v = { d: Math.floor(diff / 864e5), h: Math.floor(diff / 36e5) % 24, m: Math.floor(diff / 6e4) % 60, s: Math.floor(diff / 1e3) % 60 };
    $$("[data-cd]").forEach((n) => (n.textContent = num(v[n.dataset.cd])));
  }

  // ---------- Light the diya ----------
  const diya = $("#diya"), prog = $("#prog"), intro = $("#intro"), hint = $("#hint");
  const C = 351.9;
  let holdStart = 0, raf = 0, holdTimer = 0, lit = false;
  const setProg = (p) => { prog.style.strokeDashoffset = C * (1 - p); };

  function step(now) {
    const p = Math.min(1, (now - holdStart) / HOLD_MS);
    setProg(p);
    if (p >= 1) return light();
    raf = requestAnimationFrame(step);
  }
  function startHold(e) {
    if (lit) return;
    if (e && e.pointerId != null) diya.setPointerCapture(e.pointerId);
    diya.classList.add("holding");
    holdStart = performance.now();
    raf = requestAnimationFrame(step);
    holdTimer = setTimeout(light, HOLD_MS + 50); // backup if animation frames are throttled
  }
  function endHold() {
    if (lit || !holdStart) return;
    cancelAnimationFrame(raf); clearTimeout(holdTimer); holdStart = 0;
    diya.classList.remove("holding");
    setProg(0);
    hint.textContent = s("longer");
  }
  function light() {
    if (lit) return; lit = true;
    cancelAnimationFrame(raf); setProg(1);
    intro.classList.add("lit");
    if (navigator.vibrate) navigator.vibrate([20, 40, 20]);
    if (D.music) audio.play().catch(() => mBtn.classList.add("off"));
    setTimeout(() => {
      intro.classList.add("gone");
      $("#page").hidden = false;
      document.body.classList.remove("locked");
      window.scrollTo(0, 0);
    }, 1500);
  }
  diya.addEventListener("pointerdown", startHold);
  diya.addEventListener("pointerup", endHold);
  diya.addEventListener("pointercancel", endHold);
  diya.addEventListener("contextmenu", (e) => e.preventDefault());
  diya.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); light(); } });
  $("#skipBtn").addEventListener("click", light);

  const audio = $("#music"), mBtn = $("#musicBtn");
  if (D.music) {
    audio.src = D.music; mBtn.hidden = false;
    mBtn.addEventListener("click", () => {
      if (audio.paused) { audio.play().catch(() => {}); mBtn.classList.remove("off"); } else { audio.pause(); mBtn.classList.add("off"); }
    });
  }

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
      try { await fetch(D.rsvp.sheetUrl, { method: "POST", mode: "no-cors", body: new URLSearchParams(data) }); status.textContent = s("sent"); }
      catch (err) { status.textContent = "⚠ " + err.message; } finally { btn.disabled = false; }
    } else {
      const text = `RSVP — ${couple()}\nName: ${name}\n${yes ? "✅ Attending" : "❌ Not attending"}` +
        (yes ? `\nGuests: ${data.guests}` : "") + (data.message ? `\nNote: ${data.message}` : "");
      window.open(`https://wa.me/${(D.rsvp.whatsapp || "").replace(/\D/g, "")}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
      status.textContent = s("openedWa");
    }
  });

  $$("[data-lang-toggle]").forEach((b) => b.addEventListener("click", () => { lang = lang === "en" ? "bn" : "en"; render(); }));
  render();
  setInterval(tick, 1000);
})();
