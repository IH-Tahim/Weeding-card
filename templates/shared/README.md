# Shared card features (`media.js`, `couple.svg`)

Every design loads `../shared/media.js` after `data.js`. It adds:
- **Music** that starts almost silent on the guest's first tap and fades up over about 9 seconds. A floating button turns it off/on and the choice is remembered. With no `music` file it plays a gentle built-in instrumental (Raag Bhupali-style, generated in the browser, so there is no copyright issue). `musicEnabled: false` removes music.
- **Save the date**: every calendar button opens Google Calendar or a phone-calendar `.ics` file with reminders 1 day and 3 hours before.
- **Map**: every map button opens a live venue map with directions and "share location".
- **Share** button and the couple **photo** (`data.js → photo`, or the bride & groom illustration `couple.svg`).
