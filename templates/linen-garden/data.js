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
  monogram: "A&N",
  hashtag: "#AyaanWedsNabila",
  showBismillah: true,

  // title = degree / profession line under the name (optional)
  groom: {
    short: {
      en: "Ayaan",
      bn: "আয়ান"
    },
    full: {
      en: "Ayaan Rahman",
      bn: "আয়ান রহমান"
    },
    parents: {
      en: "Son of Md. Habibur Rahman & Shirin Akter",
      bn: "মোঃ হাবিবুর রহমান ও শিরিন আক্তারের পুত্র"
    },
    title: {
      en: "B.Sc. in CSE, BUET · Software Engineer",
      bn: "বি.এসসি (সিএসই), বুয়েট · সফটওয়্যার ইঞ্জিনিয়ার"
    }
  },
  bride: {
    short: {
      en: "Nabila",
      bn: "নাবিলা"
    },
    full: {
      en: "Nabila Tasnim",
      bn: "নাবিলা তাসনিম"
    },
    parents: {
      en: "Daughter of Md. Rafiqul Islam & Shahana Parvin",
      bn: "মোঃ রফিকুল ইসলাম ও শাহানা পারভীনের কন্যা"
    },
    title: {
      en: "MBBS, DMC · Medical Officer",
      bn: "এমবিবিএস, ঢামেক · মেডিকেল অফিসার"
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
      start: "2027-01-21T18:00:00+06:00",
      end: "2027-01-21T22:00:00+06:00",
      venue: {
        en: "Bride's home",
        bn: "কনের বাড়ি"
      },
      address: {
        en: "Dhanmondi 9/A, Dhaka",
        bn: "ধানমন্ডি ৯/এ, ঢাকা"
      },
      map: "https://www.google.com/maps/search/?api=1&query=Dhanmondi+Dhaka",
      dressCode: {
        en: "Sage & mint",
        bn: "সেজ ও মিন্ট"
      }
    },
    {
      title: {
        en: "Akdh & Wedding",
        bn: "আকদ ও বিবাহ"
      },
      start: "2027-01-23T19:00:00+06:00",
      end: "2027-01-23T23:00:00+06:00",
      venue: {
        en: "The Garden Hall, Lakeshore",
        bn: "দ্য গার্ডেন হল, লেকশোর"
      },
      address: {
        en: "Gulshan 2, Dhaka",
        bn: "গুলশান ২, ঢাকা"
      },
      map: "https://www.google.com/maps/search/?api=1&query=Gulshan+2+Dhaka",
      dressCode: {
        en: "Pastel or jewel tones",
        bn: "প্যাস্টেল বা গাঢ় রঙ"
      }
    },
    {
      title: {
        en: "Walima",
        bn: "ওয়ালিমা"
      },
      start: "2027-01-25T13:00:00+06:00",
      end: "2027-01-25T17:00:00+06:00",
      venue: {
        en: "Lakeshore Banquet",
        bn: "লেকশোর ব্যাঙ্কুয়েট"
      },
      address: {
        en: "Gulshan 2, Dhaka",
        bn: "গুলশান ২, ঢাকা"
      },
      map: "https://www.google.com/maps/search/?api=1&query=Gulshan+2+Dhaka"
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
        en: "Women: saree or lehenga in pastels or jewel tones · Men: panjabi, sherwani or a suit",
        bn: "নারী: প্যাস্টেল বা গাঢ় রঙের শাড়ি/লেহেঙ্গা · পুরুষ: পাঞ্জাবি, শেরওয়ানি বা স্যুট"
      },
      colors: [
        {
          name: {
            en: "Sage",
            bn: "সেজ"
          },
          hex: "#8a9a76"
        },
        {
          name: {
            en: "Blush",
            bn: "ব্লাশ"
          },
          hex: "#e3b2ad"
        },
        {
          name: {
            en: "Ivory",
            bn: "আইভরি"
          },
          hex: "#f4ecdc"
        },
        {
          name: {
            en: "Antique gold",
            bn: "অ্যান্টিক সোনালি"
          },
          hex: "#a88a4e"
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
          en: "Is there transport?",
          bn: "যাতায়াতের ব্যবস্থা আছে?"
        },
        a: {
          en: "A shuttle will leave Gulshan 1 circle at 6:30 PM.",
          bn: "সন্ধ্যা ৬:৩০-এ গুলশান ১ সার্কেল থেকে শাটল ছাড়বে।"
        }
      },
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
      }
    ]
  },

  closing: {
    en: "Your presence and prayers will make our day complete.",
    bn: "আপনার উপস্থিতি ও দোয়া আমাদের দিনটিকে পরিপূর্ণ করবে।"
  }
};
