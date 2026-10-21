# Rehab Haider — Framed by Light (bilingual cinematic portfolio demonstration)

**Arabic:** https://atelier-08-demo.pages.dev/  
**English:** https://atelier-08-demo.pages.dev/en/index.html

Active Cloudflare Pages source: `apps/atelier-08`, production branch `main`.

## Design, 22 October 2026
Framed by Light is a bespoke, cinematic architecture portfolio **demonstration**, not a verified professional project archive. The new landing pages include:
- Full-viewport photographic introduction in Arabic and English, with Rehab Haider’s name as the central typographic portrait, imagery revealed *inside the lettering*, atmospheric overlays and architectural linework.
- Expressive English *Instrument Serif* and Arabic *Noto Naskh Arabic* headlines, set against readable DM Sans and Alexandria navigation/body text.
- Three independently selectable visual scenes sourced from existing local WebP images; accessible play/pause, auto-pause on interaction, slow photographic motion and a reduced-motion fallback.
- A second full-bleed typographic/photo interlude and an editorial manifesto, then a staggered index of six fictional spatial studies, each with native AR and EN project pages.
- Responsive layouts, functional page navigation, language alternatives, reduced-motion support, static HTML/CSS and a lightweight local `cinema.js` module without animation frameworks or scroll hijacking.
- Static route/asset validation under `tools/check_release.py` and `.github/workflows/rehab-portfolio-qa.yml`.

## Portfolio truth
All six spatial studies are fictional concepts. The photographs are independent mood references, **not** commissions, buildings or projects completed by Rehab Haider. No actual identity approval, commissioned projects, client contact details, or project-specific CAD files were supplied. Do not substitute invented claims. Replace all reference material with licensed, verified project assets and approved biography before commercial publication.

## Local validation
From the repository root:
```sh
python3 apps/atelier-08/tools/check_release.py
```
The check covers fourteen bilingual routes, link/asset targets, language metadata, cinematic landing structure and structural expectations. It does **not** substitute for actual device screenshots, accessibility audits, Lighthouse scoring or a verified Cloudflare deployment.

## Cloudflare Pages
- Repository: `engatworks/client-showcase`
- Production branch: `main`
- Root: `apps/atelier-08`
- Build command: `exit 0`
- Build output directory: `.`

Cloudflare availability and published content should be verified independently; a successful GitHub commit does not demonstrate a successful deployment.

## Architecture inspirations
- John Pawson — disciplined image-first project index: https://www.johnpawson.com/architecture
- Norm Architects — atmosphere and editorial project navigation: https://normcph.com/project_category/architecture/
- Büro Haeberli / Atelier Risi — architectural identity: https://www.buerohaeberli.ch/projekte/atelier-risi-identity-webdesign-print

The sister `apps/goodside-learning` demo remains a separate project.

## Visual sign-off still required
The cinematic effects have source-level checks but **live desktop/mobile browser screenshots, font loading inspection, contrast evaluation over each scene, Lighthouse and Cloudflare deployment were not independently verified** in this editing session. Do not claim a pixel-perfect launch on commit alone.
