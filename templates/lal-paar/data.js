/*
  ======================================================
  CARD DETAILS — this is the ONLY file you edit per client.
  Text can be a plain string, or { en: "...", bn: "..." }
  for English + Bangla. Times are Dhaka time (+06:00).
  Same format as the other designs, plus an optional "blessing" line.
  ======================================================
*/
window.INVITE = {
  brand: "Shubho Chithi",       // your business name (shown in the footer)
  defaultLang: "bn",            // "en" or "bn"
  monogram: "A&P",
  hashtag: "#ArnabWedsPriyanka",
  showBismillah: false,
  blessing: { en: "॥ Sri Sri Prajapataye Namah ॥", bn: "॥ শ্রী শ্রী প্রজাপতয়ে নমঃ ॥" },

  groom: {
    short: { en: "Arnab", bn: "অর্ণব" },
    full: { en: "Arnab Chowdhury", bn: "অর্ণব চৌধুরী" },
    parents: {
      en: "Son of Sri Ashok Chowdhury & Smt. Mitali Chowdhury",
      bn: "শ্রী অশোক চৌধুরী ও শ্রীমতী মিতালী চৌধুরীর পুত্র"
    }
  },
  bride: {
    short: { en: "Priyanka", bn: "প্রিয়াঙ্কা" },
    full: { en: "Priyanka Saha", bn: "প্রিয়াঙ্কা সাহা" },
    parents: {
      en: "Daughter of Sri Bimal Saha & Smt. Shikha Saha",
      bn: "শ্রী বিমল সাহা ও শ্রীমতী শিখা সাহার কন্যা"
    }
  },

  message: {
    en: "With the blessings of Prajapati, we joyfully invite you and your family to grace the auspicious wedding of our children",
    bn: "প্রজাপতির নির্বন্ধে আমাদের সন্তানদের শুভ বিবাহ অনুষ্ঠানে আপনি সপরিবারে উপস্থিত থেকে নবদম্পতিকে আশীর্বাদ করবেন — এই কামনা করি"
  },

  events: [
    {
      title: { en: "Ashirbad", bn: "আশীর্বাদ" },
      start: "2027-01-20T18:00:00+06:00",
      end: "2027-01-20T21:00:00+06:00",
      venue: { en: "Groom's residence", bn: "বরের বাসভবন" },
      address: { en: "GEC Circle, Chattogram", bn: "জিইসি মোড়, চট্টগ্রাম" },
      map: "https://www.google.com/maps/search/?api=1&query=GEC+Circle+Chattogram"
    },
    {
      title: { en: "Gaye Holud", bn: "গায়ে হলুদ" },
      start: "2027-01-22T10:00:00+06:00",
      end: "2027-01-22T14:00:00+06:00",
      venue: { en: "Bride's residence", bn: "কনের বাসভবন" },
      address: { en: "Nandankanan, Chattogram", bn: "নন্দনকানন, চট্টগ্রাম" },
      map: "https://www.google.com/maps/search/?api=1&query=Nandankanan+Chattogram"
    },
    {
      title: { en: "Shubho Bibaho", bn: "শুভ বিবাহ" },
      start: "2027-01-22T20:00:00+06:00",
      end: "2027-01-23T02:00:00+06:00",
      venue: { en: "Prantik Convention Hall", bn: "প্রান্তিক কনভেনশন হল" },
      address: { en: "Agrabad, Chattogram", bn: "আগ্রাবাদ, চট্টগ্রাম" },
      map: "https://www.google.com/maps/search/?api=1&query=Agrabad+Chattogram"
    },
    {
      title: { en: "Bou-bhat", bn: "বৌভাত" },
      start: "2027-01-24T13:00:00+06:00",
      end: "2027-01-24T17:00:00+06:00",
      venue: { en: "Prantik Convention Hall", bn: "প্রান্তিক কনভেনশন হল" },
      address: { en: "Agrabad, Chattogram", bn: "আগ্রাবাদ, চট্টগ্রাম" },
      map: "https://www.google.com/maps/search/?api=1&query=Agrabad+Chattogram"
    }
  ],

  countdownEvent: 2,

  rsvp: {
    enabled: true,
    deadline: "2027-01-12T23:59:00+06:00",
    sheetUrl: "",
    whatsapp: ""
  },

  contacts: [
    { name: { en: "Groom's side — Ashok", bn: "বর পক্ষ — অশোক" }, phone: "+8801700000000" },
    { name: { en: "Bride's side — Bimal", bn: "কনে পক্ষ — বিমল" }, phone: "+8801800000000" }
  ],

  // Couple photo (e.g. "couple.jpg"); empty = built-in bride & groom illustration
  photo: "",
  gallery: [],
  // Soft music fades in on the first tap; empty = built-in instrumental, or your own licensed "music.mp3"
  music: "",
  musicEnabled: true,

  closing: {
    en: "Your presence and blessings will make this auspicious day complete.",
    bn: "আপনার শুভ উপস্থিতি ও আশীর্বাদ এই শুভদিনকে পরিপূর্ণ করবে।"
  }
};
