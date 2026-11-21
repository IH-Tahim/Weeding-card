/* Silk Ribbon — untie-the-bow invitation. No need to edit this file per client. */
(function () {
  "use strict";
  const D = window.INVITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const TZ = "Asia/Dhaka";

  const L = {
    en: {
      dear: "Dear", pull: "Pull the ribbon to open 🎀", weddingOf: "The wedding of", families: "With the blessings of our families",
      groom: "The Groom", bride: "The Bride", schedule: "Celebrations", scheduleH: "Join us for", directions: "📍 Map", calendar: "📅 Save",
      countdown: "Counting down to", days: "Days", hours: "Hours", minutes: "Min", seconds: "Sec", married: "Happily Married",
      saveDate: "Save the date + reminder", moments: "Our moments", rsvp: "Kindly reply", rsvpH: "Will you join us?", replyBy: "Please reply by",
      yourName: "Your name", accept: "Joyfully accept", decline: "Regretfully decline", guests: "Number of guests",
      wish: "Your wishes (optional)", send: "Send reply", sending: "Sending…", sent: "Thank you! Your reply has been sent.",
      needName: "Please write your name.", openedWa: "WhatsApp opened — please press send there.",
      thanks: "Thank You", rotate: "Please hold your phone upright.", langSwitch: "বাংলা"
    },
    bn: {
      dear: "প্রিয়", pull: "ফিতা টেনে দাওয়াতপত্র খুলুন 🎀", weddingOf: "শুভ বিবাহ", families: "উভয় পরিবারের দোয়ায়",
      groom: "বর", bride: "কনে", schedule: "অনুষ্ঠানসমূহ", scheduleH: "আপনি আমন্ত্রিত", directions: "📍 ম্যাপ", calendar: "📅 সেভ",
      countdown: "শুভক্ষণের অপেক্ষা", days: "দিন", hours: "ঘণ্টা", minutes: "মিনিট", seconds: "সেকেন্ড", married: "শুভ বিবাহ সম্পন্ন",
      saveDate: "তারিখ সেভ ও রিমাইন্ডার", moments: "আমাদের মুহূর্ত", rsvp: "অনুগ্রহ করে জানান", rsvpH: "আপনি কি আসছেন?", replyBy: "উত্তর দেওয়ার শেষ তারিখ",
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
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  const calUrl = (ev) => "https://calendar.google.com/calendar/render?" + new URLSearchParams({
    action: "TEMPLATE", text: `${t(ev.title)} — ${couple()}`, dates: `${utc(ev.start)}/${utc(ev.end || ev.start)}`,
    location: `${t(ev.venue)}, ${t(ev.address)}`, ctz: TZ });

  $$("[data-photo]").forEach((i) => { i.src = (window.SC && SC.photo) || "../shared/couple.svg"; i.alt = couple(); });

  function render() {
    document.documentElement.lang = lang;
    document.title = `${couple()} — ${lang === "bn" ? "বিবাহের নিমন্ত্রণ" : "Wedding Invitation"}`;
    $$("[data-i18n]").forEach((n) => (n.textContent = s(n.dataset.i18n)));
    $$("[data-mono]").forEach((n) => (n.textContent = D.monogram));
    $$("[data-lang-toggle]").forEach((n) => (n.textContent = s("langSwitch")));
    $("#dear").textContent = guest ? `${s("dear")} ${guest}` : couple();
    $("#insideNames").textContent = couple();
    $("#bismillah").hidden = !D.showBismillah;
    $("#gName").textContent = t(D.groom.short); $("#bName").textContent = t(D.bride.short);
    $("#message").textContent = t(D.message);
    $("#heroDate").textContent = fmt(main().start, { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, " · ");
    $("#gFull").textContent = t(D.groom.full); $("#gParents").textContent = t(D.groom.parents);
    $("#bFull").textContent = t(D.bride.full); $("#bParents").textContent = t(D.bride.parents);
    $("#closing").textContent = t(D.closing); $("#sign").textContent = couple();
    $("#hashtag").textContent = D.hashtag || ""; $("#brand").textContent = D.brand || "Shubho Chithi";
    $("#cdTitle").textContent = t(main().title);

    const box = $("#events"); box.textContent = "";
    D.events.forEach((ev) => {
      const card = el("article", "event");
      const d = el("div", "ev-date"); d.append(el("b", null, fmt(ev.start, { day: "numeric" })), el("span", null, fmt(ev.start, { month: "short" })));
      const info = el("div");
      info.append(el("h3", "ev-title", t(ev.title)),
        el("p", "ev-when", `${fmt(ev.start, { weekday: "long" })} · ${fmt(ev.start, { hour: "numeric", minute: "2-digit", hour12: true })}`),
        el("p", "ev-venue venue", t(ev.venue)), el("p", "ev-addr", t(ev.address)));
      const b = el("div", "btns");
      if (ev.map) { const a = el("a", "btn", s("directions")); a.href = ev.map; a.target = "_blank"; a.rel = "noopener"; b.append(a); }
      const c = el("a", "btn ghost", s("calendar")); c.href = calUrl(ev); c.target = "_blank"; c.rel = "noopener"; b.append(c);
      info.append(b); card.append(d, info); box.append(card);
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
  $("#saveDate").addEventListener("click", () => { if (window.SC && SC.openCalendar) SC.openCalendar(calUrl(main())); else window.open(calUrl(main()), "_blank"); });

  // ---------- Untie the ribbon ----------
  const boxEl = $("#box"), bow = $("#bow");
  let opened = false, drag = null;
  function untie() {
    if (opened) return; opened = true;
    boxEl.style.setProperty("--pull", 0);
    boxEl.classList.add("untie");
    $("#hint").style.opacity = 0;
    if (navigator.vibrate) navigator.vibrate(15);
    setTimeout(() => boxEl.classList.add("slide"), 650);
    setTimeout(() => boxEl.classList.add("open"), 1350);
    setTimeout(() => {
      $("#intro").classList.add("gone"); $("#page").hidden = false;
      document.body.classList.remove("locked"); window.scrollTo(0, 0);
    }, 2800);
  }
  bow.addEventListener("pointerdown", (e) => { if (opened) return; bow.setPointerCapture(e.pointerId); drag = { x: e.clientX, y: e.clientY, t: Date.now(), p: 0 }; });
  bow.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const dist = Math.hypot(e.clientX - drag.x, e.clientY - drag.y);
    drag.p = Math.min(1, dist / 90);
    boxEl.style.setProperty("--pull", drag.p.toFixed(3));
    if (drag.p >= 1) { drag = null; untie(); }
  });
  const end = () => {
    if (!drag) return;
    const quickTap = Date.now() - drag.t < 350 && drag.p < 0.15;
    const p = drag.p; drag = null;
    if (quickTap || p > 0.55) untie(); else boxEl.style.setProperty("--pull", 0);
  };
  bow.addEventListener("pointerup", end); bow.addEventListener("pointercancel", () => { drag = null; boxEl.style.setProperty("--pull", 0); });
  bow.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); untie(); } });

  // ---------- Reveal on scroll ----------
  const io = new IntersectionObserver((es) => es.forEach((x) => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: 0.12 });
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
    const data = { name, attending: yes ? "yes" : "no", guests: yes ? form.elements.guests.value : "0", message: form.elements.message.value.trim(), card: location.host + location.pathname };
    const btn = form.querySelector("button[type=submit]");
    if (D.rsvp.sheetUrl) {
      btn.disabled = true; status.textContent = s("sending");
      try { await fetch(D.rsvp.sheetUrl, { method: "POST", mode: "no-cors", body: new URLSearchParams(data) }); status.textContent = s("sent"); }
      catch (err) { status.textContent = "⚠ " + err.message; } finally { btn.disabled = false; }
    } else {
      const text = `RSVP — ${couple()}\nName: ${name}\n${yes ? "✅ Attending" : "❌ Not attending"}` + (yes ? `\nGuests: ${data.guests}` : "") + (data.message ? `\nNote: ${data.message}` : "");
      window.open(`https://wa.me/${(D.rsvp.whatsapp || "").replace(/\D/g, "")}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
      status.textContent = s("openedWa");
    }
  });

  $$("[data-lang-toggle]").forEach((b) => b.addEventListener("click", (e) => { e.stopPropagation(); lang = lang === "en" ? "bn" : "en"; render(); }));
  render();
  setInterval(tick, 1000);
})();
