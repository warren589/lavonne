# Lavonne — Ecosystem section (mobile)

Mobile build of the Figma frame **"Numbers on the left (same interaction as current site)"**
(`Lavonne-Website-Int`, node `4507:1713`, in the *Lavonne Ecosystem Mobile versions* section).

Open `index.html` on a phone, or in a browser's device mode at about 402 × 728, and scroll.

## Interaction

This works the same way as the current mobile site. The only change is that the numbers sit in a column on the left instead of along the bottom.

- The section pins (`position: sticky`) while you scroll through it. Each slide gets one viewport of scroll (`--eco-step`).
- Each step swaps in the next slide: the image crossfades and the copy fades and rises slightly.
- Numbers you've reached turn white. The 16px connector under the current number fills from top to bottom as you scroll towards the next one.
- Tapping a number scrolls to that slide.
- With `prefers-reduced-motion`, the stepping still happens but the fades are turned off.

## Files

| Path | What |
| --- | --- |
| `index.html` | The section markup, with spacer blocks above and below so you can test the scroll |
| `css/ecosystem.css` | Styles and design tokens (colours, fonts, sizes) |
| `js/ecosystem.js` | The scroll-driven stepping. It needs no dependencies and starts up on any `[data-ecosystem]` element |
| `assets/images/` | Slide images |
| `assets/fonts/` | Web fonts |

## Settings (CSS custom properties)

| Variable | Default | Use |
| --- | --- | --- |
| `--eco-top` | `0px` | Set this to the height of a fixed site header so the panel pins below it |
| `--eco-step` | `100svh` | How much scroll each slide gets |
| `--eco-content-h` | `275px` | Height of the text area under the image (728 − 453 in the design) |
| `--eco-fade` | `500ms` | Length of the crossfade |

## Still needed

1. **Brand fonts.** Passenger Sans and Rhymes Display are licensed, so they aren't in the repo. Add them as:
   - `assets/fonts/PassengerSans-Regular.woff2`
   - `assets/fonts/RhymesDisplay-Regular.woff2`
   - `assets/fonts/RhymesDisplay-Italic.woff2`

   Until those files are there, the page falls back to Helvetica/Arial and Georgia. Inter, which the numbers use, is already included under the SIL Open Font License.
2. **Slide images 02–05.** Only the Facility image is in the design frame. `syllabus.jpg`, `immersion.jpg`, `certification.jpg` and `visiting-chefs.jpg` are placeholders: other Lavonne photos taken from the Figma file. Swap in the photos the live site uses.
3. **Syllabus copy.** This text isn't in the Figma file. Search `TODO` in `index.html`.
4. **Facility image resolution.** `facility.jpg` is a 1× export (402 × 453). Replace it with the original `BI6A6642` photo so it looks sharp on retina screens.
