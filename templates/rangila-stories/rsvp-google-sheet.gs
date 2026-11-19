/**
 * RSVP → Google Sheet (free)
 *
 * Setup (5 minutes, once per couple):
 * 1. Create a new Google Sheet, e.g. "Rafi & Nusrat — RSVP".
 * 2. Extensions → Apps Script. Delete what is there and paste this whole file. Save.
 * 3. Deploy → New deployment → type "Web app".
 *      Execute as: Me      Who has access: Anyone
 * 4. Copy the Web app URL (ends with /exec) and paste it into data.js → rsvp.sheetUrl
 * 5. Share the Sheet with the couple (Viewer) — they see every reply live.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Time", "Name", "Attending", "Guests", "Message", "Card"]);
      sheet.setFrozenRows(1);
    }
    var p = e.parameter || {};
    var clean = function (v, max) { return String(v || "").replace(/^[=+\-@]/, "'").slice(0, max); };
    sheet.appendRow([
      new Date(),
      clean(p.name, 60),
      p.attending === "yes" ? "Yes" : "No",
      clean(p.guests, 4),
      clean(p.message, 200),
      clean(p.card, 120)
    ]);
    return ContentService.createTextOutput("ok");
  } finally {
    lock.releaseLock();
  }
}
