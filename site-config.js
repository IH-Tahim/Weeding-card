/*
  ======================================================
  SHUBHO CHITHI — business settings
  Edit these once. The home page and order page read them.
  ======================================================
*/
window.SITE = {
  brand: "Shubho Chithi",
  brandBn: "শুভ চিঠি",
  domain: "shubhochithi.com",

  // WhatsApp number that receives orders: country code + number, digits only. e.g. "8801712345678"
  whatsapp: "",
  // bKash / Nagad number customers send the advance to (shown on the order page)
  bkash: "",
  bkashType: "Personal", // "Personal", "Merchant" or "Agent" (tells the customer to use Send Money or Payment)
  nagad: "",

  email: "hello@shubhochithi.com",
  facebook: "",   // full page URL, e.g. "https://facebook.com/shubhochithi"
  instagram: "",  // e.g. "https://instagram.com/shubhochithi"
  tiktok: "",     // e.g. "https://tiktok.com/@shubhochithi"

  // Optional: Google Apps Script web-app URL (see order-google-sheet.gs) to save every order in a Google Sheet
  orderSheetUrl: "",

  // Prices in BDT
  packages: [
    { id: "basic", price: 999 },
    { id: "popular", price: 1999 },
    { id: "premium", price: 3999 }
  ],
  addons: [
    { id: "reel", price: 500 },
    { id: "extraEvent", price: 300 },
    { id: "qr", price: 200 },
    { id: "rush", price: 300 }
  ],
  advance: 500
};
