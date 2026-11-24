/*
  Shubho Chithi — shared card engine for the newer designs (load after data.js, media.js and extras.js, before the design's app.js).
  A design's HTML marks what goes where with data attributes; this file fills them in from data.js,
  handles Bangla/English, the guest's name, events, countdown, RSVP and reveal-on-scroll.

    data-i18n="key"        built-in text (STR below, or the design's own window.TPL_STRINGS)
    data-f="field"         dear · couple · gShort · bShort · gFull · bFull · gParents · bParents · gTitle · bTitle
                           message · closing · hashtag · mono · brand
    data-date="part"       main event: weekday · day · month · year · long · time · bangla · title · venue · address
    data-events            container with a <template> inside; in the template use data-ev="title|weekday|day|month|year|date|time|venue|address|bangla|icon",
                           data-ev-map (link), data-ev-cal (button)
    data-cd="d|h|m|s"      countdown numbers; [data-cd-wrap] hidden and [data-cd-done] shown after the day
    data-show="key"        hidden unless: bismillah · gallery · rsvp · contacts · blessing
    data-gallery, data-contacts, data-deadline, #rsvpForm
  A design adds its own behaviour with SC.core.on("render", fn) and opens with SC.core.reveal().
*/
(function () {
  "use strict";
  const D = window.INVITE;
  const SC = (window.SC = window.SC || {});
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const TZ = "Asia/Dhaka";

  const STR = {
    en: {
      dear: "Dear", invited: "You are invited", open: "Tap to open", together: "Together with their families",
      weds: "weds", and: "&", saveDate: "Save the date", countdown: "Counting down to forever", days: "Days", hours: "Hours", minutes: "Min", seconds: "Sec",
      married: "Happily married", addCal: "Add to calendar", events: "Wedding festivities", map: "Directions", save: "Save date",
      moments: "Cherished moments", rsvp: "Kindly reply", rsvpH: "Will you join us?", replyBy: "Please reply by",
      yourName: "Your name", accept: "Joyfully accept", decline: "Regretfully decline", guests: "Guests", wish: "Your wishes (optional)",
      send: "Send reply", sending: "Sending…", sent: "Thank you! Your reply has been sent.", needName: "Please write your name.",
      openedWa: "WhatsApp opened — please press send there.", call: "For any help", thanks: "With love & gratitude",
      scroll: "Scroll", langSwitch: "বাংলা", sonOf: "Son of", daughterOf: "Daughter of"
    },
    bn: {
      dear: "প্রিয়", invited: "আপনি আমন্ত্রিত", open: "খুলতে চাপুন", together: "পরিবারের সকলের পক্ষ থেকে",
      weds: "ও", and: "ও", saveDate: "তারিখটি মনে রাখুন", countdown: "শুভক্ষণের অপেক্ষায়", days: "দিন", hours: "ঘণ্টা", minutes: "মিনিট", seconds: "সেকেন্ড",
      married: "শুভ বিবাহ সম্পন্ন", addCal: "ক্যালেন্ডারে যোগ করুন", events: "বিয়ের অনুষ্ঠানমালা", map: "লোকেশন", save: "সেভ করুন",
      moments: "স্মৃতির পাতা", rsvp: "অনুগ্রহ করে জানান", rsvpH: "আপনি কি আসছেন?", replyBy: "উত্তর দেওয়ার শেষ তারিখ",
      yourName: "আপনার নাম", accept: "অবশ্যই আসব", decline: "আসতে পারছি না", guests: "অতিথির সংখ্যা", wish: "শুভেচ্ছা বার্তা (ঐচ্ছিক)",
      send: "উত্তর পাঠান", sending: "পাঠানো হচ্ছে…", sent: "ধন্যবাদ! আপনার উত্তর পৌঁছে গেছে।", needName: "অনুগ্রহ করে আপনার নাম লিখুন।",
      openedWa: "হোয়াটসঅ্যাপ খুলেছে — সেখানে সেন্ড চাপুন।", call: "যেকোনো প্রয়োজনে", thanks: "ভালোবাসা ও কৃতজ্ঞতায়",
      scroll: "নিচে দেখুন", langSwitch: "English", sonOf: "", daughterOf: ""
    }
  };
  const params = new URLSearchParams(location.search);
  const guest = (params.get("to") || "").trim().slice(0, 40);
  let lang = ["bn", "en"].includes(params.get("lang")) ? params.get("lang") : (D.defaultLang || "en");

  const t = (v) => (v && typeof v === "object" && !Array.isArray(v) ? (v[lang] || v.en || v.bn || "") : (v || ""));
  const s = (k) => { const own = window.TPL_STRINGS || {}; return (own[lang] && own[lang][k]) || STR[lang][k] || (own.en && own.en[k]) || STR.en[k] || ""; };
  const locale = () => (lang === "bn" ? "bn-BD" : "en-GB");
  const fmt = (iso, o) => new Intl.DateTimeFormat(locale(), { timeZone: TZ, ...o }).format(new Date(iso));
  const num = (n) => new Intl.NumberFormat(locale(), { useGrouping: false }).format(n);
  const time = (iso) => (SC.time ? SC.time(iso) : fmt(iso, { hour: "numeric", minute: "2-digit", hour12: true }));
  const utc = (iso) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const main = () => D.events[D.countdownEvent] || D.events[0];
  const couple = () => `${t(D.groom.short)} ${lang === "bn" ? "ও" : "&"} ${t(D.bride.short)}`;
  const calUrl = (ev) => "https://calendar.google.com/calendar/render?" + new URLSearchParams({
    action: "TEMPLATE", text: `${t(ev.title)} — ${couple()}`, dates: `${utc(ev.start)}/${utc(ev.end || ev.start)}`,
    location: [t(ev.venue), t(ev.address)].filter(Boolean).join(", "), ctz: TZ });
  const openCal = (ev) => (SC.openCalendar ? SC.openCalendar(calUrl(ev)) : window.open(calUrl(ev), "_blank", "noopener"));

  const ICON_RULES = [[/holud|haldi|হলুদ/i, "🌼"], [/mehendi|mehndi|মেহেদি/i, "🌿"], [/akdh|akd|nikah|kabin|আকদ|নিকাহ/i, "🤲"],
    [/walima|reception|bou|bhat|ওয়ালিমা|বৌভাত|সংবর্ধনা/i, "🍽️"], [/engage|বাগদান/i, "💍"], [/ashirbad|আশীর্বাদ/i, "🪔"], [/wedding|biye|bibaho|বিবাহ|বিয়ে/i, "💐"]];
  const iconOf = (ev) => ev.icon || ((ICON_RULES.find(([re]) => re.test((ev.title && ev.title.en) + " " + t(ev.title))) || [0, "🌸"])[1]);

  const field = {
    dear: () => (guest ? `${s("dear")} ${guest}` : s("invited")), couple, gShort: () => t(D.groom.short), bShort: () => t(D.bride.short),
    gFull: () => t(D.groom.full) || t(D.groom.short), bFull: () => t(D.bride.full) || t(D.bride.short),
    gParents: () => t(D.groom.parents), bParents: () => t(D.bride.parents), gTitle: () => t(D.groom.title), bTitle: () => t(D.bride.title),
    message: () => t(D.message), closing: () => t(D.closing), hashtag: () => D.hashtag || "", mono: () => D.monogram || "", brand: () => D.brand || "Shubho Chithi",
    blessing: () => t(D.blessing)
  };
  const datePart = {
    weekday: (e) => fmt(e.start, { weekday: "long" }), day: (e) => fmt(e.start, { day: "numeric" }), month: (e) => fmt(e.start, { month: "long" }),
    monthShort: (e) => fmt(e.start, { month: "short" }), year: (e) => fmt(e.start, { year: "numeric" }),
    long: (e) => fmt(e.start, { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
    date: (e) => fmt(e.start, { day: "numeric", month: "long", year: "numeric" }), time: (e) => time(e.start),
    bangla: (e) => (SC.bangla ? SC.bangla(e.start) : ""), title: (e) => t(e.title), venue: (e) => t(e.venue), address: (e) => t(e.address), icon: iconOf
  };
  const show = {
    bismillah: () => !!D.showBismillah, gallery: () => !!(D.gallery && D.gallery.length), rsvp: () => !!(D.rsvp && D.rsvp.enabled),
    contacts: () => !!(D.contacts && D.contacts.length), blessing: () => !!D.blessing, gTitle: () => !!t(D.groom.title), bTitle: () => !!t(D.bride.title),
    gParents: () => !!t(D.groom.parents), bParents: () => !!t(D.bride.parents)
  };

  const hooks = { render: [], open: [] };
  const core = (SC.core = { D, t, s, fmt, num, time, main, couple, calUrl, openCal, iconOf, get lang() { return lang; }, guest, on: (k, f) => hooks[k].push(f) });

  function render() {
    document.documentElement.lang = lang;
    document.title = `${couple()} — ${lang === "bn" ? "বিবাহের নিমন্ত্রণ" : "Wedding Invitation"}`;
    $$("[data-i18n]").forEach((n) => (n.textContent = s(n.dataset.i18n)));
    $$("[data-lang-toggle]").forEach((n) => (n.textContent = s("langSwitch")));
    $$("[data-f]").forEach((n) => { const f = field[n.dataset.f]; if (f) n.textContent = f(); });
    $$("[data-date]").forEach((n) => { const f = datePart[n.dataset.date]; if (f) n.textContent = f(main()); });
    $$("[data-show]").forEach((n) => { const f = show[n.dataset.show]; if (f) n.hidden = !f(); });

    $$("[data-events]").forEach((box) => {
      const tpl = box.querySelector("template"); if (!tpl) return;
      [...box.children].forEach((c) => { if (c !== tpl) c.remove(); });
      D.events.forEach((ev, i) => {
        const node = tpl.content.firstElementChild.cloneNode(true);
        node.style.setProperty("--i", i);
        $$("[data-ev]", node).forEach((n) => { const f = datePart[n.dataset.ev]; if (f) n.textContent = f(ev); });
        $$("[data-ev-map]", node).forEach((a) => { if (ev.map) { a.href = ev.map; a.target = "_blank"; a.rel = "noopener"; a.textContent = a.textContent || s("map"); } else a.remove(); });
        $$("[data-ev-cal]", node).forEach((b) => { b.textContent = b.textContent || s("save"); b.addEventListener("click", (e) => { e.preventDefault(); openCal(ev); }); });
        if (ev.dressCode) $$("[data-ev-dress]", node).forEach((n) => (n.textContent = t(ev.dressCode))); else $$("[data-ev-dress-wrap]", node).forEach((n) => n.remove());
        box.append(node);
      });
    });

    const g = $("[data-gallery]");
    if (g) { g.textContent = ""; (D.gallery || []).forEach((src) => { const i = document.createElement("img"); i.src = src; i.alt = ""; i.loading = "lazy"; g.append(i); }); }
    $$("[data-deadline]").forEach((n) => (n.textContent = D.rsvp && D.rsvp.deadline ? `${s("replyBy")} ${fmt(D.rsvp.deadline, { day: "numeric", month: "long", year: "numeric" })}` : ""));
    const cb = $("[data-contacts]");
    if (cb) { cb.textContent = ""; (D.contacts || []).forEach((p) => { const a = document.createElement("a"); a.href = "tel:" + p.phone.replace(/[^\d+]/g, ""); const n = document.createElement("span"); n.textContent = t(p.name); const b = document.createElement("b"); b.textContent = p.phone; a.append(n, b); cb.append(a); }); }
    $$("[data-cal-main]").forEach((b) => { b.onclick = (e) => { e.preventDefault(); openCal(main()); }; });
    tick();
    hooks.render.forEach((f) => f(core));
  }

  function tick() {
    const diff = new Date(main().start) - Date.now();
    const done = diff <= 0;
    $$("[data-cd-wrap]").forEach((n) => (n.hidden = done));
    $$("[data-cd-done]").forEach((n) => (n.hidden = !done));
    if (done) return;
    const v = { d: Math.floor(diff / 864e5), h: Math.floor(diff / 36e5) % 24, m: Math.floor(diff / 6e4) % 60, s: Math.floor(diff / 1e3) % 60 };
    const digits = (x, w) => String(x).padStart(w, "0").split("").map((c) => num(+c)).join("");
    $$("[data-cd]").forEach((n) => (n.textContent = digits(v[n.dataset.cd], n.dataset.cd === "d" ? 1 : 2)));
  }

  // Reveal-on-scroll for anything with .fade (and the shared extra sections)
  const io = "IntersectionObserver" in window ? new IntersectionObserver((es) => es.forEach((x) => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: 0.12 }) : null;
  const watch = () => $$(".fade:not(.in), .xs-sec:not(.in)").forEach((n) => (io ? io.observe(n) : n.classList.add("in")));

  // Open the card: hide the intro, show the page.
  core.reveal = (delay = 0) => {
    setTimeout(() => {
      const page = $("#page"); if (page) page.hidden = false;
      document.body.classList.remove("locked"); window.scrollTo(0, 0);
      requestAnimationFrame(() => { if (page) page.classList.add("show"); watch(); hooks.open.forEach((f) => f(core)); });
    }, delay);
  };

  // RSVP
  const form = $("#rsvpForm");
  if (form) {
    const status = form.querySelector(".status");
    if (guest && form.elements.name) form.elements.name.value = guest;
    form.addEventListener("change", () => { const w = form.querySelector("[data-guests]"); if (w) w.hidden = form.elements.attending.value === "no"; });
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = form.elements.name.value.trim();
      if (!name) { status.textContent = s("needName"); form.elements.name.focus(); return; }
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
  }

  $$("[data-lang-toggle]").forEach((b) => b.addEventListener("click", (e) => { e.stopPropagation(); lang = lang === "en" ? "bn" : "en"; render(); }));
  // Render once every script on the page has run, so the design's own hooks are registered first.
  const start = () => { render(); watch(); };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true }); else setTimeout(start, 0);
  setInterval(tick, 1000);
})();
