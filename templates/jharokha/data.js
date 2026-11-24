/*
  ======================================================
  CARD DETAILS — this is the ONLY file you edit per client.
  Text can be a plain string, or { en: "...", bn: "..." }
  for English + Bangla. Times are Dhaka time (+06:00).
  ======================================================
*/
window.INVITE = {
  brand: "Shubho Chithi",
  defaultLang: "en",            // "en" or "bn"
  monogram: "F&A",
  hashtag: "#FahimAnikaShahiShaadi",
  showBismillah: true,

  // title = degree / profession line under the name (optional)
  groom: {
    short: {
      en: "Fahim",
      bn: "ফাহিম"
    },
    full: {
      en: "Fahim Muntasir",
      bn: "ফাহিম মুনতাসির"
    },
    parents: {
      en: "Son of Syed Moinul Islam & Syeda Fatema",
      bn: "সৈয়দ মঈনুল ইসলাম ও সৈয়দা ফাতেমার পুত্র"
    },
    title: {
      en: "Barrister-at-Law",
      bn: "ব্যারিস্টার-অ্যাট-ল"
    }
  },
  bride: {
    short: {
      en: "Anika",
      bn: "আনিকা"
    },
    full: {
      en: "Anika Tabassum",
      bn: "আনিকা তাবাসসুম"
    },
    parents: {
      en: "Daughter of Kazi Nurul Huda & Kazi Sharmin",
      bn: "কাজী নুরুল হুদা ও কাজী শারমিনের কন্যা"
    },
    title: {
      en: "Architect",
      bn: "স্থপতি"
    }
  },

  message: {
    en: "Together with their families, request the honour of your presence at the celebration of their marriage",
    bn: "পরিবারের সকলের সাথে আপনাকে আমাদের বিবাহ অনুষ্ঠানে সাদর আমন্ত্রণ জানাচ্ছি"
  },

  events: [
    {
      title: {
        en: "Mehendi Night",
        bn: "মেহেদি সন্ধ্যা"
      },
      start: "2027-01-14T18:00:00+06:00",
      end: "2027-01-14T22:00:00+06:00",
      venue: {
        en: "Mehfil Lawn",
        bn: "মেহফিল লন"
      },
      address: {
        en: "Baridhara, Dhaka",
        bn: "বারিধারা, ঢাকা"
      },
      map: "https://www.google.com/maps/search/?api=1&query=Baridhara+Dhaka",
      dressCode: {
        en: "Emerald & gold",
        bn: "পান্না সবুজ ও সোনালি"
      }
    },
    {
      title: {
        en: "Akdh & Wedding",
        bn: "আকদ ও বিবাহ"
      },
      start: "2027-01-15T19:00:00+06:00",
      end: "2027-01-15T23:00:00+06:00",
      venue: {
        en: "The Durbar Hall",
        bn: "দ্য দরবার হল"
      },
      address: {
        en: "Banani, Dhaka",
        bn: "বনানী, ঢাকা"
      },
      map: "https://www.google.com/maps/search/?api=1&query=Banani+Dhaka",
      dressCode: {
        en: "Royal: sherwani, banarasi",
        bn: "শাহী: শেরওয়ানি, বেনারসি"
      }
    },
    {
      title: {
        en: "Walima",
        bn: "ওয়ালিমা"
      },
      start: "2027-01-17T13:00:00+06:00",
      end: "2027-01-17T17:00:00+06:00",
      venue: {
        en: "The Durbar Hall",
        bn: "দ্য দরবার হল"
      },
      address: {
        en: "Banani, Dhaka",
        bn: "বনানী, ঢাকা"
      },
      map: "https://www.google.com/maps/search/?api=1&query=Banani+Dhaka"
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
    schedule: [
      {
        time: {
          en: "6:30 PM",
          bn: "সন্ধ্যা ৬:৩০"
        },
        title: {
          en: "Guests arrive",
          bn: "অতিথি আগমন"
        },
        icon: "door"
      },
      {
        time: {
          en: "7:00 PM",
          bn: "সন্ধ্যা ৭:০০"
        },
        title: {
          en: "Bride & groom arrive",
          bn: "বর-কনের আগমন"
        },
        icon: "heart"
      },
      {
        time: {
          en: "7:30 PM",
          bn: "সন্ধ্যা ৭:৩০"
        },
        title: {
          en: "Akdh & dua",
          bn: "আকদ ও দোয়া"
        },
        icon: "ring"
      },
      {
        time: {
          en: "8:30 PM",
          bn: "রাত ৮:৩০"
        },
        title: {
          en: "Dinner",
          bn: "প্রীতিভোজ"
        },
        icon: "plate"
      },
      {
        time: {
          en: "9:30 PM",
          bn: "রাত ৯:৩০"
        },
        title: {
          en: "Photo session",
          bn: "ফটোসেশন"
        },
        icon: "camera"
      },
      {
        time: {
          en: "10:30 PM",
          bn: "রাত ১০:৩০"
        },
        title: {
          en: "Farewell",
          bn: "বিদায়"
        },
        icon: "moon"
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
        en: "Dress like royalty",
        bn: "শাহী সাজে আসুন"
      },
      colors: [
        {
          name: {
            en: "Ruby",
            bn: "রুবি লাল"
          },
          hex: "#8e1b2c"
        },
        {
          name: {
            en: "Emerald",
            bn: "পান্না"
          },
          hex: "#16594a"
        },
        {
          name: {
            en: "Royal gold",
            bn: "শাহী সোনালি"
          },
          hex: "#c9a24f"
        },
        {
          name: {
            en: "Marble",
            bn: "মার্বেল"
          },
          hex: "#f3efe7"
        }
      ]
    },
    stay: [
      {
        name: {
          en: "Hotel Shapla Inn",
          bn: "হোটেল শাপলা ইন"
        },
        note: {
          en: "5 min from the venue · breakfast included",
          bn: "ভেন্যু থেকে ৫ মিনিট · সকালের নাস্তা সহ"
        },
        map: "https://www.google.com/maps/search/?api=1&query=hotel+Mirpur+10+Dhaka"
      },
      {
        name: {
          en: "Nakshi Guest House",
          bn: "নকশী গেস্ট হাউস"
        },
        note: {
          en: "Family rooms · 10 min away",
          bn: "ফ্যামিলি রুম · ১০ মিনিট দূরে"
        },
        map: "https://www.google.com/maps/search/?api=1&query=guest+house+Mirpur+Dhaka"
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
