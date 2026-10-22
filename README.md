# Rehab Haider — Living Motion / Framed by Light (bilingual cinematic demo)

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

## Kinetic interface update (22 October 2026)
- The site is an actual web implementation, **not** the earlier generated picture/mockup.
- Arabic and English homepages load `living-motion.js` and `living-motion.css`. Hero names animate down into view; short editorial statements type in sequence; a moving typographic band and scroll-triggered word reveals create motion past the first screen. The auto-crossfading three-photo experience does not require pointless scene buttons.
- Motion pauses when the hero is outside the viewport or the tab is hidden, and respects reduced-motion settings. Arabic text is animated by whole connected words, not disconnected letters.
- The former decorative `architecture-mark` sketch has been removed from both homepages. The about/CAD section renders the real project **concept geometry** through `house-config.js` and `cad-studio.js` as a measured floor plan (six layers), concept elevation and section. The existing editable `rehab-haider-courtyard-concept.dxf` is linked for download.
- These are **DXF-compatible conceptual drawings rendered in the browser**, not files certified or exported by the AutoCAD application. Neither they nor the six fictional project studies should be represented as commissioned work.
- `tools/check_release.py` and `.github/workflows/rehab-portfolio-qa.yml` test the new hooks and attempt real Chromium mobile/desktop layout and drawing checks. The workflow's completed result, screenshots and Cloudflare deployment still require independent verification.

### Motion references
- [Motion: Text animation](https://motion.dev/docs/text-animation) — staggered words, clipping, typewriter and scroll reveals.
- [GSAP SplitText documentation](https://gsap.com/docs/v3/Plugins/SplitText/) — responsive, accessible split text; Arabic remains whole-word.
- [Codrops: scroll-driven type](https://tympanus.net/codrops/2025/11/04/creating-3d-scroll-driven-text-animations-with-css-and-gsap/) — scroll-linked kinetic composition.

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
