# Rehab Haider — simple architecture portfolio

Live site: https://atelier-08-demo.pages.dev/

Active source: `apps/atelier-08`. An Arabic RTL demonstration portfolio: six fictional design studies with explicitly labelled independent reference photographs. This is not a record of Rehab Haider's commissioned or completed work.

## Current presentation

- A light, static homepage with six project cards and a short introduction.
- Six static pages under `projects/`, each with a short concept, two reference images, and next/back navigation.
- Optional native-dialog image viewer with Escape dismissal and focus restoration. Image links work without JavaScript.
- Local WebP images at 640px and 1440px widths, responsive selection, lazy loading and intrinsic dimensions.
- No animation, CAD simulation, carousel, drawing controls or simulated inquiry submission in active pages.
- Existing `project.html?case=...` URLs redirect to matching static pages. The original DXF URL is retained.

Only `portfolio.css` and `gallery.js` are loaded by the new project pages. Legacy drawing files remain as unused historical source.

## Editing

`tools/portfolio-content.json` retains original concept data. `tools/simplify-portfolio.py` generates the current pages with a smaller image selection and revised descriptions. Run with Python and Pillow installed. Images in `assets/` are committed; serving the site requires no build step.

Photographs were retained from the previous site's Unsplash reference selection. Source photo identifiers are preserved in asset filenames. These photographs must never be attributed to Rehab as her built work.

## Existing Cloudflare Pages configuration

- Repository: `engatworks/client-showcase`
- Production branch: `main`
- Root: `apps/atelier-08`
- Build command: `exit 0`
- Build output: `.`

The separate `apps/goodside-learning` demo is unchanged.
