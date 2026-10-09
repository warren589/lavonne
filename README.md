# Lavonne — Ecosystem section (mobile)

Mobile build of the Figma frame **"Numbers on the left (same interaction as current site)"**
(`Lavonne-Website-Int`, node `4507:1713`, in the *Lavonne Ecosystem Mobile versions* section).

The site's root page (`index.html`) shows the section running at true size inside an iPhone 16 Pro frame, so people can see the real proportions. To see the section without the frame, open `section.html` on a phone, or in a browser's device mode at about 402 × 728. If you're running it locally, serve the folder over HTTP (for example `npx serve .`), because the Back to the start and Play it through buttons don't work when the file is opened directly from disk.

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
| `index.html` | The phone-frame preview, which loads `section.html` inside the phone |
| `section.html` | The section markup, with spacer blocks above and below so you can test the scroll |
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

## Notes

1. **Brand fonts.** Passenger Sans and Rhymes Display load from the Adobe Fonts kit `rtp1ffx`. The CSS asks for the families `passenger-sans` and `rhymes-display`; if the kit's web project uses different CSS names, update `--eco-font-sans` and `--eco-font-display` in `css/ecosystem.css`. The kit only serves fonts to domains listed in its web project, so add the deployment domain (and `localhost` for local work). Inter, which the numbers use, is self-hosted under the SIL Open Font License.
2. **Content** matches the ecosystem section on lavonne.in. Facility, Immersion, Certification and Visiting chefs use the original photos from the Figma file. The Syllabus photo is cropped from a screenshot of the live site, so it's slightly softer; swap in the original file when you have it.
