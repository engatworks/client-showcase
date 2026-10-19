# Rehab Haider — Brand Identity & Website Art Direction
## رحاب حيدر · REHAB HAIDER

**Identity concept:** THE THRESHOLD / العتبة

The threshold is the place where architecture becomes experience: from street to home, exterior to interior, light to shade. The bespoke mark is a measured doorway framing a central arch and an axial line. Its thin lintel/corners reference architectural technical drawings; a single point represents the orientation mark on a plan.

### Logo system
- Master lockup: inline SVG threshold symbol + **رحاب حيدر** Arabic name + **REHAB HAIDER — ARCHITECTURE & INTERIORS** secondary line.
- Companion icon: \`favicon.svg\` (original vector path, not a text glyph or stock logo).
- Mark geometry: square frame, concentric inner arch, transverse line, central datum, subtle corner diagonals and measured point.
- Safe space: minimum 20% of the mark width on all sides; don't crowd with watermarks.
- On dark photographs: warm off-white (#F5F1E8). On light surfaces: forest ink (#161915). Avoid logos behind content, tiled logo watermarks and decorative branding everywhere.
- Before actual commercial launch, undertake a **trademark / brand-conflict search** for Rehab Haider and confirm name rights.

### Typography
- **Arabic display:** Noto Naskh Arabic (500), used at architectural scale on hero and section statements. Its contrast and curved movement add editorial character. Never fake Latin letter-spacing on Arabic.
- **Arabic UI and body:** Alexandria (300–700), a geometric companion that is legible in filters, navigation, labels and inquiry forms.
- **English micro-typography:** Manrope (500–700), limited to technical marks, years, coordinates, chapter numerals and the bilingual lockup.
- Rhythm: dramatic display headlines against restrained, relatively small body text with generous line-height (1.9–2.15 for Arabic paragraphs).
- Accessibility: ensure text remains selectable, real text content is present in DOM, focus rings are visible, no letter-by-letter effect for paragraphs.

### Palette
| Token | Value | Purpose |
|---|---|---|
| Forest ink | #161915 | Premium architectural background |
| Limestone | #E9E6DC | Editorial reading surface |
| Aged brass | #C4AB82 | Selective focus accents |
| Sage | #AAB39D | Material chapter |
| Deep evergreen | #192019 | Studio chapter |
| Pale linen | #F5F1E8 | Contrast on imagery |

### Signature motion
- Hero type revealed in two masked chapters; one single short Arabic handwriting reveal in the kicker.
- Cinematic, cross-fading ambient architectural scenes. User chooses; no unsolicited endless scene changes.
- Asymmetric project archive with image zoom only when requested; project tiles link to full case-study pages with 16-frame visual atlases, keyboard-accessible lightbox and drawing export.
- Material palette buttons update real swatches and rationale.
- Custom original SVG plans, furnishings, dimensions, daylight and circulation layers, elevations, sections and isometric volume studies without requiring WebGL. A range scrubber animates between the same 2D plan geometry and its derived massing.
- The site retains native scrolling, supports reduced motion, and avoids cursor hijacking or splash screens.

### Detailed technical portfolio
- Six dedicated pages at `project.html?case=<slug>`; 16 frames per project (10 diagram states, 6 photographic references), with individually named, filterable, full-screen frames.
- Geometry varies per fictional brief, but all plan-to-space transformations derive from that brief's same core coordinate set.
- A browser-exportable SVG concept drawing is provided for demonstration; **not a DWG, AutoCAD production drawing or code-compliant architectural detail**.
- Supporting research: [CASE_STUDY_RESEARCH.md](CASE_STUDY_RESEARCH.md).

### Case-study integrity
All six case studies are explicitly **fictional concepts**. The photos are *reference photography*, not owned renders, not depictions of actual Rehab Haider commissions. Dimensions and locations are illustrative study metadata. **Do not claim constructed buildings, years of experience, licenses, genuine client reviews, awards, team credentials or project results** unless independently documented. Original plans / circulation overlays are schematic design illustrations, not buildable construction drawings.

For a real architect's commercial website, replace these with the architect's authenticated portfolio, accurate drawings and renderings, her explicit role/credits, credentials, license information if applicable, business contacts and disclosures, and fully licensed imagery. Preserve the visual system and interaction patterns.

### Handoff
Static files remain in \`apps/atelier-08/\` to preserve the existing Cloudflare Pages project root. No build step, paid animation libraries or GitHub Actions are used. The inquiry builder creates a local copyable note, not a fake backend submission. A working contact endpoint or business email/WhatsApp must be configured for production.

### Research basis
- [Foster + Partners](https://www.fosterandpartners.com/) — searchable depth and project breadth.
- [BIG](https://big.dk/) — architecture explained through media and diagrams.
- [Snøhetta](https://snohetta.com/) — integrated studio story and editorial publishing.
- [OMA](https://www.oma.com/) — architecture and research as parallel content.
- [Colorlib — Architecture portfolios (2026)](https://colorlib.com/wp/architecture-portfolios/) — drawings and role attribution in real portfolios.
- [Whitelam — Architecture firm sites (2026)](https://whitelam.media/insights/best-architecture-firm-websites-2026) — filtering, performance and contact clarity.
- [Nakada — Architecture firms (2026)](https://nakadadesign.com/stories/25-best-architecture-firm-websites-2026) — project anatomy and photographic honesty.

These are design-study references; the implemented logo, copy, layouts and interactions are independently authored, not copied from the cited sites.

### QA outstanding
- Visual QA must be completed on the live Cloudflare Pages deployment (desktop 1440/1024, mobile 390/320, Safari and Chrome).
- Verify all remote image URLs. If an Unsplash image fails, replace it with a project-licensed image. The environment that produced the code has limited live-site browsing access.
- Measure Lighthouse mobile LCP, CLS, contrast and long-task timings. Ensure loaded external fonts fall back acceptably under slow networks.

## Current signature direction (October 2026)

The active concept rejects the prior cartoon-like WebGL demonstration. The live signature interaction is now **seven scroll-driven layers of real SVG architectural vector linework**, revealing the plot, walls, openings, furniture, light locations, dimensioning/annotations, elevation and section. The master concept grid is in house-config.js, and the actual SVG/DXF source is in cad-studio.js.

- A-101 ground-floor concept plan, A-201 courtyard elevation, A-301 section and A-401 four schematic junction studies.
- Direct .dxf download from the site; browser can also export at a requested 3840×2160 resolution.
- Native scroll, zoomable 100%–400% drawing lightbox and a reduced-motion static presentation.
- The first courtyard concept has a coherent shared plan envelope; **reference photos are separate** and are NOT the executed/photoreal results of the exact floor plan.
- The research file OPEN_SOURCE_TOOL_REVIEW.md catalogues 135 candidates, **not** 135 individually installed/tested tools; previous procedural 3D work was retired.

Release blockers: real owner's approved project files, truthful project credits, verified imagery, professional checking of technical details, actual business contacts and live desktop/mobile browser QA.
