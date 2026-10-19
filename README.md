# Client Showcase

## Active showcase: رحاب حيدر — Rehab Haider

**Arabic-first, right-to-left architecture and interior-design studio concept.** It is authored as a compelling client-facing practice site, not a generic web agency template.

**Live deployment:** https://atelier-08-demo.pages.dev/ (the existing Pages project will redeploy automatically from this repository).

**Source:** `apps/atelier-08/`
**Identity guide:** [Brand system, custom logo, typography, motion and claims policy](apps/atelier-08/BRAND.md)
**Research:** [Reference discovery and design research](RESEARCH.md)
**Open-source tooling review:** [135 researched candidates and decision matrix](apps/atelier-08/OPEN_SOURCE_TOOL_REVIEW.md)
**Case study and motion teardown:** [Arabic architectural examples, Codrops references, Reddit UX review and build anatomy](apps/atelier-08/CASE_STUDY_RESEARCH.md)
**Example detailed study:** [بيت الفناء](https://atelier-08-demo.pages.dev/project.html?case=courtyard)

### Experiences
- Signature bilingual identity: custom geometric doorway mark, full Arabic wordmark **رحاب حيدر**, English lockup **REHAB HAIDER**, vector favicon, architectural editorial typography.
- Cinematic, deliberately paced opening, opt-in architectural atmosphere selector, masked text transitions, subtle one-shot Arabic handwriting reveal.
- Six category-filterable fictional architectural studies, **each with its own deep project page and a 16-frame visual atlas** (10 custom technical diagram states + 6 reference photographs), including original floor plans, furnishings, zoning, circulation, sun concept, dimensions, elevation, section, isometric massing, materials and annotated narrative.
- **NEW: Seven-stage scroll-assembled 3D Courtyard House**, with site, plan/slabs, frame, stone/glass facades, roof, finishes and landscaping. It is built from ~265 Three.js scene objects, controlled by native scrolling, and offers step jumps and PNG capture. Master dimensions live in `house-config.js` and also drive the courtyard plan/elevation/section illustrations.
- **Courtyard model-to-image continuity:** six views and the project hero are captured from the exact same rendered model in the visitor's browser (CGI concept renders, not photographs). Other five projects still use reference photography and are NOT represented as derived from this model.
- **From Plan to Space** split-view scrubber for project diagrams, plus filterable fullscreen project archives and SVG export of concept drawings.
- Interactive material palette with multiple coordinated schemes, plus a custom original SVG plan whose daylight/circulation/plan layers can be explored.
- Responsive RTL navigation, native scrolling, keyboard accessible fullscreen image viewer, reduced-motion support and locally generated project-enquiry brief.
- Static deploy: no npm build, paid hosting, database, sending API, or GitHub Actions. The interactive house imports a pinned external Three.js ES module from jsDelivr, so that feature requires internet/WebGL; older browsers retain the other case-study content.

### Cloudflare Pages configuration (already in use)
- Git repository: `engatworks/client-showcase`
- Production branch: `main`
- Root directory: `apps/atelier-08`
- Framework: None
- Build command: `exit 0`
- Build output: `.` (one period, no spaces)

Deployments are triggered when commits land on `main`. No Cloudflare Workers configuration is needed. **Do not change the Pages root directory**: the site's legacy folder name is intentionally retained to preserve the existing deployment.

### Integrity and production handoff
Rehab Haider is treated as a fictional practice for this demo, without asserting verifiable ownership of a real person's career, license or built portfolio. Case studies are fictional and are transparently labeled as design studies. Five non-featured cases still use remote photographic references, not original renders or built-work images. **The featured Courtyard House's hero and six atmospheric views are generated from its own Three.js source model**, and are clearly CGI rather than actual construction photographs. All SVG diagrams are concept studies, not AutoCAD/DWG production drawings. All contact inquiries are built locally as a copyable message; no data is transmitted.

To launch a real business website: obtain owner sign-off and rights to the name, actual approved portfolio work, accurate role credits and credentials, licensed image assets, real business contact information, a messaging/booking endpoint, and privacy disclosures. Test the live page on desktop/mobile browsers and run a performance/accessibility audit before commercial sign-off.

### Other concept (paused)
`apps/goodside-learning/` is a separate tutoring concept retained in the same monorepo but **not part of the current scope**. Do not modify or deploy it unless specifically requested.
