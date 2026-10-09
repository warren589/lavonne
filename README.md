# Lavonne — Ecosystem section (mobile, regular scroll)

Mobile build of the Figma frame **"regular scroll"**
(`Lavonne-Website-Int`, node `4507:1692`).

This branch is an alternative to the pinned, stepped version on `claude/charming-mayer-76ac90`. Here the five ecosystem items sit one after another and the page scrolls normally. Each item is a full-width image (402 × 453) followed by its number, rule and copy.

Open `index.html` on a phone, or in a browser's device mode at about 402 × 728, and scroll. Serve the folder over HTTP (for example `python3 -m http.server`) so the web fonts load.

## Motion

- **Zoom out on scroll.** Each image starts slightly zoomed in (`--eco-zoom-from`, default `1.14`). As you scroll past it, it eases back to `1`, reaching `1` when the image leaves the top of the screen. The zoom follows your scroll with a little easing, so it glides instead of jumping on each wheel tick.
- **Rule.** The thin rule under each number draws downwards as the copy scrolls up. It is fully drawn by the time the block is resting in view.
- **Text reveal.** This plays once, when a text block comes into view:
  - the number and each word of the title rise out of a mask, one after another (`--eco-stagger`);
  - the eyebrow's letter spacing closes up from wide to normal as it fades in;
  - the body copy fades up from a soft blur after the title has landed.
- **`prefers-reduced-motion`.** No zoom and no reveal. Everything shows in its final state.
- **Without JavaScript**, everything is visible and static.

## Files

| Path | What |
| --- | --- |
| `index.html` | The section markup, with spacer blocks above and below so you can test the scroll |
| `css/ecosystem.css` | Styles, design tokens and reveal states |
| `js/ecosystem.js` | Zoom, rule and reveal. It needs no dependencies and starts up on any `[data-ecosystem]` element |
| `assets/images/` | Images |
| `assets/fonts/` | Web fonts |

## Settings (CSS custom properties)

| Variable | Default | Use |
| --- | --- | --- |
| `--eco-zoom-from` | `1.14` | Image scale when the image enters the screen. `1` turns the zoom off |
| `--eco-reveal` | `1100ms` | Length of the text reveal |
| `--eco-stagger` | `70ms` | Delay between title words |
| `--eco-ease` | expo-out | Easing curve for the reveal |

## Content

The copy comes from the "Lavonne ecosystem" section on the live site: Facility, Syllabus, Immersion, Certification and Visiting chefs. The images follow the order in the Figma frame.

| # | Image |
| --- | --- |
| 01 Facility | `facility.jpg` (tart rings) |
| 02 Syllabus | `classroom.jpg` (chef at the stand mixer) |
| 03 Immersion | `immersion.jpg` |
| 04 Certification | `pastry.jpg` (doughnut with chocolate plaque) |
| 05 Visiting chefs | `visiting-chefs.jpg` |

`kitchen.jpg` is a spare image that isn't used here.

## Still needed

1. **Brand fonts.** Passenger Sans and Rhymes Display are licensed, so they aren't in the repo. Add them as:
   - `assets/fonts/PassengerSans-Regular.woff2`
   - `assets/fonts/RhymesDisplay-Regular.woff2`
   - `assets/fonts/RhymesDisplay-Italic.woff2`

   Until those files are there, the page falls back to Helvetica/Arial and Georgia.
2. **Syllabus body copy.** The headline, "A syllabus that keeps moving.", matches the live site. The body line was pieced together from search results because the live site couldn't be reached from the build environment. Check it against the site; search `TODO` in `index.html`.
3. **Image resolution.** `facility.jpg` and `classroom.jpg` are 1× exports (402 × 453) from Figma. Replace them with the original photos so they look sharp on retina screens, especially while zoomed.
