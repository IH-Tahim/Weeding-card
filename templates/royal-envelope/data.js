/*
  ======================================================
  CARD DETAILS — this is the ONLY file you edit per client.
  Text can be a plain string, or { en: "...", bn: "..." }
  for English + Bangla. Times are Dhaka time (+06:00).
  ======================================================
*/
window.INVITE = {
  brand: "Shubho Chithi",       // your business name (shown in the footer)
  defaultLang: "en",            // "en" or "bn"
  monogram: "R&N",
  hashtag: "#RafiWedsNusrat",
  showBismillah: true,

  groom: {
    short: { en: "Rafi", bn: "রাফি" },
    full: { en: "Rafiul Hasan Rafi", bn: "রাফিউল হাসান রাফি" },
    parents: {
      en: "Son of Md. Abdul Karim & Rokeya Begum",
      bn: "মোঃ আব্দুল করিম ও রোকেয়া বেগমের পুত্র"
    }
  },
  bride: {
    short: { en: "Nusrat", bn: "নুসরাত" },
    full: { en: "Nusrat Jahan", bn: "নুসরাত জাহান" },
    parents: {
      en: "Daughter of Md. Shafiqul Islam & Nasima Akter",
      bn: "মোঃ শফিকুল ইসলাম ও নাসিমা আক্তারের কন্যা"
    }
  },

  message: {
    en: "Together with their families, request the honour of your presence at the celebration of their marriage",
    bn: "পরিবারের সকলের সাথে আপনাকে আমাদের বিবাহ অনুষ্ঠানে সাদর আমন্ত্রণ জানাচ্ছি"
  },

  events: [
    {
      title: { en: "Gaye Holud", bn: "গায়ে হলুদ" },
      start: "2027-01-14T16:00:00+06:00",
      end: "2027-01-14T22:00:00+06:00",
      venue: { en: "Rooftop Garden, Hotel Shapla", bn: "রুফটপ গার্ডেন, হোটেল শাপলা" },
      address: { en: "Dhanmondi 27, Dhaka", bn: "ধানমন্ডি ২৭, ঢাকা" },
      map: "https://www.google.com/maps/search/?api=1&query=Dhanmondi+27+Dhaka"
    },
    {
      title: { en: "Wedding Ceremony", bn: "বিবাহ অনুষ্ঠান" },
      start: "2027-01-15T19:00:00+06:00",
      end: "2027-01-15T23:00:00+06:00",
      venue: { en: "Grand Ballroom, Nakshi Convention Hall", bn: "গ্র্যান্ড বলরুম, নকশী কনভেনশন হল" },
      address: { en: "Mirpur 10, Dhaka", bn: "মিরপুর ১০, ঢাকা" },
      map: "https://www.google.com/maps/search/?api=1&query=Mirpur+10+Dhaka"
    },
    {
      title: { en: "Walima", bn: "ওয়ালিমা" },
      start: "2027-01-17T13:00:00+06:00",
      end: "2027-01-17T17:00:00+06:00",
      venue: { en: "Nakshi Convention Hall", bn: "নকশী কনভেনশন হল" },
      address: { en: "Mirpur 10, Dhaka", bn: "মিরপুর ১০, ঢাকা" },
      map: "https://www.google.com/maps/search/?api=1&query=Mirpur+10+Dhaka"
    }
  ],

  // Countdown counts to this event (0 = first, 1 = second ...)
  countdownEvent: 1,

  rsvp: {
    enabled: true,
    deadline: "2027-01-05T23:59:00+06:00",
    // Paste the Google Apps Script web-app URL here to collect replies in a Google Sheet.
    // If empty, the reply opens WhatsApp instead (to the number below).
    sheetUrl: "",
    whatsapp: "" // e.g. "8801712345678" (no +, no spaces)
  },

  contacts: [
    { name: { en: "Groom's side — Karim", bn: "বর পক্ষ — করিম" }, phone: "+8801700000000" },
    { name: { en: "Bride's side — Shafiq", bn: "কনে পক্ষ — শফিক" }, phone: "+8801800000000" }
  ],

  // Optional photos (put files in a "photos" folder next to index.html)
  gallery: [
    // "photos/1.jpg", "photos/2.jpg"
  ],

  // Optional background music — use only music you have the licence for.
  music: "", // e.g. "music.mp3"

  closing: {
    en: "Your presence and prayers will make our day complete.",
    bn: "আপনার উপস্থিতি ও দোয়া আমাদের দিনটিকে পরিপূর্ণ করবে।"
  }
};
