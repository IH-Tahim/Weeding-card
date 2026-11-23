/**
 * Shubho Chithi — save every order to a Google Sheet (free)
 *
 * Setup (once):
 * 1. Create a Google Sheet called "Shubho Chithi — Orders".
 * 2. Extensions → Apps Script → paste this file → Save.
 * 3. Deploy → New deployment → Web app → Execute as: Me · Who has access: Anyone → Deploy.
 * 4. Copy the /exec URL into site-config.js → orderSheetUrl, then publish the site.
 * After editing this script: Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy (the URL stays the same).
 *
 * Tabs it creates:
 *  - "Orders": one short row per order, with a Status dropdown and a Notes column for you.
 *  - "Details": the full order message and a ready-made data.js for the chosen template (text is clipped; click a cell to read it).
 */
var STATUSES = ["New — verify payment", "Paid ✓", "In progress", "Preview sent", "Delivered", "Cancelled"];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var orders = ss.getSheetByName("Orders") || ss.insertSheet("Orders", 0);
    var details = ss.getSheetByName("Details") || ss.insertSheet("Details");

    var cols = ["Time", "Order ID", "Customer", "Phone", "Package", "Design", "Add-ons", "Total ৳", "Paid with", "TrxID", "Found us", "Source", "First source", "Status", "Notes"];
    if (orders.getLastRow() === 0) {
      orders.appendRow(cols);
      orders.setFrozenRows(1);
      orders.getRange(1, 1, 1, cols.length).setFontWeight("bold").setBackground("#f3e2ac");
      orders.setColumnWidth(1, 140); orders.setColumnWidth(3, 160); orders.setColumnWidth(12, 220); orders.setColumnWidth(13, 220); orders.setColumnWidth(14, 170); orders.setColumnWidth(15, 220);
    }
    if (details.getLastRow() === 0) {
      details.appendRow(["Order ID", "Customer", "Order message", "data.js (copy into the template)"]);
      details.setFrozenRows(1);
      details.getRange(1, 1, 1, 4).setFontWeight("bold").setBackground("#f3e2ac");
      details.setColumnWidth(3, 420); details.setColumnWidth(4, 420);
    }

    var p = e.parameter || {};
    var safe = function (v, max) { return String(v || "").replace(/^[=+\-@]/, "'").slice(0, max || 200); };
    var text = function (v, max) { return "'" + String(v || "").slice(0, max || 200); }; // keeps leading 0 / + in phone numbers

    orders.appendRow([
      new Date(), safe(p.orderId, 30), safe(p.customer, 60), text(p.phone, 20), safe(p.package, 20), safe(p.design, 40),
      safe(p.addons, 80), Number(p.total) || safe(p.total, 10), safe(p.payMethod, 10), safe(p.trxId, 20),
      safe(p.heard, 40), safe(p.source, 120), safe(p.firstSource, 120), STATUSES[0], ""
    ]);
    var r = orders.getLastRow();
    orders.getRange(r, 1).setNumberFormat("dd mmm yyyy, h:mm am/pm");
    orders.getRange(r, 14).setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).setAllowInvalid(true).build());
    orders.getRange(r, 1, 1, cols.length).setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP).setVerticalAlignment("middle");

    details.appendRow([safe(p.orderId, 30), safe(p.customer, 60), safe(p.summary, 4000), safe(p.dataJs, 20000)]);
    details.getRange(details.getLastRow(), 1, 1, 4).setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP).setVerticalAlignment("top");
    details.setRowHeight(details.getLastRow(), 21);

    return ContentService.createTextOutput("ok");
  } finally {
    lock.releaseLock();
  }
}
