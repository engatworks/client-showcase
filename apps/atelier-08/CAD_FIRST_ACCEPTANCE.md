# Rehab Haider — CAD-first rebuild (implementation contract)
**Branch:** feat/rehab-cad-first-20261022  
**Production:** unchanged until visual and technical sign-off.

## What this fixes
The current demonstration uses hand-built SVG illustrations and synthetic drawings.
That cannot be represented as AutoCAD-produced professional documentation.
A real CAD-first vertical slice must succeed **before** migrating the entire portfolio
to React or adding a WebGL effect.

## First deliverable / vertical slice
A demonstrative residential **architectural documentation sheet**, with:
- a consistent model in explicit real-world units;
- geometrically cut door/window apertures, wall intersections and openings;
- proper dimension entities derived from the geometry, not disconnected labels;
- separate layers for walls, openings, grids, annotations and dimensions;
- a correctly configured A1 or A2 paper-space layout and fixed plot scale;
- explicit non-construction / fictional-study labeling;
- source model and sensitive survey data *excluded* from the public Pages bundle;
- a raster/PDF view-only derivative suitable for the website;
- a technical QA checklist and visual inspection in a CAD-compatible application.

**Acceptable:** ezdxf for DXF authoring + LibreCAD/QCAD for independent inspection,
or FreeCAD TechDraw for parametric coordination. A real client drawing should only
be shown if Rehab approves a redacted derivative. No real-site coordinates by default.

## Website implementation after CAD sign-off
- Keep GitHub as source of truth and the existing Cloudflare Pages integration.
- GSAP ScrollTrigger and text animation for name drop, masks and typographic reveal;
  animate Arabic as whole words, preserving readable shaping.
- Three.js / React Three Fiber for a single meaningful 3D interaction *only if*
  source geometry and device performance justify it.
- No full-page scroll hijacking, pointless scene controls or fake CAD line art.
- Desktop/mobile browser screenshots, functional navigation, accessibility,
  reduced-motion, font fallback and device-performance checks required.
- No Figma, paid plugins, Cloudflare account access or Blender MCP required to begin.

## Release gates
1. CAD authoring tool opened and verified the drawing; no overlaps, fictitious claims
   of approval or arbitrary annotation.
2. Units, room positions, wall openings, drawing scale and title block checked.
3. Zero proprietary editable source files in the publicly served directory, and
   zero private geometry embedded in JS/SVG/GLB.
4. English and natural Sudanese-friendly Arabic inspected by a human.
5. Four viewport screenshots (desktop/mobile × Arabic/English), no horizontal
   overflow, clean working motion with reduced-motion fallbacks.
6. Cloudflare production deployment checked live; GitHub commit alone is not proof.

The existing public SVG work is not accepted as passing these gates.
