/* Shubho Chithi — shared site behaviour (language, WhatsApp links, prices, demo tries). */
(function () {
  "use strict";
  const S = window.SITE || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // ---------- Language ----------
  const store = { get() { try { return localStorage.getItem("sc-lang"); } catch (e) { return null; } },
                  set(v) { try { localStorage.setItem("sc-lang", v); } catch (e) {} } };
  const q = new URLSearchParams(location.search).get("lang");
  let lang = ["bn", "en"].includes(q) ? q : (store.get() || "bn");
  function applyLang() {
    document.body.classList.toggle("l-bn", lang === "bn");
    document.body.classList.toggle("l-en", lang === "en");
    document.documentElement.lang = lang;
    $$("[data-lang-toggle]").forEach((b) => (b.textContent = lang === "bn" ? "English" : "বাংলা"));
    $$("[data-ph-bn]").forEach((i) => (i.placeholder = lang === "bn" ? i.dataset.phBn : i.dataset.phEn));
    renderPrices();
    document.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
  }
  $$("[data-lang-toggle]").forEach((b) => b.addEventListener("click", () => { lang = lang === "bn" ? "en" : "bn"; store.set(lang); applyLang(); }));
  window.SC = { get lang() { return lang; } };

  // ---------- Money ----------
  const money = (n) => "৳" + new Intl.NumberFormat(lang === "bn" ? "bn-BD" : "en-IN").format(n);
  window.SC.money = money;
  function renderPrices() {
    const all = [...(S.packages || []), ...(S.addons || [])];
    $$("[data-price]").forEach((el) => { const p = all.find((x) => x.id === el.dataset.price); if (p) el.textContent = money(p.price); });
    $$("[data-advance]").forEach((el) => (el.textContent = money(S.advance || 0)));
  }

  // ---------- WhatsApp + config links ----------
  const waNum = (S.whatsapp || "").replace(/\D/g, "");
  window.SC.wa = (text) => `https://wa.me/${waNum}?text=${encodeURIComponent(text || "")}`;
  $$("[data-wa]").forEach((a) => {
    a.href = window.SC.wa(a.dataset.wa || "Assalamu Alaikum, I want a digital wedding card from Shubho Chithi.");
    a.target = "_blank"; a.rel = "noopener";
  });
  $$("[data-cfg]").forEach((el) => {
    const v = S[el.dataset.cfg];
    if (!v) { if (el.dataset.hideEmpty !== undefined) el.hidden = true; return; }
    if (el.tagName === "A") { el.href = el.dataset.cfg === "email" ? "mailto:" + v : v; if (el.dataset.cfg !== "email") { el.target = "_blank"; el.rel = "noopener"; } }
    if (el.dataset.text !== undefined) el.textContent = v;
  });
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  // ---------- Try a design with your own name ----------
  const nameBox = $("#tryName");
  const demoUrl = (design, name) => {
    const u = new URL(`templates/${design}/index.html`, document.baseURI);
    u.searchParams.set("to", (name || "").trim() || (lang === "bn" ? "অতিথি" : "Guest"));
    u.searchParams.set("lang", lang);
    return u.href;
  };
  window.SC.demoUrl = demoUrl;
  $$("[data-try]").forEach((b) => b.addEventListener("click", (e) => {
    e.preventDefault();
    const design = b.dataset.try || currentDemo;
    window.open(demoUrl(design, nameBox ? nameBox.value : ""), "_blank", "noopener");
  }));
  if (nameBox) nameBox.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); $("#tryBtn").click(); } });

  applyLang();

  // ---------- Live phone demo ----------
  const frame = $("#demoFrame");
  let currentDemo = "royal-envelope";
  function loadDemo(d) {
    currentDemo = d;
    if (frame) frame.src = demoUrl(d, nameBox && nameBox.value);
    $$("[data-demo]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.demo === d)));
  }
  $$("[data-demo]").forEach((b) => b.addEventListener("click", () => loadDemo(b.dataset.demo)));
  if (frame) {
    loadDemo(currentDemo);
    let to;
    if (nameBox) nameBox.addEventListener("input", () => { clearTimeout(to); to = setTimeout(() => loadDemo(currentDemo), 700); });
    document.addEventListener("langchange", () => loadDemo(currentDemo));
  }

})();
