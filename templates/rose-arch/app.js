/* Rose Arch — embossed envelope + misty arch + hanging date + festivities carousel. No need to edit per client. */
(function () {
  "use strict";
  const D = window.INVITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const TZ = "Asia/Dhaka";

  const L = {
    en: {
      dear: "Dear", tap: "Tap the seal to open", together: "Together with their families", scroll: "Scroll ↓",
      sonOf: "Son of", daughterOf: "Daughter of", seeYou: "See you on", days: "Days", hours: "Hrs", minutes: "Min", seconds: "Sec",
      married: "Happily Married", addCal: "Add to calendar", swipeTitle: "Swipe through the celebrations", festivities: "Wedding Festivities",
      swipeHint: "‹ › Swipe to see every event", dressCode: "Dress code", map: "📍 Map", save: "📅 Save",
      moments: "Cherished moments", rsvp: "Kindly reply", rsvpH: "Will you join us?", replyBy: "Please reply by",
      yourName: "Your name", accept: "Joyfully accept", decline: "Regretfully decline", guests: "Number of guests",
      wish: "Your wishes (optional)", send: "Send reply", sending: "Sending…", sent: "Thank you! Your reply has been sent.",
      needName: "Please write your name.", openedWa: "WhatsApp opened — please press send there.",
      thanks: "With love & gratitude", rotate: "Please hold your phone upright.", langSwitch: "বাংলা"
    },
    bn: {
      dear: "প্রিয়", tap: "সিলে চাপ দিয়ে খুলুন", together: "পরিবারের সকলের পক্ষ থেকে", scroll: "নিচে দেখুন ↓",
      sonOf: "", daughterOf: "", seeYou: "দেখা হচ্ছে", days: "দিন", hours: "ঘণ্টা", minutes: "মিনিট", seconds: "সেকেন্ড",
      married: "শুভ বিবাহ সম্পন্ন", addCal: "ক্যালেন্ডারে যোগ করুন", swipeTitle: "সব অনুষ্ঠান এক নজরে", festivities: "বিয়ের অনুষ্ঠানমালা",
      swipeHint: "‹ › সরিয়ে প্রতিটি অনুষ্ঠান দেখুন", dressCode: "ড্রেস কোড", map: "📍 ম্যাপ", save: "📅 সেভ",
      moments: "স্মৃতির পাতা", rsvp: "অনুগ্রহ করে জানান", rsvpH: "আপনি কি আসছেন?", replyBy: "উত্তর দেওয়ার শেষ তারিখ",
      yourName: "আপনার নাম", accept: "অবশ্যই আসব", decline: "আসতে পারছি না", guests: "অতিথির সংখ্যা",
      wish: "শুভেচ্ছা বার্তা (ঐচ্ছিক)", send: "উত্তর পাঠান", sending: "পাঠানো হচ্ছে…", sent: "ধন্যবাদ! আপনার উত্তর পৌঁছে গেছে।",
      needName: "অনুগ্রহ করে আপনার নাম লিখুন।", openedWa: "হোয়াটসঅ্যাপ খুলেছে — সেখানে সেন্ড চাপুন।",
      thanks: "ভালোবাসা ও কৃতজ্ঞতায়", rotate: "অনুগ্রহ করে ফোনটি সোজা করে ধরুন।", langSwitch: "English"
    }
  };
  const THEMES = [
    [/holud|haldi|হলুদ/i, ["linear-gradient(135deg,#ffe082,#f9a825)", "#f5b301", "#9a6400", "🌼"]],
    [/mehendi|mehndi|মেহেদি/i, ["linear-gradient(135deg,#aed581,#558b2f)", "#6a9b3a", "#3e6b1f", "🌿"]],
    [/akdh|akd|nikah|kabin|আকদ|নিকাহ/i, ["linear-gradient(135deg,#4caf8a,#0f5132)", "#2e7d5b", "#0f5132", "🤲"]],
    [/walima|reception|bou|bhat|ওয়ালিমা|বৌভাত|সংবর্ধনা/i, ["linear-gradient(135deg,#f6d9a8,#c99b3e)", "#d4a94e", "#7a5716", "🍽️"]],
    [/engage|বাগদান/i, ["linear-gradient(135deg,#f8bbd0,#c2185b)", "#e05a8a", "#ad1457", "💍"]],
    [/ashirbad|আশীর্বাদ/i, ["linear-gradient(135deg,#ffcc80,#ef6c00)", "#f08c1f", "#a34800", "🪔"]],
    [/wedding|biye|bibaho|বিবাহ|বিয়ে/i, ["linear-gradient(135deg,#ef9a9a,#b71c1c)", "#c62828", "#8e1b1b", "💐"]]
  ];
  const DEFAULT_THEME = ["linear-gradient(135deg,#f3c1cb,#c98b97)", "#d99aa7", "#7d2a3b", "🌸"];

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
  const themeOf = (ev) => {
    const name = (ev.title && (ev.title.en || "")) + " " + t(ev.title);
    const th = (THEMES.find(([re]) => re.test(name)) || [0, DEFAULT_THEME])[1].slice();
    if (ev.color) { th[0] = ev.color; th[1] = ev.color; }
    if (ev.icon) th[3] = ev.icon;
    return th;
  };

  // ---------- Render ----------
  function render() {
    document.documentElement.lang = lang;
    document.title = `${couple()} — ${lang === "bn" ? "বিবাহের নিমন্ত্রণ" : "Wedding Invitation"}`;
    $$("[data-i18n]").forEach((n) => (n.textContent = s(n.dataset.i18n)));
    $$("[data-mono]").forEach((n) => (n.textContent = D.monogram));
    $$("[data-lang-toggle]").forEach((n) => (n.textContent = s("langSwitch")));
    $("#dear").textContent = guest ? `${s("dear")} ${guest}` : couple();
    $("#bismillah").hidden = !D.showBismillah;
    $("#gName").textContent = t(D.groom.full) || t(D.groom.short);
    $("#bName").textContent = t(D.bride.full) || t(D.bride.short);
    $("#gParents").textContent = t(D.groom.parents);
    $("#bParents").textContent = t(D.bride.parents);
    $("#message").textContent = t(D.message);
    const m = main();
    $("#dDay").textContent = fmt(m.start, { weekday: "long" });
    $("#dNum").textContent = fmt(m.start, { day: "numeric" });
    $("#dMonth").textContent = fmt(m.start, { month: "long" });
    $("#dYear").textContent = fmt(m.start, { year: "numeric" });
    $("#dWhere").textContent = `${t(m.title)} · ${fmt(m.start, { hour: "numeric", minute: "2-digit", hour12: true })} · ${t(m.venue)}`;
    $("#seeYou").textContent = `${s("seeYou")} ${fmt(m.start, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}`;
    $("#closing").textContent = t(D.closing); $("#sign").textContent = couple();
    $("#hashtag").textContent = D.hashtag || ""; $("#brand").textContent = D.brand || "Shubho Chithi";

    // Festivities carousel
    const flow = $("#flow"), dots = $("#dots"); flow.textContent = ""; dots.textContent = "";
    D.events.forEach((ev, i) => {
      const [c1, c2, c3, icon] = themeOf(ev);
      const card = el("article", "fcard"); card.style.setProperty("--c1", c1); card.style.setProperty("--c2", c2); card.style.setProperty("--c3", c3);
      const top = el("div", "top"); top.append(el("span", "ic", icon));
      const body = el("div", "body");
      body.append(el("p", "when", `${fmt(ev.start, { weekday: "short", day: "numeric", month: "short" })} · ${fmt(ev.start, { hour: "numeric", minute: "2-digit", hour12: true })}`),
        el("h3", null, t(ev.title)), el("p", "venue", [t(ev.venue), t(ev.address)].filter(Boolean).join(", ")));
      if (ev.dressCode) {
        const d = el("div", "dress"); d.append(el("span", "sw"));
        const tx = el("div"); tx.append(el("small", null, s("dressCode")), el("b", null, t(ev.dressCode))); d.append(tx); body.append(d);
      } else body.append(el("div", null, "")).style.height = "12px";
      const acts = el("div", "acts");
      if (ev.map) { const a = el("a", "venue-link", s("map")); a.href = ev.map; a.target = "_blank"; a.rel = "noopener"; acts.append(a); }
      const c = el("a", null, s("save")); c.href = calUrl(ev); c.target = "_blank"; c.rel = "noopener"; acts.append(c);
      body.append(acts);
      card.append(top, body);
      card.addEventListener("click", (e) => { if (!e.target.closest("a")) card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" }); });
      flow.append(card); dots.append(el("i"));
    });
    requestAnimationFrame(updateFlow);

    const g = $("#gallery"); g.textContent = "";
    $("#gallerySec").hidden = !(D.gallery && D.gallery.length);
    (D.gallery || []).forEach((src) => { const i = el("img"); i.src = src; i.alt = ""; i.loading = "lazy"; g.append(i); });
    $("#rsvpSec").hidden = !(D.rsvp && D.rsvp.enabled);
    $("#deadline").textContent = D.rsvp && D.rsvp.deadline ? `${s("replyBy")} ${fmt(D.rsvp.deadline, { day: "numeric", month: "long", year: "numeric" })}` : "";
    const cb = $("#contacts"); cb.textContent = "";
    (D.contacts || []).forEach((p) => { const a = el("a"); a.href = "tel:" + p.phone.replace(/[^\d+]/g, ""); a.append(el("span", null, t(p.name)), el("b", null, p.phone)); cb.append(a); });
    tick();
  }

  // Coverflow: tilt and shrink cards by distance from the centre
  const flowEl = $("#flow");
  function updateFlow() {
    const box = flowEl.getBoundingClientRect(), mid = box.left + box.width / 2;
    let best = 0, bestD = 1e9;
    $$(".fcard", flowEl).forEach((c, i) => {
      const r = c.getBoundingClientRect(), o = (r.left + r.width / 2 - mid) / r.width, a = Math.min(Math.abs(o), 1.2);
      c.style.transform = `rotateY(${(-o * 26).toFixed(1)}deg) scale(${(1 - a * 0.12).toFixed(3)})`;
      c.style.opacity = (1 - a * 0.35).toFixed(2); c.style.zIndex = String(10 - Math.round(a * 5));
      if (Math.abs(o) < bestD) { bestD = Math.abs(o); best = i; }
    });
    $$("#dots i").forEach((d, i) => d.classList.toggle("on", i === best));
  }
  flowEl.addEventListener("scroll", () => requestAnimationFrame(updateFlow), { passive: true });
  window.addEventListener("resize", () => requestAnimationFrame(updateFlow));

  function tick() {
    const diff = new Date(main().start) - Date.now();
    if (diff <= 0) { $("#cd").hidden = true; $("#cdDone").hidden = false; return; }
    const v = { d: Math.floor(diff / 864e5), h: Math.floor(diff / 36e5) % 24, m: Math.floor(diff / 6e4) % 60, s: Math.floor(diff / 1e3) % 60 };
    $$("[data-cd]").forEach((n) => (n.textContent = num(v[n.dataset.cd])));
  }
  $("#addCal").addEventListener("click", () => { if (window.SC && SC.openCalendar) SC.openCalendar(calUrl(main())); else window.open(calUrl(main()), "_blank"); });

  // ---------- Petals ----------
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  let petalTimer = 0;
  function petal() {
    if (document.hidden) return;
    const host = $("#petals"); if (host.childElementCount > 16) return;
    const p = el("i");
    p.style.left = Math.random() * 100 + "%";
    p.style.setProperty("--dx", (Math.random() * 140 - 70) + "px");
    p.style.setProperty("--r", (Math.random() * 600 - 300) + "deg");
    p.style.animationDuration = 7 + Math.random() * 6 + "s";
    p.style.transform = `scale(${0.6 + Math.random() * 0.7}) rotate(${Math.random() * 180}deg)`;
    p.addEventListener("animationend", () => p.remove());
    host.append(p);
  }

  // ---------- Open the envelope ----------
  let opened = false;
  function openEnv() {
    if (opened) return; opened = true;
    $("#intro").classList.add("open");
    if (navigator.vibrate) navigator.vibrate(15);
    setTimeout(() => { $("#page").hidden = false; document.body.classList.remove("locked"); window.scrollTo(0, 0); requestAnimationFrame(() => { $("#page").classList.add("show"); updateFlow(); }); }, 1300);
    setTimeout(() => $("#intro").classList.add("gone"), 2600);
    if (!reduce) { for (let i = 0; i < 8; i++) setTimeout(petal, i * 180); petalTimer = setInterval(petal, 700); }
  }
  $("#seal").addEventListener("click", openEnv);
  $("#env").addEventListener("click", (e) => { if (!e.target.closest(".pill")) openEnv(); });
  document.addEventListener("keydown", (e) => { if (!opened && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openEnv(); } });

  const io = new IntersectionObserver((es) => es.forEach((x) => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); if (x.target.querySelector("#flow")) requestAnimationFrame(updateFlow); } }), { threshold: 0.12 });
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
