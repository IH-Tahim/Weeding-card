/* Shubho Chithi — website tracking.
   - Remembers where a visitor came from (ad, Instagram bio, TikTok, a friend's link…) so the order message shows it.
   - Loads Meta Pixel, Google Analytics 4 and TikTok Pixel when their IDs are set in site-config.js → tracking.
   - Sends the same named events to all three.
   Load order: site-config.js → assets/site.js → assets/track.js → (assets/order.js).
   Test: open any page with ?debug_track=1 and watch the browser console. */
(function () {
  "use strict";
  const S = window.SITE || {};
  const T = S.tracking || {};
  const qs = new URLSearchParams(location.search);
  const DEBUG = !!T.debug || qs.has("debug_track");
  const log = (...a) => { if (DEBUG) console.log("%c[track]", "color:#7a1f2b;font-weight:bold", ...a); };
  const SC = (window.SC = window.SC || {});

  // ---------- 1. Where did this visitor come from? ----------
  const DAY = 864e5;
  const read = (k) => { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (e) { return null; } };
  const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const cut = (v, n) => String(v).replace(/[^\p{L}\p{N} ._\-/]/gu, "").slice(0, n || 60);
  const HOSTS = { "facebook.com": "facebook", "instagram.com": "instagram", "tiktok.com": "tiktok", "google.com": "google",
                  "youtube.com": "youtube", "wa.me": "whatsapp", "whatsapp.com": "whatsapp", "messenger.com": "messenger", "t.co": "x" };
  function detect() {
    const s = {};
    ["source", "medium", "campaign", "content", "term"].forEach((k) => { const v = qs.get("utm_" + k); if (v) s[k] = cut(v); });
    if (qs.get("ref")) { s.source = s.source || cut(qs.get("ref"), 40); s.medium = s.medium || "link"; }        // short links: ?ref=ig-bio
    const clickIds = { fbclid: "facebook", ttclid: "tiktok", gclid: "google" };
    for (const id in clickIds) if (qs.get(id) && !s.source) { s.source = clickIds[id]; s.medium = id === "fbclid" ? "social" : "paid"; }
    if (!s.source && document.referrer) {
      try {
        const h = new URL(document.referrer).hostname.replace(/^(www|m|l|lm|web|mbasic)\./, "");
        if (h && h !== location.hostname) { const k = Object.keys(HOSTS).find((x) => h === x || h.endsWith("." + x)); s.source = k ? HOSTS[k] : h; s.medium = "referral"; }
      } catch (e) {}
    }
    return s.source ? Object.assign(s, { landing: location.pathname.split("/").pop() || "home", at: Date.now() }) : null;
  }
  const here = detect();
  let first = read("sc-src-first"); if (first && Date.now() - first.at > 90 * DAY) first = null;
  let last = read("sc-src-last");   if (last && Date.now() - last.at > 30 * DAY) last = null;
  if (here) { last = here; save("sc-src-last", here); if (!first) { first = here; save("sc-src-first", here); } }
  const label = (s) => (s ? [s.source, s.medium, s.campaign, s.content].filter(Boolean).join(" / ") : "direct");
  SC.source = () => label(last);
  SC.firstSource = () => label(first);
  SC.sourceData = () => ({ last: last || null, first: first || null });
  if (here) log("visitor source:", label(here));

  // ---------- 2. Load the tools that have an ID ----------
  if (T.metaPixel) {
    /* Meta Pixel base code */
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", String(T.metaPixel));
    window.fbq("track", "PageView");
  }
  if (T.ga4) {
    const g = document.createElement("script"); g.async = true;
    g.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(T.ga4);
    document.head.appendChild(g);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", T.ga4, DEBUG ? { debug_mode: true } : {});
  }
  if (T.tiktokPixel) {
    /* TikTok Pixel base code */
    !function (w, d, t) { w.TiktokAnalyticsObject = t; var ttq = w[t] = w[t] || [];
      ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie", "holdConsent", "revokeConsent", "grantConsent"];
      ttq.setAndDefer = function (t, e) { t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))); }; };
      for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
      ttq.instance = function (t) { for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]); return e; };
      ttq.load = function (e, n) { var r = "https://analytics.tiktok.com/i18n/pixel/events.js"; ttq._i = ttq._i || {}; ttq._i[e] = []; ttq._i[e]._u = r;
        ttq._t = ttq._t || {}; ttq._t[e] = +new Date(); ttq._o = ttq._o || {}; ttq._o[e] = n || {};
        var s = d.createElement("script"); s.type = "text/javascript"; s.async = !0; s.src = r + "?sdkid=" + e + "&lib=" + t;
        var f = d.getElementsByTagName("script")[0]; f.parentNode.insertBefore(s, f); };
      ttq.load(String(T.tiktokPixel)); ttq.page(); }(window, document, "ttq");
  }
  log("tools on:", { meta: !!T.metaPixel, ga4: !!T.ga4, tiktok: !!T.tiktokPixel });

  // ---------- 3. One event name → each tool's own name ----------
  //            our name        Meta (standard or custom)      GA4                TikTok
  const MAP = {
    view_design:  { meta: "ViewContent",       ga: "view_item",      tt: "ViewContent" },
    try_name:     { meta: "ViewContent",       ga: "try_design",     tt: "ViewContent" },
    whatsapp:     { meta: "Contact",           ga: "contact",        tt: "Contact" },
    order_click:  { metaCustom: "OrderClick",  ga: "order_click",    tt: "ClickButton" },
    order_start:  { meta: "InitiateCheckout",  ga: "begin_checkout", tt: "InitiateCheckout" },
    order_submit: { meta: "Lead",              ga: "generate_lead",  tt: "SubmitForm" },
    social:       { metaCustom: "SocialClick", ga: "social_click" }
  };
  const tidy = (o) => { Object.keys(o).forEach((k) => (o[k] === undefined || o[k] === "") && delete o[k]); return o; };

  SC.track = function (name, p) {
    p = p || {};
    const m = MAP[name] || { metaCustom: name, ga: name };
    const money = p.value != null ? { value: Number(p.value), currency: "BDT" } : {};
    log(name, p);
    try {
      if (window.fbq && T.metaPixel) {
        const mp = tidy(Object.assign({ content_name: p.design || p.label, content_category: p.package, content_ids: p.design ? [p.design] : undefined, content_type: p.design ? "product" : undefined, source: SC.source() }, money));
        const opt = p.id ? { eventID: p.id } : undefined;
        if (m.meta) window.fbq("track", m.meta, mp, opt); else window.fbq("trackCustom", m.metaCustom, mp, opt);
      }
    } catch (e) {}
    try {
      if (window.gtag && T.ga4) {
        window.gtag("event", m.ga, tidy(Object.assign({ design: p.design, package: p.package, label: p.label, transaction_id: p.id,
          items: p.design ? [{ item_id: p.design, item_name: p.design, item_category: p.package }] : undefined }, money)));
      }
    } catch (e) {}
    try {
      if (window.ttq && T.tiktokPixel && m.tt) {
        window.ttq.track(m.tt, tidy(Object.assign({ content_id: p.design, content_name: p.design || p.label, content_type: p.design ? "product" : undefined }, money)), p.id ? { event_id: p.id } : undefined);
      }
    } catch (e) {}
  };

  // ---------- 4. Clicks the pages already have ----------
  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest("a, button");
    if (!a) return;
    if (a.hasAttribute("data-wa") || a.id === "waAgain") return SC.track("whatsapp", { label: a.classList.contains("wa-float") ? "floating button" : (a.closest("header") ? "header" : "page button") });
    if (a.hasAttribute("data-try")) return SC.track("try_name", { design: a.dataset.try || "phone demo" });
    if (a.dataset.demo) return SC.track("view_design", { design: a.dataset.demo });
    if (a.id === "previewDesign") { const d = document.getElementById("design"); return SC.track("view_design", { design: d && d.value, label: "order form preview" }); }
    const href = a.getAttribute("href") || "";
    if (/^order\.html/.test(href)) { const u = new URL(href, location.href); return SC.track("order_click", { design: u.searchParams.get("design") || undefined, package: u.searchParams.get("package") || undefined }); }
    if (["facebook", "instagram", "tiktok"].includes(a.dataset.cfg)) return SC.track("social", { label: a.dataset.cfg });
  }, true);
})();
