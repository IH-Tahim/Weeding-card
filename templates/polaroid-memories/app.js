/* Polaroid Memories — swipe-the-photos scrapbook invitation. No need to edit this file per client. */
(function () {
  "use strict";
  const D = window.INVITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const TZ = "Asia/Dhaka";
  const LOOKS = ["sepia(.35) saturate(1.1)", "grayscale(1) contrast(1.05)", "saturate(1.15) hue-rotate(-6deg) brightness(1.03)"];
  const POS = ["50% 30%", "30% 40%", "70% 40%"];

  const L = {
    en: {
      dear: "Dear", swipe: "Swipe the photos →", invited: "You're invited", open: "Open the invitation", getting: "are getting married!",
      storyTitle: "Our little story", families: "With love from our families", groom: "The Groom", bride: "The Bride",
      scheduleH: "Save these dates", admit: "Admit all · Wedding", directions: "📍 Map", calendar: "📅 Save",
      countdownTo: "Counting down to", days: "Days", hours: "Hours", minutes: "Min", seconds: "Sec", married: "Just married! 🎉",
      saveDate: "📅 Save the date + reminder", moments: "More memories", rsvpH: "Will you come?", replyBy: "Please reply by",
      yourName: "Your name", accept: "Yes, I'll be there!", decline: "Sorry, can't", guests: "How many of you?",
      wish: "A note for us (optional)", send: "Send my reply ✉", sending: "Sending…", sent: "Got it, thank you! 💛",
      needName: "Please write your name.", openedWa: "WhatsApp opened — press send there.",
      thanks: "See you there!", rotate: "Please hold your phone upright.", langSwitch: "বাংলা"
    },
    bn: {
      dear: "প্রিয়", swipe: "ছবিগুলো সরিয়ে দেখুন →", invited: "আপনি আমন্ত্রিত", open: "দাওয়াতপত্র খুলুন", getting: "এর বিয়েতে আপনাকে দাওয়াত!",
      storyTitle: "আমাদের ছোট্ট গল্প", families: "দুই পরিবারের পক্ষ থেকে", groom: "বর", bride: "কনে",
      scheduleH: "তারিখগুলো মনে রাখুন", admit: "সবার জন্য প্রবেশ · বিয়ে", directions: "📍 ম্যাপ", calendar: "📅 সেভ",
      countdownTo: "আর মাত্র", days: "দিন", hours: "ঘণ্টা", minutes: "মিনিট", seconds: "সেকেন্ড", married: "শুভ বিবাহ সম্পন্ন! 🎉",
      saveDate: "📅 তারিখ সেভ ও রিমাইন্ডার", moments: "আরও স্মৃতি", rsvpH: "আপনি আসছেন তো?", replyBy: "উত্তর দেওয়ার শেষ তারিখ",
      yourName: "আপনার নাম", accept: "অবশ্যই আসব!", decline: "আসতে পারছি না", guests: "কতজন আসবেন?",
      wish: "আমাদের জন্য কিছু লিখুন (ঐচ্ছিক)", send: "উত্তর পাঠান ✉", sending: "পাঠানো হচ্ছে…", sent: "পেয়েছি, ধন্যবাদ! 💛",
      needName: "অনুগ্রহ করে আপনার নাম লিখুন।", openedWa: "হোয়াটসঅ্যাপ খুলেছে — সেখানে সেন্ড চাপুন।",
      thanks: "দেখা হচ্ছে বিয়েতে!", rotate: "অনুগ্রহ করে ফোনটি সোজা করে ধরুন।", langSwitch: "English"
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
  const photo = () => (window.SC && SC.photo) || "../shared/couple.svg";
  const story = () => (D.story && D.story.length ? D.story : [{ caption: "" }]).slice(0, 3);
  const calUrl = (ev) => "https://calendar.google.com/calendar/render?" + new URLSearchParams({
    action: "TEMPLATE", text: `${t(ev.title)} — ${couple()}`, dates: `${utc(ev.start)}/${utc(ev.end || ev.start)}`,
    location: `${t(ev.venue)}, ${t(ev.address)}`, ctz: TZ });
  function img(src, i) {
    const im = el("img"); im.src = src || photo(); im.alt = ""; im.loading = "lazy"; im.draggable = false;
    if (!src) { im.style.filter = LOOKS[i % 3]; im.style.objectPosition = POS[i % 3]; }
    return im;
  }

  // ---------- Polaroid stack ----------
  const stackEl = $("#stack");
  let cards = [], opened = false;
  function buildStack() {
    stackEl.textContent = "";
    const note = el("div", "pcard note");
    note.append(el("p", "t-small", s("invited")), el("p", "t-names", couple()),
      el("p", "t-date", fmt(main().start, { day: "numeric", month: "long", year: "numeric" })));
    const ob = el("button", "btn open-btn", s("open")); ob.type = "button"; ob.addEventListener("click", (e) => { e.stopPropagation(); openPage(); });
    note.append(ob);
    note.style.transform = "rotate(1.5deg)";
    stackEl.append(note);
    const items = story().slice().reverse();
    items.forEach((it, k) => {
      const i = items.length - 1 - k;
      const c = el("div", "pcard"); const ph = el("div", "ph"); ph.append(img(it.photo, i));
      c.append(ph, el("div", "cap", t(it.caption)));
      c.style.transform = `rotate(${[-4, 3, -2][i % 3]}deg)`;
      stackEl.append(c);
    });
    cards = [...stackEl.children].reverse(); // top first
    wireTop(); updateCount();
  }
  function updateCount() {
    const left = cards.filter((c) => !c.classList.contains("fly")).length;
    $("#count").textContent = left > 1 ? `${num(story().length - (left - 1) + 1)} / ${num(story().length)}` : "";
    $("#hint").style.visibility = left > 1 ? "visible" : "hidden";
  }
  function fly(card, dir) {
    card.classList.add("fly");
    card.style.transform = `translate(${dir * 130}vw, -10vh) rotate(${dir * 35}deg)`;
    if (navigator.vibrate) navigator.vibrate(8);
    setTimeout(updateCount, 50);
    if (card.classList.contains("note")) openPage(); else wireTop();
  }
  function wireTop() {
    const top = cards.find((c) => !c.classList.contains("fly")); if (!top || top._wired) return;
    top._wired = true;
    let d = null;
    top.addEventListener("pointerdown", (e) => { if (e.target.closest("button")) return; top.setPointerCapture(e.pointerId); d = { x: e.clientX, y: e.clientY, t: Date.now(), base: top.style.transform }; top.classList.add("dragging"); });
    top.addEventListener("pointermove", (e) => { if (!d) return; const dx = e.clientX - d.x, dy = e.clientY - d.y; top.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx / 12}deg)`; });
    const up = (e) => {
      if (!d) return; top.classList.remove("dragging");
      const dx = e.clientX - d.x, dy = e.clientY - d.y, quick = Date.now() - d.t < 300 && Math.hypot(dx, dy) < 8;
      const base = d.base; d = null;
      if (Math.abs(dx) > 80 || quick) fly(top, dx < 0 ? -1 : 1); else top.style.transform = base;
    };
    top.addEventListener("pointerup", up); top.addEventListener("pointercancel", () => { d = null; top.classList.remove("dragging"); });
  }
  function openPage() {
    if (opened) return; opened = true;
    setTimeout(() => {
      $("#intro").classList.add("gone"); $("#page").hidden = false;
      document.body.classList.remove("locked"); window.scrollTo(0, 0);
    }, 450);
  }
  document.addEventListener("keydown", (e) => {
    if (opened || !["Enter", " ", "ArrowRight", "ArrowLeft"].includes(e.key) || e.target.closest("button,input,textarea,select")) return;
    const top = cards.find((c) => !c.classList.contains("fly")); if (top) { e.preventDefault(); fly(top, e.key === "ArrowLeft" ? -1 : 1); }
  });

  // ---------- Page ----------
  function render() {
    document.documentElement.lang = lang;
    document.title = `${couple()} — ${lang === "bn" ? "বিয়ের দাওয়াত" : "Wedding Invitation"}`;
    $$("[data-i18n]").forEach((n) => (n.textContent = s(n.dataset.i18n)));
    $$("[data-lang-toggle]").forEach((n) => (n.textContent = s("langSwitch")));
    $$("[data-photo]").forEach((i) => { i.src = photo(); i.alt = couple(); });
    $("#dear").textContent = guest ? `${s("dear")} ${guest} 💌` : couple();
    $("#bismillah").hidden = !D.showBismillah;
    $("#heroCap").textContent = couple();
    $("#gName").textContent = t(D.groom.short); $("#bName").textContent = t(D.bride.short);
    $("#stampDay").textContent = fmt(main().start, { day: "numeric" });
    $("#stampMonth").textContent = fmt(main().start, { month: "short", year: "numeric" });
    $("#message").textContent = t(D.message);
    $("#gFull").textContent = t(D.groom.full); $("#gParents").textContent = t(D.groom.parents);
    $("#bFull").textContent = t(D.bride.full); $("#bParents").textContent = t(D.bride.parents);
    $("#closing").textContent = t(D.closing); $("#sign").textContent = couple();
    $("#hashtag").textContent = D.hashtag || ""; $("#brand").textContent = D.brand || "Shubho Chithi";
    $("#cdTitle").textContent = `${s("countdownTo")} ${t(main().title)}`;

    const strip = $("#strip"); strip.textContent = "";
    story().forEach((it, i) => { const f = el("figure", "pol"); f.append(img(it.photo, i), el("figcaption", "hand", t(it.caption))); strip.append(f); });

    const box = $("#events"); box.textContent = "";
    D.events.forEach((ev) => {
      const tk = el("article", "ticket");
      const m = el("div", "main");
      m.append(el("p", "admit", s("admit")), el("h3", null, t(ev.title)),
        el("p", "when", `${fmt(ev.start, { weekday: "long" })} · ${fmt(ev.start, { hour: "numeric", minute: "2-digit", hour12: true })}`),
        el("p", "venue", t(ev.venue)), el("p", "addr", t(ev.address)));
      const b = el("div", "btns");
      if (ev.map) { const a = el("a", "btn", s("directions")); a.href = ev.map; a.target = "_blank"; a.rel = "noopener"; b.append(a); }
      const c = el("a", "btn ghost", s("calendar")); c.href = calUrl(ev); c.target = "_blank"; c.rel = "noopener"; b.append(c);
      m.append(b);
      const stub = el("div", "stub"); stub.append(el("b", null, fmt(ev.start, { day: "numeric" })), el("span", null, fmt(ev.start, { month: "short" })));
      tk.append(m, stub); box.append(tk);
    });

    const g = $("#gallery"); g.textContent = "";
    $("#gallerySec").hidden = !(D.gallery && D.gallery.length);
    (D.gallery || []).forEach((src) => { const i = el("img"); i.src = src; i.alt = ""; i.loading = "lazy"; g.append(i); });
    $("#rsvpSec").hidden = !(D.rsvp && D.rsvp.enabled);
    $("#deadline").textContent = D.rsvp && D.rsvp.deadline ? `${s("replyBy")} ${fmt(D.rsvp.deadline, { day: "numeric", month: "long", year: "numeric" })}` : "";
    const cb = $("#contacts"); cb.textContent = "";
    (D.contacts || []).forEach((p) => { const a = el("a"); a.href = "tel:" + p.phone.replace(/[^\d+]/g, ""); a.append(el("span", null, t(p.name)), el("b", null, p.phone)); cb.append(a); });
    if (!opened) buildStack();
    tick();
  }
  function tick() {
    const diff = new Date(main().start) - Date.now();
    if (diff <= 0) { $("#cd").hidden = true; $("#cdDone").hidden = false; return; }
    const v = { d: Math.floor(diff / 864e5), h: Math.floor(diff / 36e5) % 24, m: Math.floor(diff / 6e4) % 60, s: Math.floor(diff / 1e3) % 60 };
    $$("[data-cd]").forEach((n) => (n.textContent = num(v[n.dataset.cd])));
  }
  $("#saveDate").addEventListener("click", () => { if (window.SC && SC.openCalendar) SC.openCalendar(calUrl(main())); else window.open(calUrl(main()), "_blank"); });

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
