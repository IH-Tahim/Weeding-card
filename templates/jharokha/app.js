/* Jharokha — the lattice shutters swing open and we pass through the palace window into the invitation. */
(function () {
  "use strict";
  window.TPL_STRINGS = {
    en: { openWindow: "Open the window", weds: "weds", events: "The celebrations", eventsH: "Royal festivities" },
    bn: { openWindow: "জানালা খুলুন", weds: "ও", events: "অনুষ্ঠানমালা", eventsH: "শাহী আয়োজন" }
  };
  const core = window.SC.core;
  const $ = (s) => document.querySelector(s);
  let opened = false;
  function open() {
    if (opened) return; opened = true;
    $("#intro").classList.add("open");
    core.reveal(1700);
    setTimeout(() => { $("#intro").hidden = true; }, 2600);
  }
  $("#openBtn").addEventListener("click", open);
  $("#window").addEventListener("click", open);
  document.addEventListener("keydown", (e) => { if (!opened && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); open(); } });
})();
