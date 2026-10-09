# Lavonne — Ecosystem section (mobile, regular scroll)

Mobile build of the Figma frame **"regular scroll"**
(`Lavonne-Website-Int`, node `4507:1692`).

This branch is an alternative to the pinned, stepped version on `claude/charming-mayer-76ac90`. Here the five ecosystem items sit one after another and the page scrolls normally. Each item is a full-width image (402 × 453) followed by its number, rule and copy.

The root URL (`index.html`) opens the phone preview: it runs the section at true size inside an iPhone 16 Pro frame. With Safari's toolbars, the page area is 402 × 728, the same as the Figma frame. Use *Back to the start* to replay the reveals and *Play it through* for a hands-free scroll. Serve the folder over HTTP (for example `python3 -m http.server`), because the buttons don't work when the file is opened directly from disk.

The bare section, without the phone, is `section.html`. Open it on a phone, or in a browser's device mode at about 402 × 728.

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
| `index.html` | Phone-frame preview that runs `section.html` live, with notes for reviewers |
| `section.html` | The section markup, with spacer blocks above and below so you can test the scroll |
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

1. **Brand fonts.** These load from the Adobe Fonts kit `https://use.typekit.net/rtp1ffx.css`, which is linked in `index.html` and `section.html`. Two things to check:
   - The kit only serves fonts to the domains listed in its Adobe Fonts project settings. Add the domain you preview on, and `localhost` for local testing.
   - The kit's CSS couldn't be read from the build environment, so the family names are a best guess. The stacks in `css/ecosystem.css` (`--eco-font-sans`, `--eco-font-display`) try `passenger-sans`, then `rhymes-display` and `rhymes`. If the kit uses other names, put them at the front of those stacks. The kit's "Web project" page in Adobe Fonts lists the exact names.

   Inter, which the numbers use, is still served locally from `assets/fonts/`.
2. **Syllabus body copy.** The headline, "A syllabus that keeps moving.", matches the live site. The body line was pieced together from search results because the live site couldn't be reached from the build environment. Check it against the site; search `TODO` in `section.html`.
3. **Image resolution.** `facility.jpg` and `classroom.jpg` are 1× exports (402 × 453) from Figma. Replace them with the original photos so they look sharp on retina screens, especially while zoomed.
