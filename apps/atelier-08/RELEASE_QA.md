# Rehab Haider — simple portfolio release QA

Date: 19 October 2026
Source release: 7e74c6197219724c565ce0dd6139043c6814acc5

Cloudflare Pages reported successful deployment of this exact commit. The main production origin https://atelier-08-demo.pages.dev/ was then opened and the new layout verified in the browser.

## Verified

- Live homepage displays the new light portfolio, six cards and local WebP images.
- All six legacy project query routes resolve to their corresponding new static project pages; each displays its correct title and two gallery images.
- All tested project pages have no horizontal overflow at the desktop browser viewport.
- First and second image enlargement work. Close button and Escape dismissal work. Focus returns to the image link.
- Homepage image loading was checked against actual decoded browser images, not only URL presence. Courtyard and shadow-house gallery images were also confirmed decoded.
- Source checks: one H1 per page; every relative image, script, stylesheet and navigation target exists; viewer and redirect JavaScript pass syntax checks.
- Removed all animated drawing and comparison interfaces from the active pages.

## Limits

Responsive CSS is implemented, but a physical mobile device or resized mobile browser viewport was not tested in this session. No Lighthouse or measured performance score is claimed. The six concepts are fictional and the photographs are independent reference images; this is not a verified commercial work portfolio. Actual approved project media and contact information were not available.

The previous CAD-heavy release QA has been superseded by this document. Legacy drawing files remain unused in the source repository.
