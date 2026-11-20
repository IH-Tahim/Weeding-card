/* Emerald Scroll — pull-to-unroll invitation. No need to edit this file per client. */
(function () {
  "use strict";
  const D = window.INVITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const TZ = "Asia/Dhaka";
  const CLOSED = 70;

  const L = {
    en: {
      dear: "Dear", pull: "Pull down to open ↓", and: "and",
      verseTr: "“And among His signs is that He created for you spouses from among yourselves, that you may find tranquility in them.”",
      verseRef: "Surah Ar-Rum · 30:21",
      request: "The wedding of", groom: "The Groom", bride: "The Bride",
      events: "Celebrations", directions: "Directions", calendar: "Add to calendar",
      countdown: "Counting down", days: "Days", hours: "Hours", minutes: "Min", seconds: "Sec", married: "Alhamdulillah, married",
      moments: "Our moments", rsvp: "Kindly reply", rsvpH: "Will you join us?", replyBy: "Please reply by",
      yourName: "Your name", accept: "Joyfully accept", decline: "Regretfully decline", guests: "Number of guests",
      wish: "Your duas & wishes (optional)", send: "Send reply", sending: "Sending…", sent: "JazakAllahu khairan! Your reply has been sent.",
      needName: "Please write your name.", openedWa: "WhatsApp opened — please press send there.",
      duaTr: "May Allah bless you both, shower His blessings upon you, and unite you in goodness.",
      thanks: "With gratitude", rotate: "Please hold your phone upright.", langSwitch: "বাংলা"
    },
    bn: {
      dear: "প্রিয়", pull: "খুলতে নিচে টানুন ↓", and: "ও",
      verseTr: "“আর তাঁর নিদর্শনাবলির মধ্যে রয়েছে যে, তিনি তোমাদের জন্য তোমাদের মধ্য থেকেই জীবনসঙ্গিনী সৃষ্টি করেছেন, যাতে তোমরা তাদের কাছে প্রশান্তি পাও।”",
      verseRef: "সূরা আর-রূম · ৩০:২১",
      request: "শুভ বিবাহ", groom: "বর", bride: "কনে",
      events: "অনুষ্ঠানসমূহ", directions: "লোকেশন", calendar: "ক্যালেন্ডারে যোগ করুন",
      countdown: "আর মাত্র", days: "দিন", hours: "ঘণ্টা", minutes: "মিনিট", seconds: "সেকেন্ড", married: "আলহামদুলিল্লাহ, শুভ বিবাহ সম্পন্ন",
      moments: "আমাদের মুহূর্ত", rsvp: "অনুগ্রহ করে জানান", rsvpH: "আপনি কি আসছেন?", replyBy: "উত্তর দেওয়ার শেষ তারিখ",
      yourName: "আপনার নাম", accept: "অবশ্যই আসব", decline: "আসতে পারছি না", guests: "অতিথির সংখ্যা",
      wish: "দোয়া ও শুভেচ্ছা (ঐচ্ছিক)", send: "উত্তর পাঠান", sending: "পাঠানো হচ্ছে…", sent: "জাযাকাল্লাহু খাইরান! আপনার উত্তর পৌঁছে গেছে।",
      needName: "অনুগ্রহ করে আপনার নাম লিখুন।", openedWa: "হোয়াটসঅ্যাপ খুলেছে — সেখানে সেন্ড চাপুন।",
      duaTr: "আল্লাহ তোমাদের দুজনকে বরকত দিন, তোমাদের উপর বরকত বর্ষণ করুন এবং কল্যাণের সাথে তোমাদের একত্রিত রাখুন।",
      thanks: "কৃতজ্ঞতায়", rotate: "অনুগ্রহ করে ফোনটি সোজা করে ধরুন।", langSwitch: "English"
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
    document.title = `${couple()} — ${lang === "bn" ? "বিবাহের নিমন্ত্রণ" : "Wedding Invitation"}`;
    $$("[data-i18n]").forEach((n) => (n.textContent = s(n.dataset.i18n)));
    $$("[data-mono]").forEach((n) => (n.textContent = D.monogram));
    $$("[data-lang-toggle]").forEach((n) => (n.textContent = s("langSwitch")));
    $("#dear").textContent = guest ? `${s("dear")} ${guest}` : couple();
    $("#bismillah").hidden = !D.showBismillah;
    $("#verse").hidden = D.showVerse === false;
    $("#gName").textContent = t(D.groom.short); $("#bName").textContent = t(D.bride.short);
    $("#message").textContent = t(D.message);
    $("#heroDate").textContent = fmt(main().start, { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, " · ");
    $("#gFull").textContent = t(D.groom.full); $("#gParents").textContent = t(D.groom.parents);
    $("#bFull").textContent = t(D.bride.full); $("#bParents").textContent = t(D.bride.parents);
    $("#closing").textContent = t(D.closing);
    $("#sign").textContent = couple();
    $("#hashtag").textContent = D.hashtag || "";
    $("#brand").textContent = D.brand || "Shubho Chithi";
    $("#cdLabel").textContent = `${t(main().title)} — ${fmt(main().start, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}`;

    const box = $("#events"); box.textContent = "";
    D.events.forEach((ev) => {
      const card = el("article", "event");
      const badge = el("span", "badge"); badge.append(el("b", null, fmt(ev.start, { day: "numeric" })));
      card.append(badge,
        el("h3", "ev-title", t(ev.title)),
        el("p", "ev-when", `${fmt(ev.start, { weekday: "long" })} · ${fmt(ev.start, { month: "long" })} · ${fmt(ev.start, { hour: "numeric", minute: "2-digit", hour12: true })}`),
        el("p", "ev-venue", t(ev.venue)), el("p", "ev-addr", t(ev.address)));
      const b = el("div", "btns");
      if (ev.map) { const a = el("a", "btn", s("directions")); a.href = ev.map; a.target = "_blank"; a.rel = "noopener"; b.append(a); }
      const c = el("a", "btn ghost", s("calendar"));
      c.href = "https://calendar.google.com/calendar/render?" + new URLSearchParams({
        action: "TEMPLATE", text: `${t(ev.title)} — ${couple()}`, dates: `${utc(ev.start)}/${utc(ev.end || ev.start)}`,
        location: `${t(ev.venue)}, ${t(ev.address)}`, ctz: TZ });
      c.target = "_blank"; c.rel = "noopener"; b.append(c);
      card.append(b); box.append(card);
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

  // ---------- Pull to unroll ----------
  const scroll = $("#scroll"), paper = $("#paper"), inner = $("#inner"), handle = $("#handle");
  const audio = $("#music"), mBtn = $("#musicBtn");
  let state = "closed", drag = null;

  function unroll() {
    if (state !== "closed") return;
    state = "rolling";
    const full = inner.scrollHeight;
    paper.style.height = paper.getBoundingClientRect().height + "px";
    void paper.offsetHeight;
    scroll.classList.add("rolling");
    paper.style.transitionDuration = Math.min(3.2, 1.2 + full / 2500) + "s";
    paper.style.height = full + "px";
    document.body.classList.remove("locked");
    $("#hint").hidden = true;
    if (D.music) audio.play().catch(() => mBtn.classList.add("off"));
    const done = () => {
      if (state !== "rolling") return;
      state = "open";
      scroll.classList.remove("rolling"); scroll.classList.add("open");
      paper.style.height = ""; paper.style.transitionDuration = "";
    };
    paper.addEventListener("transitionend", (e) => { if (e.propertyName === "height") done(); }, { once: true });
    setTimeout(done, 3600); // safety net
  }
  function snapBack() {
    scroll.classList.add("rolling");
    paper.style.height = CLOSED + "px";
    setTimeout(() => scroll.classList.remove("rolling"), 600);
  }
  handle.addEventListener("pointerdown", (e) => {
    if (state !== "closed") return;
    handle.setPointerCapture(e.pointerId);
    drag = { y: e.clientY, moved: 0 };
    scroll.classList.add("dragging");
  });
  handle.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const dy = Math.max(0, e.clientY - drag.y);
    drag.moved = dy;
    paper.style.height = Math.min(CLOSED + dy, CLOSED + 420) + "px";
  });
  handle.addEventListener("pointerup", () => {
    if (!drag) return;
    const moved = drag.moved; drag = null;
    scroll.classList.remove("dragging");
    if (moved > 80 || moved < 6) unroll(); else snapBack();
  });
  handle.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); unroll(); } });
  $("#seal").addEventListener("click", unroll);

  if (D.music) {
    audio.src = D.music; mBtn.hidden = false;
    mBtn.addEventListener("click", () => {
      if (audio.paused) { audio.play().catch(() => {}); mBtn.classList.remove("off"); } else { audio.pause(); mBtn.classList.add("off"); }
    });
  }

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
