# Rehab Haider — technical release verification
Date: 2026-10-19

This document is **not** a certificate of professional architectural validity or a live browser audit.

## Confirmed in GitHub source

- Arabic RTL landing and six deep project cases all present.
- Five JS assets compile under a JavaScript syntax evaluator: main.js, project.js, cad-studio.js, cad-journey.js and house-config.js.
- All six cases generated 16 case-study atlas frames each in a mocked JavaScript document environment.
- All nine major technical drawing modes generate SVG (plan, furnishing, zoning, circulation, lighting, dimensioned drawing, elevation, section and details).
- Seven stage tabs and scroll-driven CAD drawing initialized successfully in the simulated DOM.
- Fullscreen drawing viewer supports 100–400% magnification, keyboard-accessible controls and native browser interaction.
- ASCII CAD DXF is included as a static .dxf in the Pages root. In-process test generated 242 editable CAD entities across 14 semantic layers (walls, glazing, furniture, lighting, elevation, section, schematic junctions, etc.).
- Courtyard source model defines an 18 × 14 metre conceptual envelope. A site-plan QA pass moved planting outside the reflecting pool and separated a window-glazing segment from its neighboring doorway.
- The homepage CAD controls use the same REHAB_CAD source as the detailed project case.
- The retired, cartoon-like Three.js house assembly file and its associated visible markup and stylesheet were removed from the site. No 3D/WebGL library is loaded.
- Unsplash images request responsive sizes on desktop/mobile; high-resolution CAD export is on-demand rather than eager page weight. SVG linework stays sharp at any zoom.
- Built-in inquiry form generates a copyable draft locally rather than pretending to send business email.
- Cloudflare Pages-oriented _headers, sitemap and robots metadata were committed.

## NOT verified

- Live Cloudflare production deployment: the Pages domain was blocked from the assistant's browsing environment. New commits are on main, but their deployment success remains unconfirmed. The GitHub combined status endpoint returned no statuses, which does NOT establish a successful deploy.
- Actual rendered visuals on Chrome, Firefox, Safari and Android/iOS; screenshot comparison, mobile overflow and actual interaction testing remain to be performed.
- Performance: real Lighthouse/LCP/CLS numbers or low-end phone frame rates are not measured.
- Every third-party Unsplash URL currently returns an image.
- The accuracy of the architectural CAD as a real project: these are **conceptual illustrations**. There is no engineer's certification, municipal approval, true DWG source from Rehab, site-survey coordination, scaled construction detailing, MEP coordination or as-built verification.
- Photos matching the CAD design: the six mood-reference photographs belong to unrelated source photographs and **must not** be presented as after-construction pictures.
- Contact endpoint and owner-approved marketing details: not provided, so the inquiry form intentionally sends nothing.

## Required before using as Rehab's real business portfolio

1. Obtain and attribute her actual CAD project samples and approved public drawing packages.
2. Replace fiction/reference media with renderings from the same true geometry, or verified photos of the built project, and record media rights.
3. Get design professional review of real dimensions, openings, structural, electrical and material detail specifications.
4. Supply her actual business contact and authorization for the brand/biography and service descriptions.
5. Review Cloudflare latest deployment and visually test 360, 390, 768, 1024, 1440 px, keyboard, reduced-motion and low-bandwidth/slow CPU conditions.

Current classification: **substantial technical architecture portfolio DEMO committed to GitHub; not yet a certified finished commercial property or live browser QA pass**.
