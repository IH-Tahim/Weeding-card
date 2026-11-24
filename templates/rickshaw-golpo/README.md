# Rickshaw Golpo — a rickshaw-art love story

- **Opening:** a painted **rickshaw back plate** in Dhaka rickshaw-art colours. The guest rings the **bell** ("kring kring" sound) and it rides away.
- **Scroll story:** a **rickshaw carrying the couple rides down a winding road** as the guest scrolls, past each `extras.story` milestone and then every event (signboard cards).
- The **countdown is a rickshaw number plate** ("ঢাকা মেট্রো · বিয়ে").
- The story is shown on the road, so the separate story section is skipped (`data-xs-skip="story"`).

Per client: edit `data.js` only (names, `title` for degree/profession, events, extras). Guest links: `index.html?to=Name` (add `&lang=bn` for Bangla).
Built on the shared engine (`../shared/core.js`) with the shared extras (`../shared/extras.js`: calendar + Bangla date, story, programme, dress code, menu, gifts, stay, FAQ) and media (`../shared/media.js`: music, map, calendar, share).
