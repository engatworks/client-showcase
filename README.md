# Client Showcase — two independent demo experiences

A zero-dependency static monorepo for showing prospective freelance web clients what is possible.

| Demo | Folder | Experience |
|---|---|---|
| ATELIER / 08 | `apps/atelier-08` | Cinematic portfolio for a fictional architecture + interiors studio |
| Goodside Learning | `apps/goodside-learning` | Warm, thoughtful 1:1 private tutor website |

## Recommended deployment: Cloudflare Pages

Create **two Pages projects** using the same GitHub repository.

**Project 1: ATELIER / 08**
- Root directory: `apps/atelier-08`
- Framework preset: None
- Build command: `exit 0`
- Build output directory: `.`
- Build watch paths: include `apps/atelier-08/*`

**Project 2: Goodside Learning**
- Root directory: `apps/goodside-learning`
- Framework preset: None
- Build command: `exit 0`
- Build output directory: `.`
- Build watch paths: include `apps/goodside-learning/*`

**Important:** Enter the output directory as a single period (`.`), with no trailing space. Otherwise Cloudflare will search for a nonexistent directory like `apps/atelier-08/. `. Leave the advanced root directory set to the actual app folder.

These are plain static HTML/CSS/JS sites. Their Workers-only Wrangler configuration files have been removed to avoid Cloudflare Pages interpreting them as invalid Pages configurations.

No npm, paid hosting, Cloudflare Workers, or GitHub Actions required.

Local preview: `cd apps/atelier-08 && python -m http.server 8000` (repeat for other site with another port).

## Demo integrity

Both concepts use **fictional brands and projects**; no case studies, testimonials, professional qualifications, or outcomes should be represented as belonging to real clients. Contact / enquiry UI is intentionally a **demo preview with copyable content**, not a fake submission to a backend. Replace photography, portfolio details, contact information, and credentials before commercial use.

Architecture and education photography loads remotely from Unsplash CDN; confirm asset availability and replace with real, licensed client photography before production. Google Fonts load remotely. Credit any images as desired; Unsplash license: https://unsplash.com/license.

## Accessibility and interaction

Vanilla HTML/CSS/JS; keyboard-operable navigation, skip links, reduced-motion support, responsive layouts, modal ESC handling, semantic sections, and no scroll hijacking. Project filtering / view change / project dialog, atmosphere selector, tutor subject explorer, FAQ and live enquiry builder are functional.

## Research

See `RESEARCH.md` for discovery sources, curated patterns, UX trade-offs and reference links.
