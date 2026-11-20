/**
 * Shubho Chithi — save every order to a Google Sheet (free)
 *
 * Setup (once):
 * 1. Create a Google Sheet called "Shubho Chithi — Orders".
 * 2. Extensions → Apps Script → paste this file → Save.
 * 3. Deploy → New deployment → Web app → Execute as: Me · Who has access: Anyone → Deploy.
 * 4. Copy the /exec URL into site-config.js → orderSheetUrl, then push.
 *
 * Each order adds a row. The last column is a ready-made data.js:
 * copy it into the chosen template's data.js and check the details.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var cols = ["Time", "Order ID", "Customer", "Phone", "Package", "Design", "Add-ons", "Total", "Paid with", "TrxID", "Status", "Summary", "data.js"];
    if (sheet.getLastRow() === 0) { sheet.appendRow(cols); sheet.setFrozenRows(1); }
    var p = e.parameter || {};
    var safe = function (v, max) { return String(v || "").replace(/^[=+\-@]/, "'").slice(0, max || 200); };
    sheet.appendRow([
      new Date(), safe(p.orderId, 30), safe(p.customer, 60), safe(p.phone, 20), safe(p.package, 20), safe(p.design, 40),
      safe(p.addons, 80), safe(p.total, 10), safe(p.payMethod, 10), safe(p.trxId, 20), "New — verify payment",
      safe(p.summary, 4000), safe(p.dataJs, 20000)
    ]);
    return ContentService.createTextOutput("ok");
  } finally {
    lock.releaseLock();
  }
}
