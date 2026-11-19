/* Rangila — story-style invitation. No need to edit this file per client. */
(function () {
  "use strict";
  const D = window.INVITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const TZ = "Asia/Dhaka";
  const SLIDE_MS = 7000;

  const L = {
    en: {
      dear: "Dear", invited: "You are invited to a wedding!", openDoors: "Open the doors 🌼",
      weds: "weds", tapNext: "Tap to continue →", families: "Our families", groom: "The Groom", bride: "The Bride",
      event: "Event", directions: "📍 Directions", calendar: "📅 Save date",
      countdown: "Counting down", days: "Days", hours: "Hours", minutes: "Min", seconds: "Sec", married: "Happily married! 🎉",
      memories: "Our moments", rsvpH: "Will you come?", replyBy: "Please reply by",
      yourName: "Your name", accept: "Yes, coming!", decline: "Sorry, can't", guests: "How many guests?",
      note: "Your wishes (optional)", send: "Send reply", sending: "Sending…", sent: "Thank you! Reply sent 💛",
      needName: "Please write your name.", openedWa: "WhatsApp opened — press send there.",
      thanks: "See you there!", call: "Questions? Call", again: "↺ Watch again",
      rotate: "Please hold your phone upright 🙂", langSwitch: "বাংলা"
    },
    bn: {
      dear: "প্রিয়", invited: "আপনি বিয়ের দাওয়াতে আমন্ত্রিত!", openDoors: "দরজা খুলুন 🌼",
      weds: "ও", tapNext: "পরের পাতায় যেতে চাপ দিন →", families: "আমাদের পরিবার", groom: "বর", bride: "কনে",
      event: "অনুষ্ঠান", directions: "📍 লোকেশন", calendar: "📅 তারিখ সেভ",
      countdown: "আর মাত্র", days: "দিন", hours: "ঘণ্টা", minutes: "মিনিট", seconds: "সেকেন্ড", married: "শুভ বিবাহ সম্পন্ন! 🎉",
      memories: "আমাদের মুহূর্ত", rsvpH: "আপনি আসছেন তো?", replyBy: "উত্তর দেওয়ার শেষ তারিখ",
      yourName: "আপনার নাম", accept: "অবশ্যই আসব!", decline: "আসতে পারছি না", guests: "কতজন আসবেন?",
      note: "শুভেচ্ছা বার্তা (ঐচ্ছিক)", send: "উত্তর পাঠান", sending: "পাঠানো হচ্ছে…", sent: "ধন্যবাদ! উত্তর পৌঁছে গেছে 💛",
      needName: "অনুগ্রহ করে আপনার নাম লিখুন।", openedWa: "হোয়াটসঅ্যাপ খুলেছে — সেখানে সেন্ড চাপুন।",
      thanks: "দেখা হচ্ছে বিয়েতে!", call: "যেকোনো প্রয়োজনে", again: "↺ আবার দেখুন",
      rotate: "অনুগ্রহ করে ফোনটি সোজা করে ধরুন 🙂", langSwitch: "English"
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
  function h(tag, attrs, ...kids) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (k === "class") e.className = v; else if (k === "text") e.textContent = v;
      else if (k === "i") e.style.setProperty("--i", v); else e.setAttribute(k, v);
    }
    kids.flat().forEach((c) => c != null && e.append(c));
    return e;
  }
  const pop = (i, tag, cls, text) => h(tag, { class: (cls ? cls + " " : "") + "pop", i, text });
  const main = () => D.events[D.countdownEvent] || D.events[0];
  const couple = () => `${t(D.groom.short)} & ${t(D.bride.short)}`;

  function iconFor(ev) {
    if (ev.icon) return ev.icon;
    const k = (ev.title.en || t(ev.title)).toLowerCase();
    if (/holud|haldi|mehendi|mehndi/.test(k)) return "🌼";
    if (/akdh|akd|nikah|kabin/.test(k)) return "🤲";
    if (/walima|bou|reception|bhat/.test(k)) return "🍛";
    if (/engage/.test(k)) return "💍";
    return "💐";
  }
  function calUrl(ev) {
    return "https://calendar.google.com/calendar/render?" + new URLSearchParams({
      action: "TEMPLATE", text: `${t(ev.title)} — ${couple()}`,
      dates: `${utc(ev.start)}/${utc(ev.end || ev.start)}`, location: `${t(ev.venue)}, ${t(ev.address)}`, ctz: TZ
    });
  }

  // ---------- Build slides ----------
  let slides = [];
  function build() {
    const list = [];
    let n = 0;
    const add = (el, stay) => { el.classList.add("slide", "t" + (n++ % 5)); list.push({ el, stay: !!stay }); };

    // 1. Names
    const m = main();
    add(h("section", null,
      D.showBismillah ? pop(0, "p", "bismillah", "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ") : null,
      pop(1, "p", "kicker", guest ? `${s("dear")} ${guest}` : s("invited")),
      pop(2, "h1", "big-name", t(D.groom.short)),
      pop(3, "span", "weds", s("weds")),
      pop(4, "h1", "big-name", t(D.bride.short)),
      pop(5, "p", "lead", t(D.message)),
      pop(6, "p", "date-stamp", fmt(m.start, { day: "numeric", month: "short", year: "numeric" })),
      h("p", { class: "tap-hint", text: s("tapNext") })
    ));

    // 2. Families
    add(h("section", null,
      pop(0, "p", "kicker", s("families")),
      h("div", { class: "person pop", i: 1 }, h("p", { class: "role", text: s("groom") }), h("h3", { text: t(D.groom.full) }), h("p", { text: t(D.groom.parents) })),
      pop(2, "div", "heart", "💛"),
      h("div", { class: "person pop", i: 3 }, h("p", { class: "role", text: s("bride") }), h("h3", { text: t(D.bride.full) }), h("p", { text: t(D.bride.parents) }))
    ));

    // 3. One slide per event
    D.events.forEach((ev, k) => {
      const btns = h("div", { class: "btns pop", i: 6 });
      if (ev.map) btns.append(h("a", { class: "btn", href: ev.map, target: "_blank", rel: "noopener", text: s("directions") }));
      btns.append(h("a", { class: "btn alt", href: calUrl(ev), target: "_blank", rel: "noopener", text: s("calendar") }));
      add(h("section", null,
        pop(0, "p", "chip", `${s("event")} ${num(k + 1)}/${num(D.events.length)}`),
        pop(1, "div", "event-icon", iconFor(ev)),
        pop(2, "h2", "h2", t(ev.title)),
        h("div", { class: "cal pop", i: 3 },
          h("span", { class: "m", text: fmt(ev.start, { month: "long" }) }),
          h("span", { class: "d", text: fmt(ev.start, { day: "numeric" }) }),
          h("span", { class: "w", text: `${fmt(ev.start, { weekday: "long" })} · ${fmt(ev.start, { hour: "numeric", minute: "2-digit", hour12: true })}` })
        ),
        pop(4, "p", "venue", t(ev.venue)),
        pop(5, "p", "addr", t(ev.address)),
        btns
      ));
    });

    // 4. Countdown
    const cd = h("div", { class: "cd pop", i: 2 },
      ...["d", "h", "m", "s"].map((u) => h("div", null, h("b", { "data-cd": u, text: "0" }), h("span", { text: s({ d: "days", h: "hours", m: "minutes", s: "seconds" }[u]) }))));
    add(h("section", null,
      pop(0, "p", "kicker", s("countdown")),
      pop(1, "h2", "h2", t(m.title)),
      cd,
      h("p", { class: "cd-done pop", i: 2, hidden: "", id: "cdDone", text: s("married") }),
      pop(3, "p", "lead", fmt(m.start, { weekday: "long", day: "numeric", month: "long", year: "numeric" }))
    ));

    // 5. Photos
    if (D.gallery && D.gallery.length) {
      add(h("section", null,
        pop(0, "h2", "h2", s("memories")),
        h("div", { class: "polaroids pop", i: 1 }, D.gallery.slice(0, 4).map((src) => h("img", { src, alt: "", loading: "lazy" })))
      ));
    }

    // 6. RSVP
    if (D.rsvp && D.rsvp.enabled) {
      const form = h("form", { class: "rsvp pop", i: 2, novalidate: "" },
        h("label", null, h("span", { text: s("yourName") }), h("input", { name: "name", maxlength: "60", autocomplete: "name", value: guest })),
        h("div", { class: "choice" },
          h("label", null, h("input", { type: "radio", name: "attending", value: "yes", checked: "" }), h("span", { text: s("accept") })),
          h("label", null, h("input", { type: "radio", name: "attending", value: "no" }), h("span", { text: s("decline") }))),
        h("label", { class: "guests" }, h("span", { text: s("guests") }),
          h("select", { name: "guests" }, ["1", "2", "3", "4", "5", "6+"].map((g) => h("option", { text: g })))),
        h("label", null, h("span", { text: s("note") }), h("textarea", { name: "message", rows: "2", maxlength: "200" })),
        h("button", { class: "btn", type: "submit", text: s("send") }),
        h("p", { class: "status", role: "status" }));
      wireRsvp(form);
      add(h("section", null,
        pop(0, "h2", "h2", s("rsvpH")),
        D.rsvp.deadline ? pop(1, "p", "lead", `${s("replyBy")} ${fmt(D.rsvp.deadline, { day: "numeric", month: "long" })}`) : null,
        form
      ), true);
    }

    // 7. Thanks
    add(h("section", null,
      pop(0, "div", "heart", "💐"),
      pop(1, "h2", "h2", s("thanks")),
      pop(2, "p", "lead", t(D.closing)),
      pop(3, "h1", "big-name", couple()),
      pop(4, "p", "hashtag", D.hashtag || ""),
      (D.contacts || []).length ? h("div", { class: "contacts pop", i: 5 },
        h("p", { class: "kicker", text: s("call") }),
        D.contacts.map((p) => h("a", { href: "tel:" + p.phone.replace(/[^\d+]/g, "") }, h("span", { text: t(p.name) }), h("b", { text: p.phone })))) : null,
      h("button", { class: "btn alt pop", i: 6, id: "againBtn", style: "margin-top:16px", text: s("again") }),
      pop(7, "p", "credit", `Made with ♥ by ${D.brand || "Your Brand"}`)
    ), true);

    const host = $("#slides"); host.textContent = ""; list.forEach((x) => host.append(x.el));
    const bars = $("#bars"); bars.textContent = ""; list.forEach(() => bars.append(h("div", { class: "bar" }, h("i"))));
    $("#againBtn").addEventListener("click", () => go(0));
    slides = list;
  }

  // ---------- Story navigation ----------
  let cur = 0;
  function go(i) {
    cur = Math.max(0, Math.min(slides.length - 1, i));
    slides.forEach((x, k) => x.el.classList.toggle("active", k === cur));
    $$(".bar").forEach((b, k) => {
      b.className = "bar" + (k < cur ? " done" : "");
      if (k === cur) {
        void b.offsetWidth;
        b.classList.add(slides[k].stay ? "full" : "run");
        b.style.setProperty("--dur", SLIDE_MS + "ms");
      }
    });
    if (cur === slides.length - 1) confetti(40);
  }
  $("#bars").addEventListener("animationend", () => { if (!slides[cur].stay) go(cur + 1); });

  const stage = $("#stage");
  const interactive = (el) => (el && el.closest ? el.closest("a,button,input,select,textarea,label,form") : null);
  let down = null;
  stage.addEventListener("pointerdown", (e) => {
    if (interactive(e.target)) return;
    down = { x: e.clientX, y: e.clientY, t: Date.now() };
    stage.classList.add("paused");
  });
  window.addEventListener("pointerup", (e) => {
    stage.classList.remove("paused");
    if (!down) return;
    const dx = e.clientX - down.x, dy = e.clientY - down.y, dt = Date.now() - down.t;
    down = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) return go(cur + (dx < 0 ? 1 : -1));
    if (dt < 300 && Math.abs(dx) < 10 && Math.abs(dy) < 10) {
      const r = stage.getBoundingClientRect();
      go(cur + (e.clientX - r.left < r.width * 0.3 ? -1 : 1));
    }
  });
  window.addEventListener("pointercancel", () => { down = null; stage.classList.remove("paused"); });
  $("#prevBtn").addEventListener("click", () => go(cur - 1));
  $("#nextBtn").addEventListener("click", () => go(cur + 1));
  document.addEventListener("keydown", (e) => {
    if ($("#stage").hidden || interactive(e.target)) return;
    if (e.key === "ArrowRight") go(cur + 1); else if (e.key === "ArrowLeft") go(cur - 1);
  });
  document.addEventListener("visibilitychange", () => stage.classList.toggle("paused", document.hidden));

  // ---------- Countdown ----------
  function tick() {
    const diff = new Date(main().start) - Date.now();
    const cd = $(".cd"); if (!cd) return;
    if (diff <= 0) { cd.hidden = true; $("#cdDone").hidden = false; return; }
    const v = { d: Math.floor(diff / 864e5), h: Math.floor(diff / 36e5) % 24, m: Math.floor(diff / 6e4) % 60, s: Math.floor(diff / 1e3) % 60 };
    $$("[data-cd]").forEach((n) => (n.textContent = num(v[n.dataset.cd])));
  }

  // ---------- RSVP ----------
  function wireRsvp(form) {
    const status = form.querySelector(".status");
    form.addEventListener("change", () => { form.querySelector(".guests").hidden = form.elements.attending.value === "no"; });
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const nameEl = form.querySelector("input[name=name]");
      const name = nameEl.value.trim();
      if (!name) { status.textContent = s("needName"); nameEl.focus(); return; }
      const yes = form.elements.attending.value === "yes";
      const data = { name, attending: yes ? "yes" : "no", guests: yes ? form.elements.guests.value : "0",
        message: form.elements.message.value.trim(), card: location.host + location.pathname };
      const btn = form.querySelector("button[type=submit]");
      if (D.rsvp.sheetUrl) {
        btn.disabled = true; status.textContent = s("sending");
        try {
          await fetch(D.rsvp.sheetUrl, { method: "POST", mode: "no-cors", body: new URLSearchParams(data) });
          status.textContent = s("sent"); confetti(30);
        } catch (err) { status.textContent = "⚠ " + err.message; } finally { btn.disabled = false; }
      } else {
        const text = `RSVP — ${couple()}\nName: ${name}\n${yes ? "✅ Attending" : "❌ Not attending"}` +
          (yes ? `\nGuests: ${data.guests}` : "") + (data.message ? `\nNote: ${data.message}` : "");
        window.open(`https://wa.me/${(D.rsvp.whatsapp || "").replace(/\D/g, "")}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
        status.textContent = s("openedWa");
      }
    });
  }

  // ---------- Confetti ----------
  function confetti(n) {
    let host = $(".confetti");
    if (!host) { host = h("div", { class: "confetti", "aria-hidden": "true" }); document.body.append(host); }
    const colors = ["#ffd54f", "#d81b60", "#2e9e4f", "#1e4fa8", "#fff"];
    for (let k = 0; k < n; k++) {
      const c = h("i");
      c.style.left = Math.random() * 100 + "%";
      c.style.background = colors[k % colors.length];
      c.style.setProperty("--dx", (Math.random() * 200 - 100) + "px");
      c.style.setProperty("--r", (Math.random() * 900 - 450) + "deg");
      c.style.animationDuration = 2.5 + Math.random() * 2.5 + "s";
      c.style.animationDelay = Math.random() * .8 + "s";
      c.style.borderRadius = k % 3 ? "2px" : "50%";
      c.addEventListener("animationend", () => c.remove());
      host.append(c);
    }
  }

  // ---------- Static text + language ----------
  function renderStatic() {
    document.documentElement.lang = lang;
    document.title = `${couple()} — ${lang === "bn" ? "বিয়ের দাওয়াত" : "Wedding Invitation"}`;
    $$("[data-i18n]").forEach((n) => (n.textContent = s(n.dataset.i18n)));
    $$("[data-mono]").forEach((n) => (n.textContent = D.monogram));
    $$("[data-lang-toggle]").forEach((n) => (n.textContent = s("langSwitch")));
    $("#dear").textContent = guest ? `${s("dear")} ${guest}` : couple();
  }
  $$("[data-lang-toggle]").forEach((b) => b.addEventListener("click", (e) => {
    e.stopPropagation();
    lang = lang === "en" ? "bn" : "en";
    renderStatic(); build(); go(cur); tick();
  }));

  // ---------- Music ----------
  const audio = $("#music"), mBtn = $("#musicBtn");
  if (D.music) {
    audio.src = D.music; mBtn.hidden = false;
    mBtn.addEventListener("click", () => {
      if (audio.paused) { audio.play().catch(() => {}); mBtn.classList.remove("off"); } else { audio.pause(); mBtn.classList.add("off"); }
    });
  }

  // ---------- Open gate ----------
  let opened = false;
  $("#openBtn").addEventListener("click", () => {
    if (opened) return; opened = true;
    $("#gate").classList.add("open");
    if (D.music) audio.play().catch(() => mBtn.classList.add("off"));
    setTimeout(() => {
      $("#stage").hidden = false;
      go(0); confetti(36);
      $("#gate").classList.add("gone");
    }, 1100);
  });

  renderStatic(); build(); tick();
  setInterval(tick, 1000);
})();
