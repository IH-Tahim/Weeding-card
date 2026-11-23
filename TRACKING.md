# Tracking: website and ads

The website now measures three things:

1. **Where visitors come from.** This covers Facebook ads, the Instagram bio, TikTok, a friend's link and other sources. The source is remembered for 30 days and printed at the bottom of every WhatsApp order message, along with the customer's answer to "How did you find us?".
2. **What they do on the site.** For example: try a design, tap WhatsApp, start the order form, submit an order.
3. **Which ads bring orders.** Meta Pixel, Google Analytics 4 and TikTok Pixel receive those events, so Ads Manager can show results and cost per result.

The invitation cards that guests open have **no tracking**. Only the business website does.

## Events

| Our event | When | Meta | Google Analytics 4 | TikTok |
|---|---|---|---|---|
| `view_design` | Taps a design in the phone demo, or "Preview" on the order form | ViewContent | view_item | ViewContent |
| `try_name` | Taps "Try with my name" | ViewContent | try_design | ViewContent |
| `whatsapp` | Taps any WhatsApp button | Contact | contact | Contact |
| `order_click` | Taps any "Order" button | OrderClick (custom) | order_click | ClickButton |
| `order_start` | Fills in the first field on the order form | InitiateCheckout | begin_checkout | InitiateCheckout |
| `order_submit` | Submits an order (TrxID included), with the value in BDT | **Lead** | **generate_lead** | SubmitForm |

`order_submit` uses the order ID (for example `SC-261124-AB12`) as the event ID, so the same order is never counted twice.

## Step 1: Get the IDs (about 15 minutes, done by you)

These IDs are public. They appear in every website's code, so it's fine to send them to Claude.

**Meta Pixel (do this first, before ads start around 9 Dec)**
1. Open business.facebook.com → **Events Manager** → **Connect data sources** → **Web**.
2. Name it `Shubho Chithi Website` → choose **Meta Pixel** → **Set up manually** (skip the partner options).
3. Copy the **Pixel / Dataset ID** (15–16 digits).
4. In Business settings → **Brand safety → Domains**, add `shubhochithi.com` and pick the **meta-tag** method. Send Claude the tag, and Claude will add it to the website.

**Google Analytics 4**
1. Open analytics.google.com → **Admin** → **Create** → Account `Shubho Chithi`.
2. Create a property with time zone **Bangladesh** and currency **BDT**, then add a web data stream for `https://shubhochithi.com`.
3. Copy the **Measurement ID** (`G-XXXXXXXXXX`).
4. After the first test order, go to **Admin → Events** and mark `generate_lead` as a **key event**.

**TikTok Pixel (optional until January)**
1. Open ads.tiktok.com → **Tools → Events → Web events** → **Set up web events** → **Manual setup**.
2. Copy the **Pixel ID**.

Send the IDs to Claude. Claude will put them in `site-config.js`:

```js
tracking: { metaPixel: "1234567890123456", ga4: "G-ABC123XYZ9", tiktokPixel: "CABCDEF1234567890", debug: false }
```

## Step 2: Test it

- Open `https://shubhochithi.com/?debug_track=1`, then open the browser console. Every event prints as `[track] …`.
- **Meta**: in Events Manager, use **Test events**, or install the *Meta Pixel Helper* Chrome extension.
- **GA4**: open **Reports → Realtime**. With `?debug_track=1`, events also appear in **Admin → DebugView**.
- Place one test order with `utm_source=test`. The WhatsApp message should end with `Link source: test`.

## Step 3: Tag every link you share

### Links in bios and posts (organic)

The order message shows `ref` as the source. GA4 shows it too.

| Where | Link |
|---|---|
| Instagram bio | `https://shubhochithi.com/?ref=ig-bio` |
| TikTok bio | `https://shubhochithi.com/?ref=tt-bio` |
| Facebook page button / About | `https://shubhochithi.com/?ref=fb-page` |
| Facebook group posts | `https://shubhochithi.com/?ref=fb-group` |
| WhatsApp status | `https://shubhochithi.com/?ref=wa-status` |
| Vendor partner (one per partner) | `https://shubhochithi.com/?ref=vendor-rahim-photography` |
| "Made with ♥" link on cards | `https://shubhochithi.com/?ref=card` |

### Ads that send people to the website

Paste these into the ad's **URL parameters** field. Ads Manager fills in the names automatically.

- **Meta**: `utm_source=facebook&utm_medium=paid&utm_campaign={{campaign.name}}&utm_content={{ad.name}}`
- **TikTok**: `utm_source=tiktok&utm_medium=paid&utm_campaign=__CAMPAIGN_NAME__&utm_content=__CID_NAME__`

Give each ad a short, clear name, such as `rose-video` or `price-compare`. The order message will then say, for example, `Link source: facebook / paid / dec-test1 / rose-video`.

### WhatsApp message ads (the main ad in the season plan)

These ads open WhatsApp directly, so the website never sees the click. Track them like this:

1. In each ad's **pre-filled message**, add a short code. For example, ad 1 gets `আসসালামু আলাইকুম, আমি একটা ডিজিটাল বিয়ের কার্ড চাই (A1)` and ad 2 gets `… (A2)`.
2. When a chat starts with `(A1)`, give it the WhatsApp Business label **Ad A1**.
3. Ads Manager shows **Messaging conversations started** and **cost per conversation** for each ad.
4. When the customer pays the advance, write `A1` in the order sheet's **Source** column, or pick it from the order message.

## Step 4: Every Sunday (fills the season plan's numbers table)

| Number | Where to find it |
|---|---|
| Website visitors by source | GA4 → Reports → Acquisition → **Traffic acquisition** (Session source / medium) |
| Orders submitted on the site | GA4 → Reports → Engagement → Events → `generate_lead` (or Meta Events Manager → Lead) |
| Messages from ads, cost per message | Meta Ads Manager → Results / Cost per result |
| Real paid orders by source | The order sheet: count rows by **Found us** and **Source**, plus WhatsApp labels |
| **Cost per order** | Ad spend this week ÷ orders that came from ads. Aim for under ৳400. |

## Files

- `assets/track.js`: all tracking code (source capture, pixel loading, events).
- `site-config.js` → `tracking`: the IDs. Leave an ID empty to switch that tool off.
- `assets/order.js`: fires `order_start` / `order_submit` and adds the source to the order message and sheet.
- `order-google-sheet.gs`: new columns **Found us**, **Source**, **First source**. If you already made the sheet, add these three header cells after **TrxID**.
- `privacy.html`: the privacy notice Meta requires on sites that use the Pixel. It's linked in the footer.
