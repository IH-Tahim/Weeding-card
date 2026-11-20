/* Shubho Chithi — order form: live total, events list, WhatsApp order message and a ready-made data.js. */
(function () {
  "use strict";
  const S = window.SITE || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const form = $("#orderForm");
  const params = new URLSearchParams(location.search);

  // ---------- Preselect from links (order.html?design=...&package=...) ----------
  if (params.get("design")) { const o = $(`#design option[value="${CSS.escape(params.get("design"))}"]`); if (o) o.selected = true; }
  if (params.get("package")) { const r = form.querySelector(`input[name=package][value="${CSS.escape(params.get("package"))}"]`); if (r) r.checked = true; }

  // ---------- Events list ----------
  const evBox = $("#events"), tpl = $("#eventTpl");
  function addEvent(title) {
    const node = tpl.content.firstElementChild.cloneNode(true);
    if (title) node.querySelector("[name=evTitle]").value = title;
    node.querySelector(".rm").addEventListener("click", () => { if (evBox.children.length > 1) node.remove(); });
    evBox.append(node);
  }
  addEvent("Gaye Holud"); addEvent("Wedding Ceremony");
  $("#addEvent").addEventListener("click", () => addEvent(""));

  // ---------- Payment numbers ----------
  const pay = $("#payNumbers");
  const lines = [];
  if (S.bkash) lines.push(`bKash (${S.bkashType || "Personal"}): <b>${S.bkash.replace(/[<>&]/g, "")}</b>`);
  if (S.nagad) lines.push(`Nagad: <b>${S.nagad.replace(/[<>&]/g, "")}</b>`);
  pay.innerHTML = lines.length ? lines.join("<br>") : '<span class="bn">বিকাশ/নগদ নম্বর WhatsApp-এ জেনে নিন।</span><span class="en">Ask for the bKash/Nagad number on WhatsApp.</span>';

  // ---------- Total ----------
  const priceOf = (id) => ([...(S.packages || []), ...(S.addons || [])].find((p) => p.id === id) || { price: 0 }).price;
  function calc() {
    const pkg = form.elements.package.value;
    const addons = $$("input[name=addon]:checked", form).map((c) => c.value);
    return { pkg, addons, total: priceOf(pkg) + addons.reduce((a, id) => a + priceOf(id), 0) };
  }
  function showTotal() { $("#total").textContent = window.SC.money(calc().total); }
  form.addEventListener("change", showTotal);
  document.addEventListener("langchange", showTotal);
  showTotal();

  $("#previewDesign").addEventListener("click", (e) => {
    e.preventDefault();
    window.open(window.SC.demoUrl($("#design").value, form.elements.custName.value), "_blank", "noopener");
  });

  // ---------- Helpers ----------
  const BN_EVENTS = {
    "gaye holud": "গায়ে হলুদ", "holud": "গায়ে হলুদ", "akdh": "আকদ", "nikah": "নিকাহ", "wedding ceremony": "বিবাহ অনুষ্ঠান", "wedding": "বিবাহ অনুষ্ঠান",
    "walima": "ওয়ালিমা", "reception": "সংবর্ধনা", "bou-bhat": "বৌভাত", "boubhat": "বৌভাত", "mehendi": "মেহেদি সন্ধ্যা",
    "engagement": "বাগদান", "ashirbad": "আশীর্বাদ", "shubho bibaho": "শুভ বিবাহ"
  };
  const hasBn = (s) => /[ঀ-৿]/.test(s);
  const both = (en, bn) => (bn && bn !== en ? { en, bn } : en);
  const firstWord = (s) => (s || "").trim().split(/\s+/)[0] || "";
  function phoneOf(s) {
    const m = (s || "").match(/(\+?88)?0?1[3-9]\d{8}/);
    if (!m) return null;
    const d = m[0].replace(/\D/g, "").replace(/^88/, "").replace(/^0?/, "0");
    return "+88" + d;
  }
  function contactOf(s) {
    s = (s || "").trim(); if (!s) return null;
    const phone = phoneOf(s); if (!phone) return null;
    const name = s.replace(/(\+?88)?0?1[3-9]\d{8}/, "").replace(/[—–\-:,|]+\s*$/, "").replace(/^\s*[—–\-:,|]+/, "").trim() || "Contact";
    return { name, phone };
  }
  const clean = (v) => String(v || "").replace(/\s+/g, " ").trim();

  // ---------- Submit ----------
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const err = $("#err"); err.textContent = "";
    const bad = $$("[required]", form).find((i) => !clean(i.value));
    const ph = form.elements.custPhone.value;
    if (bad) { err.textContent = window.SC.lang === "bn" ? "লাল তারকা (*) দেওয়া ঘরগুলো পূরণ করুন।" : "Please fill in the fields marked *."; bad.focus(); return; }
    if (!phoneOf(ph)) { err.textContent = window.SC.lang === "bn" ? "সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX)।" : "Please enter a valid mobile number (01XXXXXXXXX)."; form.elements.custPhone.focus(); return; }

    const f = Object.fromEntries([...new FormData(form)].filter(([k]) => !k.startsWith("ev") && k !== "addon"));
    const { pkg, addons, total } = calc();
    const events = $$(".event-box", evBox).map((b) => {
      const g = (n) => clean(b.querySelector(`[name=${n}]`).value);
      const title = g("evTitle"), time = g("evTime") || "19:00";
      const start = `${g("evDate")}T${time}:00+06:00`;
      const end = new Date(new Date(start).getTime() + (4 + 6) * 36e5).toISOString().slice(0, 19) + "+06:00"; // +4 h, written in Dhaka time
      return {
        title: hasBn(title) ? title : both(title, BN_EVENTS[title.toLowerCase()]),
        start, end,
        venue: g("evVenue"), address: g("evAddress"),
        map: g("evMap") || ("https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(`${g("evVenue")} ${g("evAddress")}`))
      };
    });

    const now = new Date();
    const orderId = "SC-" + now.toISOString().slice(2, 10).replace(/-/g, "") + "-" + Math.random().toString(36).slice(2, 6).toUpperCase();
    const gEn = clean(f.groomEn), bEn = clean(f.brideEn), gBn = clean(f.groomBn), bBn = clean(f.brideBn);
    const faith = f.faith;

    // data.js ready to paste into the chosen template
    const invite = {
      brand: S.brand || "Shubho Chithi",
      defaultLang: f.lang,
      monogram: `${gEn.charAt(0)}&${bEn.charAt(0)}`.toUpperCase(),
      hashtag: clean(f.hashtag) || `#${firstWord(gEn)}Weds${firstWord(bEn)}`,
      showBismillah: faith === "muslim",
      ...(faith === "hindu" ? { blessing: { en: "॥ Sri Sri Prajapataye Namah ॥", bn: "॥ শ্রী শ্রী প্রজাপতয়ে নমঃ ॥" } } : {}),
      groom: { short: both(firstWord(gEn), firstWord(gBn)), full: both(gEn, gBn), parents: clean(f.groomParents) ? `Son of ${clean(f.groomParents)}` : "" },
      bride: { short: both(firstWord(bEn), firstWord(bBn)), full: both(bEn, bBn), parents: clean(f.brideParents) ? `Daughter of ${clean(f.brideParents)}` : "" },
      message: faith === "hindu"
        ? { en: "With the blessings of Prajapati, we joyfully invite you and your family to grace the auspicious wedding of our children", bn: "প্রজাপতির নির্বন্ধে আমাদের সন্তানদের শুভ বিবাহ অনুষ্ঠানে আপনি সপরিবারে উপস্থিত থেকে নবদম্পতিকে আশীর্বাদ করবেন — এই কামনা করি" }
        : { en: "Together with their families, request the honour of your presence at the celebration of their marriage", bn: "পরিবারের সকলের সাথে আপনাকে আমাদের বিবাহ অনুষ্ঠানে সাদর আমন্ত্রণ জানাচ্ছি" },
      events,
      countdownEvent: Math.min(1, events.length - 1),
      rsvp: { enabled: pkg !== "basic", deadline: f.rsvpDeadline ? `${f.rsvpDeadline}T23:59:00+06:00` : "", sheetUrl: "", whatsapp: "" },
      contacts: [contactOf(f.contact1), contactOf(f.contact2)].filter(Boolean),
      gallery: [],
      music: f.music === "none" ? "" : "music.mp3",
      closing: { en: "Your presence and prayers will make our day complete.", bn: "আপনার উপস্থিতি ও দোয়া আমাদের দিনটিকে পরিপূর্ণ করবে।" }
    };
    const dataJs = `// ${orderId} — ${gEn} & ${bEn} — design: ${f.design}\n// Check the short names, parents and texts before publishing.\nwindow.INVITE = ${JSON.stringify(invite, null, 2)};\n`;

    // Human-readable WhatsApp message
    const fmtDate = (iso) => new Date(iso).toLocaleString("en-GB", { timeZone: "Asia/Dhaka", weekday: "short", day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true });
    const evLines = events.map((ev, i) => `${i + 1}. ${typeof ev.title === "object" ? ev.title.en : ev.title} — ${fmtDate(ev.start)}\n   ${ev.venue}${ev.address ? ", " + ev.address : ""}`).join("\n");
    const msg =
`🧾 New order ${orderId}
Package: ${pkg} · Design: ${f.design}
Add-ons: ${addons.join(", ") || "none"}
Total: ৳${total} · Advance via ${f.payMethod}, TrxID: ${clean(f.trxId)}

💍 ${gEn}${gBn ? " (" + gBn + ")" : ""} & ${bEn}${bBn ? " (" + bBn + ")" : ""}
Groom's parents: ${clean(f.groomParents) || "-"}
Bride's parents: ${clean(f.brideParents) || "-"}
Style: ${faith} · Opens in: ${f.lang}

📅 Events:
${evLines}

Contacts: ${[f.contact1, f.contact2].map(clean).filter(Boolean).join(" | ") || "-"}
RSVP by: ${f.rsvpDeadline || "-"} · Music: ${f.music} · Hashtag: ${invite.hashtag}
Notes: ${clean(f.notes) || "-"}

👤 ${clean(f.custName)} · ${clean(ph)}`;

    const wa = window.SC.wa(msg);
    window.open(wa, "_blank", "noopener"); // must run inside the click, or browsers block it
    $("#waAgain").href = wa;
    $("#orderId").textContent = orderId;
    form.hidden = true; $("#done").hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (S.orderSheetUrl) {
      try {
        await fetch(S.orderSheetUrl, { method: "POST", mode: "no-cors", body: new URLSearchParams({
          orderId, customer: clean(f.custName), phone: clean(ph), package: pkg, design: f.design, addons: addons.join(", "),
          total: String(total), payMethod: f.payMethod, trxId: clean(f.trxId), summary: msg, dataJs
        }) });
      } catch (x) { /* WhatsApp message already has everything */ }
    }
  });
})();
