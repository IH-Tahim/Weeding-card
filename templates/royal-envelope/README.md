# Royal Envelope — Ivory & Gold invitation template

The guest sees an envelope with a gold wax seal and "Dear <their name>". They tap the seal, the flap opens, the letter rises and petals fall. The full invitation then appears:
Bismillah · couple names · parents · events (with directions + add to calendar) · countdown · photos · RSVP · contacts · thank you.
English and Bangla, switchable with one tap.

## Files
| File | What it is | Edit per client? |
|---|---|---|
| `data.js` | Names, events, venues, RSVP, contacts, photos, music | **Yes — only this** |
| `index.html`, `style.css`, `app.js` | The design and logic | No |
| `link-generator.html` | Makes one named link per guest + WhatsApp send buttons | No (your tool) |
| `rsvp-google-sheet.gs` | Free RSVP collector for Google Sheets | No (paste into Apps Script) |

## Make a new card (≈30 min)
1. Copy the whole `royal-envelope` folder and rename it, e.g. `rafi-weds-nusrat`.
2. Open `data.js` and change the names, parents, events, venues and Google Maps links, contacts and hashtag.
   - Times look like `2027-01-15T19:00:00+06:00` (year-month-day, 24-hour time, Dhaka).
   - `countdownEvent`: which event the countdown counts to (0 = first).
   - Photos: put them in a `photos/` folder and list them in `gallery`. Compress them first (under 300 KB each).
   - Music: add a licensed `music.mp3` and set `music: "music.mp3"`.
3. Preview: open `index.html` through a local server (or just deploy, step 4) and add `?to=YourName` to the link.
4. **Publish free on Cloudflare Pages:** dash.cloudflare.com → Workers & Pages → Create → Pages → *Upload assets* → drag the folder in → name it `rafi-weds-nusrat` → you get `https://rafi-weds-nusrat.pages.dev`.
   Later, connect your own domain and use subdomains like `rafi-nusrat.yourbrand.com`.
5. **RSVP to a Google Sheet** (optional): follow the steps at the top of `rsvp-google-sheet.gs`, then paste the `/exec` URL into `rsvp.sheetUrl`. Re-upload.
   If `sheetUrl` is empty, the RSVP button opens WhatsApp with a ready-made message to `rsvp.whatsapp`.
6. Open `https://<card>/link-generator.html`, paste the guest list, and send each guest their link on WhatsApp.
   Tick "Open the card in Bangla" to send `&lang=bn` links.

## Link options
- `?to=Tahim` → "Dear Tahim" on the envelope, and the RSVP name is pre-filled
- `&lang=bn` → opens in Bangla (`&lang=en` for English)

## Before you deliver — checklist
- [ ] Names spelled correctly in **both** languages
- [ ] Dates, times and days of the week match (check the countdown)
- [ ] Every "Directions" button opens the right venue
- [ ] RSVP tested once (a row appears in the Sheet / WhatsApp opens)
- [ ] Footer brand name set (`brand` in data.js)
- [ ] Opened on a real Android phone over mobile data
