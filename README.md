# Rehab Haider — The Threshold (bilingual portfolio demonstration)

**Arabic:** https://atelier-08-demo.pages.dev/  
**English:** https://atelier-08-demo.pages.dev/en/index.html

Active Cloudflare Pages source: `apps/atelier-08`, production branch `main`.

## Design, 22 October 2026
The Threshold is a bespoke, editorial architecture portfolio **demonstration**, not a verified professional project archive. The new landing pages include:
- Architectural cover layouts in Arabic and English, monumental display lettering, a typographic R/H identity and precise drawing-style illustration.
- Expressive English *Instrument Serif* and Arabic *Noto Naskh Arabic* headlines, set against readable DM Sans and Alexandria navigation/body text.
- One prominent reference photograph with clear provenance disclaimers, sparse architectural linework and page numbering.
- A manifesto bridging the hero to a staggered index of six fictional spatial studies, each with native AR and EN project pages.
- Responsive layouts, functional page navigation, language alternatives, reduced-motion support, and static HTML/CSS delivery without a heavyweight framework.
- Static route/asset validation under `tools/check_release.py` and `.github/workflows/rehab-portfolio-qa.yml`.

## Portfolio truth
All six spatial studies are fictional concepts. The photographs are independent mood references, **not** commissions, buildings or projects completed by Rehab Haider. No actual identity approval, commissioned projects, client contact details, or project-specific CAD files were supplied. Do not substitute invented claims. Replace all reference material with licensed, verified project assets and approved biography before commercial publication.

## Local validation
From the repository root:
```sh
python3 apps/atelier-08/tools/check_release.py
```
The check covers fourteen bilingual routes, link/asset targets, language metadata and structural expectations. It does **not** substitute for actual device screenshots, accessibility audits, Lighthouse scoring or a verified Cloudflare deployment.

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
