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
  monogram: "I&S",
  hashtag: "#ImranSadiaUnderTheLanterns",
  showBismillah: true,

  // title = degree / profession line under the name (optional)
  groom: {
    short: {
      en: "Imran",
      bn: "ইমরান"
    },
    full: {
      en: "Imran Kabir",
      bn: "ইমরান কবির"
    },
    parents: {
      en: "Son of Humayun Kabir & Selina Akter",
      bn: "হুমায়ুন কবির ও সেলিনা আক্তারের পুত্র"
    },
    title: null
  },
  bride: {
    short: {
      en: "Sadia",
      bn: "সাদিয়া"
    },
    full: {
      en: "Sadia Afrin",
      bn: "সাদিয়া আফরিন"
    },
    parents: {
      en: "Daughter of Mahbubul Alam & Rokshana Parvin",
      bn: "মাহবুবুল আলম ও রোকশানা পারভীনের কন্যা"
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
      start: "2027-01-07T17:00:00+06:00",
      end: "2027-01-07T22:00:00+06:00",
      venue: {
        en: "Riverside Lawn",
        bn: "রিভারসাইড লন"
      },
      address: {
        en: "Purbachal, Dhaka",
        bn: "পূর্বাচল, ঢাকা"
      },
      map: "https://www.google.com/maps/search/?api=1&query=Purbachal+Dhaka"
    },
    {
      title: {
        en: "Akdh & Wedding",
        bn: "আকদ ও বিবাহ"
      },
      start: "2027-01-08T18:30:00+06:00",
      end: "2027-01-08T23:00:00+06:00",
      venue: {
        en: "Sky Garden, Lake Pavilion",
        bn: "স্কাই গার্ডেন, লেক প্যাভিলিয়ন"
      },
      address: {
        en: "Hatirjheel, Dhaka",
        bn: "হাতিরঝিল, ঢাকা"
      },
      map: "https://www.google.com/maps/search/?api=1&query=Hatirjheel+Dhaka",
      dressCode: {
        en: "Midnight blue & gold",
        bn: "গাঢ় নীল ও সোনালি"
      }
    },
    {
      title: {
        en: "Walima",
        bn: "ওয়ালিমা"
      },
      start: "2027-01-10T13:00:00+06:00",
      end: "2027-01-10T17:00:00+06:00",
      venue: {
        en: "Lake Pavilion",
        bn: "লেক প্যাভিলিয়ন"
      },
      address: {
        en: "Hatirjheel, Dhaka",
        bn: "হাতিরঝিল, ঢাকা"
      },
      map: "https://www.google.com/maps/search/?api=1&query=Hatirjheel+Dhaka"
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
    dress: {
      note: {
        en: "Come dressed in our wedding colours",
        bn: "আমাদের বিয়ের রঙে সেজে আসুন"
      },
      colors: [
        {
          name: {
            en: "Midnight",
            bn: "গাঢ় নীল"
          },
          hex: "#1b2350"
        },
        {
          name: {
            en: "Lantern gold",
            bn: "সোনালি"
          },
          hex: "#e8b04b"
        },
        {
          name: {
            en: "Dusk rose",
            bn: "গোধূলি গোলাপি"
          },
          hex: "#d98a8a"
        },
        {
          name: {
            en: "Ivory",
            bn: "আইভরি"
          },
          hex: "#f4ecdc"
        }
      ]
    },
    gifts: {
      text: {
        en: "Your presence and prayers are the greatest gift. If you still wish to send something, you can use bKash.",
        bn: "আপনার উপস্থিতি ও দোয়াই আমাদের সবচেয়ে বড় উপহার। তবু কিছু পাঠাতে চাইলে বিকাশ ব্যবহার করতে পারেন।"
      },
      bkash: "01700-000000"
    },
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
