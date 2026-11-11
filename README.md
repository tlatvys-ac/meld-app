# meld-app

Download page for **Meld** (Figma boards → After Effects), served by
GitHub Pages at https://tlatvys-ac.github.io/meld-app/. Releases on this
repo carry the downloads: `Meld-<v>.zip` (both pieces), `Meld_v<v>.zxp`
(AE panel) and `Meld-Figma-Plugin-<v>.zip`. They're built in the private
Meld repo by `build/package-release.sh`.

Built to the shared download-site rules (reference:
`refractlab-app/index.html`).

## Images

- `logo.svg`: drawn from Thomas's hand-drawn sketch (a head with a
  bulging, veined brain, eyes shut, sending out thought waves).
  `favicon.svg` is the simplified small-size version; the PNG icons are
  Chrome renders of those two.
- `hero`, `modes`, `settings`, `notes`, `panel`: renders of the REAL
  plugin UI (`figma-plugin/ui.html`, Figma dark theme) and the real AE
  panel stylesheet, with neutral sample data (no client work). The recipe
  is in `tools/shots/`: serve that folder plus a themed copy of `ui.html`
  (`ui-dark.html`), run `mock.mjs` (a stand-in panel on :7499), and
  `render.mjs <scene> <w> <h> <out>` (hero 756×420 @2×, tiles 420×540
  @2.5× with zoom). `og.html` makes the 1200×630 share image.
- Encoding: `avifenc -q 75 -s 4 -y 420 --cicp 1/13/1 -r full` + JPEG q85
  fallback (smaller than PNG for these).
