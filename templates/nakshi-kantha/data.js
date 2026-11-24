/*
  ======================================================
  CARD DETAILS — this is the ONLY file you edit per client.
  Text can be a plain string, or { en: "...", bn: "..." }
  for English + Bangla. Times are Dhaka time (+06:00).
  ======================================================
*/
window.INVITE = {
  brand: "Shubho Chithi",
  defaultLang: "bn",            // "en" or "bn"
  monogram: "শ&মি",
  hashtag: "#ShuvoMithilarBiye",
  showBismillah: true,

  // title = degree / profession line under the name (optional)
  groom: {
    short: {
      en: "Shuvo",
      bn: "শুভ"
    },
    full: {
      en: "Shahriar Hasan Shuvo",
      bn: "শাহরিয়ার হাসান শুভ"
    },
    parents: {
      en: "Son of Md. Anwar Hossain & Rehana Begum",
      bn: "মোঃ আনোয়ার হোসেন ও রেহানা বেগমের পুত্র"
    },
    title: null
  },
  bride: {
    short: {
      en: "Mithila",
      bn: "মিথিলা"
    },
    full: {
      en: "Sumaiya Akter Mithila",
      bn: "সুমাইয়া আক্তার মিথিলা"
    },
    parents: {
      en: "Daughter of Md. Jalal Uddin & Farzana Yasmin",
      bn: "মোঃ জালাল উদ্দিন ও ফারজানা ইয়াসমিনের কন্যা"
    },
    title: null
  },

  message: {
    en: "Together with their families, request the honour of your presence at the celebration of their marriage",
    bn: "পরিবারের সকলের সাথে আপনাকে আমাদের বিবাহ অনুষ্ঠানে সাদর আমন্ত্রণ জানাচ্ছি"
  },

  events: [
    {
      title: {
        en: "Gaye Holud",
        bn: "গায়ে হলুদ"
      },
      start: "2027-01-28T16:00:00+06:00",
      end: "2027-01-28T22:00:00+06:00",
      venue: {
        en: "Courtyard of the bride's home",
        bn: "কনের বাড়ির উঠোন"
      },
      address: {
        en: "Kushtia Sadar, Kushtia",
        bn: "কুষ্টিয়া সদর, কুষ্টিয়া"
      },
      map: "https://www.google.com/maps/search/?api=1&query=Kushtia",
      dressCode: {
        en: "Yellow & green",
        bn: "হলুদ ও সবুজ"
      }
    },
    {
      title: {
        en: "Biye",
        bn: "বিয়ে"
      },
      start: "2027-01-29T12:30:00+06:00",
      end: "2027-01-29T17:00:00+06:00",
      venue: {
        en: "Lalon Community Centre",
        bn: "লালন কমিউনিটি সেন্টার"
      },
      address: {
        en: "NS Road, Kushtia",
        bn: "এনএস রোড, কুষ্টিয়া"
      },
      map: "https://www.google.com/maps/search/?api=1&query=NS+Road+Kushtia",
      dressCode: {
        en: "Red, indigo or white",
        bn: "লাল, নীল বা সাদা"
      }
    },
    {
      title: {
        en: "Bou-bhat",
        bn: "বৌভাত"
      },
      start: "2027-01-31T13:00:00+06:00",
      end: "2027-01-31T17:00:00+06:00",
      venue: {
        en: "Groom's home",
        bn: "বরের বাড়ি"
      },
      address: {
        en: "Mirpur, Kushtia",
        bn: "মিরপুর, কুষ্টিয়া"
      },
      map: "https://www.google.com/maps/search/?api=1&query=Mirpur+Kushtia"
    }
  ],

  // Countdown counts to this event (0 = first, 1 = second ...)
  countdownEvent: 1,

  rsvp: {
    enabled: true,
    deadline: "2027-01-10T23:59:00+06:00",
    sheetUrl: "",   // Google Apps Script web-app URL (see rsvp-google-sheet.gs); empty = reply on WhatsApp
    whatsapp: ""    // e.g. "8801712345678"
  },

  contacts: [
    { name: { en: "Groom's side", bn: "বর পক্ষ" }, phone: "+8801700000000" },
    { name: { en: "Bride's side", bn: "কনে পক্ষ" }, phone: "+8801800000000" }
  ],

  photo: "",      // couple photo next to index.html, e.g. "couple.jpg"; empty = built-in illustration
  gallery: [],    // e.g. ["photos/1.jpg", "photos/2.jpg"]
  music: "",      // your own licensed file, e.g. "music.mp3"; empty = built-in soft instrumental
  musicEnabled: true,

  // Extra sections (all optional). Delete any block you don't want; the calendar + Bangla date show automatically.
  // icons: ring heart plate camera music car door tea chat home star moon flower gift bed
  extras: {
    story: [
      {
        when: {
          en: "2019 · Dhaka University",
          bn: "২০১৯ · ঢাকা বিশ্ববিদ্যালয়"
        },
        title: {
          en: "The first hello",
          bn: "প্রথম দেখা"
        },
        text: {
          en: "A borrowed umbrella at TSC on a rainy Srabon afternoon.",
          bn: "শ্রাবণের এক বৃষ্টিভেজা বিকেলে টিএসসিতে ধার করা একটা ছাতা।"
        },
        icon: "chat"
      },
      {
        when: {
          en: "2021 – 2024",
          bn: "২০২১ – ২০২৪"
        },
        title: {
          en: "Endless cha & rickshaw rides",
          bn: "অগুনতি চা আর রিকশায় ঘোরা"
        },
        text: {
          en: "Every evening ended at the same tea stall.",
          bn: "প্রতিটা সন্ধ্যা শেষ হতো একই চায়ের দোকানে।"
        },
        icon: "tea"
      },
      {
        when: {
          en: "2025",
          bn: "২০২৫"
        },
        title: {
          en: "The proposal",
          bn: "প্রস্তাব"
        },
        text: {
          en: "Under the lights of Hatirjheel, she said yes.",
          bn: "হাতিরঝিলের আলোয় সে বলেছিল — হ্যাঁ।"
        },
        icon: "ring"
      },
      {
        when: {
          en: "2027",
          bn: "২০২৭"
        },
        title: {
          en: "Forever begins",
          bn: "নতুন পথচলা"
        },
        text: {
          en: "And on this day we want you beside us.",
          bn: "আর এই দিনে আপনাকে পাশে চাই।"
        },
        icon: "home"
      }
    ],
    menu: [
      {
        en: "Kacchi biryani",
        bn: "কাচ্চি বিরিয়ানি"
      },
      {
        en: "Chicken roast",
        bn: "মুরগির রোস্ট"
      },
      {
        en: "Mutton rezala",
        bn: "খাসির রেজালা"
      },
      {
        en: "Jali kabab",
        bn: "জালি কাবাব"
      },
      {
        en: "Borhani",
        bn: "বোরহানি"
      },
      {
        en: "Firni & jorda",
        bn: "ফিরনি ও জর্দা"
      },
      {
        en: "Mishti doi",
        bn: "মিষ্টি দই"
      }
    ],
    dress: {
      note: {
        en: "Wear the colours of a kantha",
        bn: "কাঁথার রঙে সেজে আসুন"
      },
      colors: [
        {
          name: {
            en: "Madder red",
            bn: "লাল"
          },
          hex: "#b3261e"
        },
        {
          name: {
            en: "Indigo",
            bn: "নীল"
          },
          hex: "#1f3a6b"
        },
        {
          name: {
            en: "Turmeric",
            bn: "হলুদ"
          },
          hex: "#d08c12"
        },
        {
          name: {
            en: "Cotton white",
            bn: "সাদা"
          },
          hex: "#fbf7ef"
        }
      ]
    }
  },

  closing: {
    en: "Your presence and prayers will make our day complete.",
    bn: "আপনার উপস্থিতি ও দোয়া আমাদের দিনটিকে পরিপূর্ণ করবে।"
  }
};
