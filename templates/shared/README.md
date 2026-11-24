# Shared card features (`media.js`, `couple.svg`)

Every design loads `../shared/media.js` after `data.js`. It adds:
- **Music** that starts almost silent on the guest's first tap and fades up over about 9 seconds. A floating button turns it off/on and the choice is remembered. With no `music` file it plays a gentle built-in instrumental (Raag Bhupali-style, generated in the browser, so there is no copyright issue). `musicEnabled: false` removes music.
- **Save the date**: every calendar button opens Google Calendar or a phone-calendar `.ics` file with reminders 1 day and 3 hours before.
- **Map**: every map button opens a live venue map with directions and "share location".
- **Share** button and the couple **photo** (`data.js → photo`, or the bride & groom illustration `couple.svg`).

## extras.js — extra sections for every design
Load after `media.js`. Reads `data.js → extras` and adds matching sections before the RSVP:
`calendar` (automatic month calendar + Bangla date; `calendar: false` hides it), `story`, `schedule`, `dress`, `menu`, `gifts` (with a bKash copy button), `stay`, `faq`.
Sections copy the design's own label/title styles; colours follow the design (override with `--xs-accent`, `--xs-card`).
A design can hide one with `<body data-xs-skip="story">`. Also provides `SC.bangla(iso)` and `SC.time(iso)`.

## core.js — engine for the newer designs
Linen Garden, Nakshi Kantha, Rickshaw Golpo, Fanush and Jharokha mark their HTML with `data-f`, `data-date`, `data-events`, `data-cd`, `data-show`…
and `core.js` fills everything from `data.js` (language, guest name, events, countdown, RSVP, reveal-on-scroll). Load order:
`data.js → media.js → extras.js → core.js → app.js`.
