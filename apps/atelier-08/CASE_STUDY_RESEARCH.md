# Rehab Haider — case-study research and implementation notes
Date: 2026-10-19
Project: Arabic-first architect's portfolio in apps/atelier-08

## What was actually inspected

This research focused on **specific published pages, published case studies, documentation and community critiques**. It is not a claim that hundreds of live portfolios were interactively tested. The wider 215-unique-name discovery index remains in the root RESEARCH.md.

### Arabic architectural practice — TAM Architecture
- Home: https://tamarch.com/ar/
- Project archive: https://tamarch.com/ar/أعمالنا/
- Individual project with documentation: https://tamarch.com/ar/مبادرة-المهندس-مساعد-القفاري/

The individual project presents a designed building with **PDF project file, AutoCAD plan download, 3D SketchUp download, exterior video, facade images, interior images, area and location**. This is the closest useful Arabic precedent for Rehab's technical drawing strength. It demonstrates why a detailed project should include *artifacts* and not merely an architectural photograph. The Rehab demo implements the project structure and a 16-frame original SVG concept atlas, but has **NO DWG/PDF/SketchUp originals**; those require actual files and rights from Rehab.

### Arabic interior design service journey — PAVO
- https://pavo.com.sa/

Their service journey explicitly covers site survey, 2D/3D plans, detail drawings, specifications, project management, and delivery. Relevant principle: design expertise is credible when the client can understand **scope, drawings, process and expected outputs**. We translate that into annotated plans, a diagram-viewer, project specs and a clear case narrative without inventing qualifications or construction outcomes.

### Detailed architecture study vs photo dumps
- https://colorlib.com/wp/architecture-portfolios/
- https://whitelam.media/insights/best-architecture-firm-websites-2026
- https://nakadadesign.com/stories/25-best-architecture-firm-websites-2026

The useful patterns are technical drawings, honest work-role credits, browsable case studies, effective filtering and a direct contact path. We avoid fabricated project approvals, owner-of-work claims and invented testimonials.

### Motion prototypes inspected in published tutorials
- Codrops, "SVG Mask Transitions on Scroll" (2026):
  https://tympanus.net/codrops/2026/03/11/svg-mask-transitions-on-scroll-with-gsap-and-scrolltrigger/
  - useful: visual masks as a **narrative connection between information states**;
  - not copied: complex full-page pinned scroll mask, Lenis or extra GSAP dependency.
- Codrops, "Infinite GSAP Scroll Gallery with Parallax and Flip Transitions" (2026):
  https://tympanus.net/codrops/2026/07/30/building-an-infinite-gsap-scroll-gallery-with-parallax-and-flip-transitions/
  - useful: grid item → detail continuity and image-first presentation;
  - implementation: native links to deep case pages and browser-native cross-document View Transitions where supported.
- GSAP FLIP:
  https://gsap.com/docs/v3/Plugins/Flip/
  - conceptual reference for preserving continuity of visual objects through layout changes;
  - implementation: native CSS/browser transitions to preserve zero JS dependencies and free hosting.
- MDN View Transitions API:
  https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using
  - implemented: optional same-origin multi-page transition, static fallback, reduced-motion gate.
- GSAP ScrollTrigger:
  https://gsap.com/docs/v3/Plugins/ScrollTrigger/
  - assessed and *not* installed: it excels at pinning and scrubbing but isn't necessary for this case's native range scrubbing.

### User experience criticism inspected
- https://www.reddit.com/r/webdesign/comments/1x2n2xq/how_does_the_website_look_overall/
  - a 3D animation effect was reported janky on touch devices; pixelation felt ornamental.
- https://www.reddit.com/r/webdev/comments/1vvdyqq/whats_up_with_the_recent_increase_in_websites/
  - scroll-jacking and long animations before reaching the primary action were criticized.
- https://www.reddit.com/r/webdev/comments/1uvnzo6/i_am_under_the_impression_that_almost_every/
  - beautiful WebGL demo versus frustrating actual website navigation.
- https://www.reddit.com/r/webdev/comments/1wwhc8b/i_restyled_my_portfolio/
  - animated text that disappears while reading was a usability problem.

**Resulting interaction philosophy:** let users scrub only when they want to. Keep browser scroll native, user-controlled comparison and gallery filters, a clear back link, reduced-motion compliance and visible supporting text.

## Implemented architectural case-study anatomy

Each of six fictional cases has its own URL:
- project.html?case=courtyard
- project.html?case=material
- project.html?case=monolith
- project.html?case=urban
- project.html?case=quiet
- project.html?case=open

Each has **16 visual frames** (not 16 completed-building photographs):
1. Floor plan / 2D organization
2. Furniture layout
3. Zoning overlay
4. Circulation diagram
5. Daylight concept overlay
6. Dimensions (illustrative, not to construction scale)
7. Elevation
8. A–A section
9. Isometric massing from the plan geometry
10. Material study
11. Exterior / architectural reference photo
12. Exterior / facade reference photo
13. Light / interior reference photo
14. Material / interior reference photo
15. Detail reference photo
16. Atmospheric reference photo

Thus **6 × 16 = 96 user-selectable frames**, 60 original generated diagram frames and 36 remote mood-reference photographic frames. Actual photo URLs may repeat across project concepts or become unavailable. These are not evidence of built work.

## Signature features

- **From Plan to Space:** fullscreen-range scrubber over two vector states derived from **the same project geometry**, with no misleading 2D plan-to-unrelated-photo "built result" transition.
- **Technical mode buttons:** choose layout, furnishings, dimensions, circulation, daylight. Native range input is keyboard-accessible.
- **Plan export:** browser-downloadable SVG of currently selected mock drawing. This is NOT a DWG.
- **Drawing depth:** door arcs, conceptual windows, datum lines, north arrow, section marks, room labels, outer/internal wall geometry.
- **Elevation & section:** original SVG explanatory graphics.
- **Project Atlas:** 16 independently selectable frames per study, filterable diagrams/photos and a fullscreen viewer with arrow navigation.
- **Navigation continuity:** native multi-page View Transitions on supporting browsers, accessible normal navigation elsewhere.
- **Low dependency:** static files, no npm packages, no GSAP/Three.js bundle, no custom scroll replacement.

## Commercial launch checklist and constraints

For commercial use representing the actual architect, acquire and verify:
- Rehab Haider's permission for name, brand and project claims.
- Real PDF/DWG exports, elevations, sections and design documentation, with accurate attribution.
- Rendered perspectives or licensed photographs **corresponding to the same real project**, and permission to show them.
- Correct city, area, year, professional role, built/under-construction/concept status.
- Contact information, scheduling and privacy disclosures.
- Authorized logo/trademark clearance and localized Arabic copy review.

**Do not publish the demo reference photographs as if they show her work, or promote schematic SVG files as AutoCAD drawings.**

## Testing status
- Committed GitHub files exist and JavaScript passes static syntax checks.
- Mock DOM checks verified all 6 dynamic case-study models render 16 atlas cards each.
- Route slugs were compared against the homepage's six project records and matched.
- Real browser QA, visual screenshot comparison, viewport reflow and external photo availability remain unverified because the public Cloudflare Pages URL is blocked to this chat's browser.
- Test at 360, 390, 412, 768, 1024 and 1440 CSS pixels before production handoff.
