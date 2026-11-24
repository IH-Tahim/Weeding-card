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
  monogram: "R&T",
  hashtag: "#RafsanTasnimRickshawRide",
  showBismillah: false,

  // title = degree / profession line under the name (optional)
  groom: {
    short: {
      en: "Rafsan",
      bn: "রাফসান"
    },
    full: {
      en: "Rafsan Chowdhury",
      bn: "রাফসান চৌধুরী"
    },
    parents: {
      en: "Son of Abdul Mannan Chowdhury & Nasrin Sultana",
      bn: "আব্দুল মান্নান চৌধুরী ও নাসরিন সুলতানার পুত্র"
    },
    title: null
  },
  bride: {
    short: {
      en: "Tasnim",
      bn: "তাসনিম"
    },
    full: {
      en: "Tasnim Jahan",
      bn: "তাসনিম জাহান"
    },
    parents: {
      en: "Daughter of Kamrul Ahsan & Dilruba Khanam",
      bn: "কামরুল আহসান ও দিলরুবা খানমের কন্যা"
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
      start: "2027-02-11T16:00:00+06:00",
      end: "2027-02-11T22:00:00+06:00",
      venue: {
        en: "Rooftop, Shapla Tower",
        bn: "রুফটপ, শাপলা টাওয়ার"
      },
      address: {
        en: "Mohammadpur, Dhaka",
        bn: "মোহাম্মদপুর, ঢাকা"
      },
      map: "https://www.google.com/maps/search/?api=1&query=Mohammadpur+Dhaka",
      dressCode: {
        en: "Yellow, obviously!",
        bn: "হলুদ, অবশ্যই!"
      }
    },
    {
      title: {
        en: "Akdh & Wedding",
        bn: "আকদ ও বিবাহ"
      },
      start: "2027-02-12T19:00:00+06:00",
      end: "2027-02-12T23:00:00+06:00",
      venue: {
        en: "Rangdhonu Convention Hall",
        bn: "রংধনু কনভেনশন হল"
      },
      address: {
        en: "Mirpur 2, Dhaka",
        bn: "মিরপুর ২, ঢাকা"
      },
      map: "https://www.google.com/maps/search/?api=1&query=Mirpur+2+Dhaka",
      dressCode: {
        en: "Bright & colourful",
        bn: "উজ্জ্বল রঙিন"
      }
    },
    {
      title: {
        en: "Bou-bhat",
        bn: "বৌভাত"
      },
      start: "2027-02-14T13:00:00+06:00",
      end: "2027-02-14T17:00:00+06:00",
      venue: {
        en: "Rangdhonu Convention Hall",
        bn: "রংধনু কনভেনশন হল"
      },
      address: {
        en: "Mirpur 2, Dhaka",
        bn: "মিরপুর ২, ঢাকা"
      },
      map: "https://www.google.com/maps/search/?api=1&query=Mirpur+2+Dhaka"
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
    faq: [
      {
        q: {
          en: "Is there parking?",
          bn: "পার্কিং আছে কি?"
        },
        a: {
          en: "Yes, free parking in the venue basement.",
          bn: "হ্যাঁ, ভেন্যুর বেসমেন্টে ফ্রি পার্কিং আছে।"
        }
      },
      {
        q: {
          en: "Can we bring children?",
          bn: "শিশুদের আনা যাবে?"
        },
        a: {
          en: "Of course! There will be a play corner for them.",
          bn: "অবশ্যই! ওদের জন্য খেলার জায়গা থাকবে।"
        }
      },
      {
        q: {
          en: "When will it end?",
          bn: "অনুষ্ঠান কখন শেষ হবে?"
        },
        a: {
          en: "Around 11 PM.",
          bn: "রাত ১১টার মধ্যে।"
        }
      }
    ]
  },

  closing: {
    en: "Your presence and prayers will make our day complete.",
    bn: "আপনার উপস্থিতি ও দোয়া আমাদের দিনটিকে পরিপূর্ণ করবে।"
  }
};
