# Client Showcase — two independent demo experiences

A zero-dependency static monorepo for showing prospective freelance web clients what is possible.

| Demo | Folder | Experience |
|---|---|---|
| ATELIER / 08 | `apps/atelier-08` | Cinematic portfolio for a fictional architecture + interiors studio |
| Goodside Learning | `apps/goodside-learning` | Warm, thoughtful 1:1 private tutor website |

## Recommended deployment: Cloudflare Workers Static Assets (free, Git-connected)

Both sites have their own `wrangler.jsonc` and `.assetsignore`, so you can connect the same repository to **two different Workers**, without a package manager or build command.

**Architecture Worker:**
- Git repository: `engatworks/client-showcase` 
- Production branch: `main`
- **Root directory:** `apps/atelier-08`
- **Build command:** blank
- **Deploy command:** `npx wrangler deploy`
- Wrangler name: `atelier-08-demo` (if you already created a Worker with another name, update `wrangler.jsonc` to match the name in the dashboard when Cloudflare does not automatically override it)
- Build watch include path: `apps/atelier-08/*`

**Tutor Worker:** identical except root directory is `apps/goodside-learning`, Wrangler name is `goodside-tutor-demo`, and watch path `apps/goodside-learning/*`.

Wrangler serves static assets from `./` relative to each site's config file. Each site's `.assetsignore` excludes its deployment config from public asset uploads. No Worker JavaScript entry point, GitHub Actions, paid service, or npm build required. If the Cloudflare project was created with a root directory of `/`, you must change it in **Worker → Settings → Build** or Wrangler won't see the site's config file. Changing GitHub repo files alone does not change that Worker dashboard setting.

**For quick repair without changing a Worker's root directory:** keep root `/` and change its deploy command to `npx wrangler deploy --assets ./apps/atelier-08` (or `./apps/goodside-learning` for the tutor). Cloudflare documents the `--assets` flag for static deploys. This may require a Worker name/config depending on the existing project setup; the per-site Wrangler configuration above is the more maintainable approach.

Reference: https://developers.cloudflare.com/workers/ci-cd/builds/advanced-setups/ , https://developers.cloudflare.com/workers/static-assets/binding/ , https://developers.cloudflare.com/workers/ci-cd/builds/troubleshoot/

---

## Alternative deployment: Cloudflare Pages

Create **two Pages projects** using the same GitHub repository.

**Project 1: ATELIER / 08**
- Root directory: `apps/atelier-08`
- Framework preset: None
- Build command: leave blank (or `exit 0`)
- Build output directory: `.`
- Build watch paths: include `apps/atelier-08/*`

**Project 2: Goodside Learning**
- Root directory: `apps/goodside-learning`
- Framework preset: None
- Build command: leave blank (or `exit 0`)
- Build output directory: `.`
- Build watch paths: include `apps/goodside-learning/*`

No npm, build pipeline, paid hosting, Cloudflare Workers, or GitHub Actions required.

Local preview: `cd apps/atelier-08 && python -m http.server 8000` (repeat for other site with another port).

## Demo integrity

Both concepts use **fictional brands and projects**; no case studies, testimonials, professional qualifications, or outcomes should be represented as belonging to real clients. Contact / enquiry UI is intentionally a **demo preview with copyable content**, not a fake submission to a backend. Replace photography, portfolio details, contact information, and credentials before commercial use.

Architecture and education photography loads remotely from Unsplash CDN; confirm asset availability and replace with real, licensed client photography before production. Google Fonts load remotely. Credit any images as desired; Unsplash license: https://unsplash.com/license.

## Accessibility and interaction

Vanilla HTML/CSS/JS; keyboard-operable navigation, skip links, reduced-motion support, responsive layouts, modal ESC handling, semantic sections, and no scroll hijacking. Project filtering / view change / project dialog, atmosphere selector, tutor subject explorer, FAQ and live enquiry builder are functional.

## Research

See `RESEARCH.md` for discovery sources, curated patterns, UX trade-offs and reference links.
