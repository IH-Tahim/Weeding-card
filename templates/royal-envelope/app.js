/* Royal Envelope — invitation logic. No need to edit this file per client. */
(function () {
  "use strict";
  const D = window.INVITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const TZ = "Asia/Dhaka";

  const L = {
    en: {
      dear: "Dear", tapSeal: "Tap the seal to open", together: "The wedding of",
      scroll: "Scroll ↓", coupleTitle: "The bride & groom", coupleHeading: "Two Families, One Love",
      groom: "The Groom", bride: "The Bride", eventsTitle: "You are invited to", eventsHeading: "Celebrations",
      directions: "Directions", calendar: "Add to calendar", saveDate: "Save the date",
      countdownHeading: "Counting Down", days: "Days", hours: "Hours", minutes: "Min", seconds: "Sec",
      married: "Happily Married!", until: "until", galleryTitle: "Cherished moments", galleryHeading: "Our Journey",
      rsvpTitle: "Kindly reply", rsvpHeading: "Will you join us?", replyBy: "Please reply by",
      yourName: "Your name", accept: "Joyfully accept", decline: "Regretfully decline", guests: "Number of guests",
      note: "A note for the couple (optional)", send: "Send my reply", sending: "Sending…",
      sent: "Thank you! Your reply has been sent.", needName: "Please write your name.",
      openedWa: "WhatsApp opened — please press send there.", contactTitle: "For any query, call",
      gratitude: "With love & gratitude", thanks: "Thank You", readAgain: "Read again",
      rotate: "Please rotate your phone — this invitation is made for portrait view.", langSwitch: "বাংলা"
    },
    bn: {
      dear: "প্রিয়", tapSeal: "খুলতে সিলে চাপ দিন", together: "শুভ বিবাহ",
      scroll: "নিচে দেখুন ↓", coupleTitle: "বর ও কনে", coupleHeading: "দুটি পরিবার, এক বন্ধন",
      groom: "বর", bride: "কনে", eventsTitle: "আপনি আমন্ত্রিত", eventsHeading: "অনুষ্ঠানসমূহ",
      directions: "লোকেশন", calendar: "ক্যালেন্ডারে যোগ করুন", saveDate: "তারিখটি মনে রাখুন",
      countdownHeading: "আর মাত্র", days: "দিন", hours: "ঘণ্টা", minutes: "মিনিট", seconds: "সেকেন্ড",
      married: "শুভ বিবাহ সম্পন্ন!", until: "পর্যন্ত", galleryTitle: "স্মৃতির পাতা", galleryHeading: "আমাদের গল্প",
      rsvpTitle: "অনুগ্রহ করে জানান", rsvpHeading: "আপনি কি আসছেন?", replyBy: "উত্তর দেওয়ার শেষ তারিখ",
      yourName: "আপনার নাম", accept: "অবশ্যই আসব", decline: "আসতে পারছি না", guests: "অতিথির সংখ্যা",
      note: "বর-কনের জন্য শুভেচ্ছা (ঐচ্ছিক)", send: "উত্তর পাঠান", sending: "পাঠানো হচ্ছে…",
      sent: "ধন্যবাদ! আপনার উত্তর পৌঁছে গেছে।", needName: "অনুগ্রহ করে আপনার নাম লিখুন।",
      openedWa: "হোয়াটসঅ্যাপ খুলেছে — সেখানে সেন্ড চাপুন।", contactTitle: "যেকোনো প্রয়োজনে যোগাযোগ",
      gratitude: "ভালোবাসা ও কৃতজ্ঞতায়", thanks: "ধন্যবাদ", readAgain: "আবার পড়ুন",
      rotate: "অনুগ্রহ করে ফোনটি সোজা করে ধরুন।", langSwitch: "English"
    }
  };

  const params = new URLSearchParams(location.search);
  const guest = (params.get("to") || "").trim().slice(0, 40);
  let lang = params.get("lang") === "bn" || params.get("lang") === "en" ? params.get("lang") : (D.defaultLang || "en");

  const t = (v) => (v && typeof v === "object" ? (v[lang] || v.en || "") : (v || ""));
  const s = (k) => L[lang][k];
  const locale = () => (lang === "bn" ? "bn-BD" : "en-GB");
  const fmt = (iso, opts) => new Intl.DateTimeFormat(locale(), { timeZone: TZ, ...opts }).format(new Date(iso));
  const num = (n) => new Intl.NumberFormat(locale(), { useGrouping: false }).format(n);
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };

  // ---------- Calendar link ----------
  const utc = (iso) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  function calendarUrl(ev) {
    const q = new URLSearchParams({
      action: "TEMPLATE",
      text: `${t(ev.title)} — ${t(D.groom.short)} & ${t(D.bride.short)}`,
      dates: `${utc(ev.start)}/${utc(ev.end || ev.start)}`,
      location: `${t(ev.venue)}, ${t(ev.address)}`,
      ctz: TZ
    });
    return "https://calendar.google.com/calendar/render?" + q.toString();
  }

  // ---------- Render all text ----------
  function render() {
    document.documentElement.lang = lang;
    document.title = `${t(D.groom.short)} & ${t(D.bride.short)} — ${lang === "bn" ? "বিবাহের নিমন্ত্রণ" : "Wedding Invitation"}`;

    $$("[data-i18n]").forEach((n) => (n.textContent = s(n.dataset.i18n)));
    $$("[data-mono]").forEach((n) => (n.textContent = D.monogram));
    $$("[data-lang-toggle]").forEach((n) => (n.textContent = s("langSwitch")));

    $("#dear").textContent = guest ? `${s("dear")} ${guest}` : "";
    $("#bismillah").hidden = !D.showBismillah;
    $("#groomShort").textContent = t(D.groom.short);
    $("#brideShort").textContent = t(D.bride.short);
    $("#message").textContent = t(D.message);
    $("#groomFull").textContent = t(D.groom.full);
    $("#groomParents").textContent = t(D.groom.parents);
    $("#brideFull").textContent = t(D.bride.full);
    $("#brideParents").textContent = t(D.bride.parents);
    $("#closing").textContent = t(D.closing);
    $("#signoff").textContent = `${t(D.groom.short)} & ${t(D.bride.short)}`;
    $("#hashtag").textContent = D.hashtag || "";
    $("#brand").textContent = D.brand || "Shubho Chithi";

    const main = D.events[D.countdownEvent] || D.events[0];
    $("#heroDate").textContent = fmt(main.start, { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, " · ");
    $("#countdownLabel").textContent = lang === "bn"
      ? `${t(main.title)} — ${fmt(main.start, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}`
      : `${s("until")} ${t(main.title)} — ${fmt(main.start, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}`;

    // Events
    const box = $("#events"); box.textContent = "";
    D.events.forEach((ev) => {
      const card = el("article", "event");
      card.append(el("h3", null, t(ev.title)));
      const when = el("div", "when");
      when.append(
        el("span", "day", fmt(ev.start, { weekday: "long" })),
        el("span", "num", fmt(ev.start, { day: "numeric" })),
        el("span", "day", fmt(ev.start, { month: "long" }))
      );
      card.append(when);
      card.append(el("p", "time", `${fmt(ev.start, { year: "numeric" })} · ${fmt(ev.start, { hour: "numeric", minute: "2-digit", hour12: true })}`));
      card.append(el("p", "venue", t(ev.venue)));
      card.append(el("p", "addr", t(ev.address)));
      const acts = el("div", "actions");
      if (ev.map) { const a = el("a", "btn", s("directions")); a.href = ev.map; a.target = "_blank"; a.rel = "noopener"; acts.append(a); }
      const c = el("a", "btn ghost", s("calendar")); c.href = calendarUrl(ev); c.target = "_blank"; c.rel = "noopener"; acts.append(c);
      card.append(acts);
      box.append(card);
    });

    // Gallery
    const g = $("#gallery"); g.textContent = "";
    $("#gallerySection").hidden = !(D.gallery && D.gallery.length);
    (D.gallery || []).forEach((src) => { const i = el("img"); i.src = src; i.alt = ""; i.loading = "lazy"; g.append(i); });

    // RSVP
    $("#rsvpSection").hidden = !(D.rsvp && D.rsvp.enabled);
    $("#rsvpDeadline").textContent = D.rsvp && D.rsvp.deadline
      ? `${s("replyBy")} ${fmt(D.rsvp.deadline, { day: "numeric", month: "long", year: "numeric" })}` : "";

    // Contacts
    const cb = $("#contacts"); cb.textContent = "";
    $("#contactSection").hidden = !(D.contacts && D.contacts.length);
    (D.contacts || []).forEach((p) => {
      const a = el("a"); a.href = "tel:" + p.phone.replace(/[^\d+]/g, "");
      a.append(el("span", null, t(p.name)), el("b", null, p.phone));
      cb.append(a);
    });

    tick();
  }

  // ---------- Countdown ----------
  let timer;
  function tick() {
    const main = D.events[D.countdownEvent] || D.events[0];
    const diff = new Date(main.start) - Date.now();
    if (diff <= 0) {
      $("#countdown").hidden = true; $("#countdownDone").hidden = false; clearInterval(timer); return;
    }
    const v = { d: Math.floor(diff / 864e5), h: Math.floor(diff / 36e5) % 24, m: Math.floor(diff / 6e4) % 60, s: Math.floor(diff / 1e3) % 60 };
    $$("[data-cd]").forEach((n) => (n.textContent = num(v[n.dataset.cd])));
  }

  // ---------- Petals ----------
  function petals(count) {
    const host = $(".petals");
    for (let i = 0; i < count; i++) {
      const p = el("i");
      p.style.left = Math.random() * 100 + "%";
      p.style.setProperty("--dx", (Math.random() * 160 - 80) + "px");
      p.style.setProperty("--rot", (Math.random() * 720 - 360) + "deg");
      p.style.animationDuration = 4 + Math.random() * 4 + "s";
      p.style.animationDelay = Math.random() * 2.5 + "s";
      p.style.transform = `scale(${0.6 + Math.random() * 0.8})`;
      host.append(p);
      p.addEventListener("animationend", () => p.remove());
    }
  }

  // ---------- Music ----------
  const audio = $("#music"), mBtn = $("#musicBtn");
  if (D.music) {
    audio.src = D.music; mBtn.hidden = false;
    mBtn.addEventListener("click", () => {
      if (audio.paused) { audio.play().catch(() => {}); mBtn.classList.remove("off"); }
      else { audio.pause(); mBtn.classList.add("off"); }
    });
  }

  // ---------- Open envelope ----------
  let opened = false;
  function openCard() {
    if (opened) return; opened = true;
    $("#envelope").classList.add("open");
    if (D.music) audio.play().catch(() => mBtn.classList.add("off"));
    setTimeout(() => {
      $("#cover").classList.add("gone");
      $("#card").hidden = false; $("#card").classList.add("show");
      document.body.classList.remove("locked");
      window.scrollTo(0, 0);
      petals(28);
    }, 1700);
  }
  $("#seal").addEventListener("click", openCard);
  $("#envelope").addEventListener("click", openCard);
  document.body.classList.add("locked");

  $("#readAgain").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // ---------- Language ----------
  $$("[data-lang-toggle]").forEach((b) => b.addEventListener("click", (e) => {
    e.stopPropagation();
    lang = lang === "en" ? "bn" : "en";
    render();
  }));

  // ---------- Reveal on scroll ----------
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  }), { threshold: 0.15 });
  $$(".reveal").forEach((n) => io.observe(n));

  // ---------- RSVP ----------
  const form = $("#rsvpForm"), status = $("#rsvpStatus");
  if (guest) $("#rsvpName").value = guest;
  form.addEventListener("change", () => {
    $("#guestsWrap").hidden = form.elements.attending.value === "no";
  });
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = $("#rsvpName").value.trim();
    if (!name) { status.textContent = s("needName"); $("#rsvpName").focus(); return; }
    const data = {
      name, attending: form.elements.attending.value,
      guests: form.elements.attending.value === "yes" ? form.elements.guests.value : "0",
      message: form.elements.message.value.trim(),
      card: location.host + location.pathname
    };
    const btn = form.querySelector("button[type=submit]");
    if (D.rsvp.sheetUrl) {
      btn.disabled = true; status.textContent = s("sending");
      try {
        await fetch(D.rsvp.sheetUrl, { method: "POST", mode: "no-cors", body: new URLSearchParams(data) });
        status.textContent = s("sent"); form.reset(); $("#rsvpName").value = name;
      } catch (err) {
        status.textContent = "⚠ " + err.message;
      } finally { btn.disabled = false; }
    } else {
      const yes = data.attending === "yes";
      const text = `RSVP — ${t(D.groom.short)} & ${t(D.bride.short)}\n` +
        `Name: ${name}\n${yes ? "✅ Attending" : "❌ Not attending"}` +
        (yes ? `\nGuests: ${data.guests}` : "") + (data.message ? `\nNote: ${data.message}` : "");
      const wa = `https://wa.me/${(D.rsvp.whatsapp || "").replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
      window.open(wa, "_blank", "noopener");
      status.textContent = s("openedWa");
    }
  });

  render();
  timer = setInterval(tick, 1000);
})();
