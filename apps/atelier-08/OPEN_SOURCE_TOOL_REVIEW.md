# Rehab Haider — open-source architecture + web-motion research
**NOTE — HISTORICAL TOOL SELECTION STUDY:** The initial Three.js implementation documented below has been **retired and removed** because it did not meet the user's architectural realism standard. The active implementation is native-scroll + canonical SVG/CAD geometry and R12 DXF export with no WebGL. Tool counts are candidates researched, not products installed or individually benchmarked.

**Research working inventory:** 135 named candidates across 6 categories, compiled 2026-10-19.
**Important distinction:** This is a *catalogue and relevance triage*, NOT 135 individually installed, benchmarked, license-audited or security-reviewed projects. Some products have open-source cores and separately licensed add-ons; verify the **exact version/feature license** before use. Only the implemented tools listed below are present in this site.

## Sources actually examined
1. [Curated 3D web tooling: engines, viewers, shaders, glTF optimization](https://github.com/ahmettasdemirusa/awesome-3d-web) — a useful index, NOT independent verification of every item.
2. [Three.js official libraries and plugins](https://threejs.org/manual/pages/libraries-and-plugins)
3. [Awesome Three.js projects](https://github.com/AxiomeCG/awesome-threejs)
4. [Awesome WebGL](https://github.com/sjfricke/awesome-webgl)
5. [Awesome Web Animation](https://github.com/sergey-pimenov/awesome-web-animation)
6. [An open-source architecture self-assembly agent skill](https://github.com/lhlGitHub/threejs-architecture-effects) — practical principles: build finished silhouette first; stagger frame, walls, eaves/material layers; deterministic scrub.
7. [Three.js official documentation](https://threejs.org/docs/) — renderer, geometry, physically-based materials, shadows and scene API.
8. [Community critique of scroll-driven 3D](https://www.reddit.com/r/webdesign/comments/1vd4hcq/we_built_a_scrollanimated_3d_website_in_threejs/) — navigational confusion and empty scroll stretches on mobile.
9. [Community discussion of an integrated 3D watch product page](https://www.reddit.com/r/threejs/comments/1w46h5f/this_is_probably_one_of_the_more_interesting_uses/) — using model motion as storytelling, not as a detached viewer.
10. [ComfyUI architecture workshop](https://www.reddit.com/r/comfyui/comments/1u13ayk/confyui_in_architectural_visualization/) — preserve geometry through ControlNet, inpainting and detail enhancement.
11. [Official ComfyUI ControlNet guide](https://github.com/Comfy-Org/workflow_templates/blob/main/site/knowledge/concepts/controlnet.md)
12. [Open CAD / geometry kernel for AEC](https://github.com/Gimsphil/opencad) — experimental; IFC, STEP and geometry work should remain an engineering workflow, not a promo animation dependency.
13. [Arabic architect example — TAM](https://tamarch.com/ar/) — architectural drawings, service scope and AutoCAD project downloads.
14. [Codrops scroll/mask animation ideas](https://tympanus.net/codrops/tag/scroll/)

## 1. Tool candidate inventory: 135 names
These are *candidates surfaced or derived during research*, not individually validated recommendations. Being named does NOT mean it has acceptable licensing, maintenance or performance for this specific client. Features and eligibility need separate tests.

### 1. Browser 3D, AR and scene engines (20 candidates)
01. three.js
02. Babylon.js
03. PlayCanvas Engine
04. OGL
05. regl
06. A-Frame
07. CesiumJS
08. deck.gl
09. xeokit-sdk
10. iTowns
11. React Three Fiber
12. Drei
13. Threlte
14. TresJS
15. @react-three/xr
16. @react-three/uikit
17. troika-three-text
18. model-viewer
19. Pannellum
20. Photo Sphere Viewer

### 2. Animation, scroll, transitions (23 candidates)
01. GSAP Core
02. Theatre.js
03. anime.js
04. Motion One
05. Popmotion
06. react-spring
07. Motion/Framer Motion
08. Velocity.js
09. mo.js
10. lottie-web
11. flubber
12. d3-transition
13. scrollama
14. ScrollMagic
15. lax.js
16. AOS
17. Lenis
18. Barba.js
19. Swup
20. AutoAnimate
21. Typed.js
22. Splitting.js
23. Vivus.js

### 3. 3D format, rendering, optimization, diagnostics (24 candidates)
01. glTF-Transform
02. gltfjsx
03. meshoptimizer
04. Draco
05. KTX-Software
06. glTF Validator
07. glTF Sample Viewer
08. glTF-Blender-IO
09. Assimp
10. Open3D
11. MeshLab
12. Trimesh
13. three-mesh-bvh
14. three-bvh-csg
15. three-gpu-pathtracer
16. postprocessing
17. react-postprocessing
18. three-custom-shader-material
19. LYGIA
20. stats.js
21. Spector.js
22. lil-gui
23. r3f-perf
24. Babylon Inspector

### 4. CAD, AEC/BIM, parametric modeling and diagrams (28 candidates)
01. FreeCAD
02. LibreCAD
03. QCAD Community Edition
04. Blender
05. Bonsai BIM
06. IfcOpenShell
07. Speckle
08. web-ifc
09. web-ifc-three
10. That Open Fragments
11. That Open Components
12. xeokit BIM Viewer
13. Open CASCADE Technology
14. opencascade.js
15. replicad
16. CadQuery
17. JSCAD
18. OpenSCAD
19. Maker.js
20. SVG.js
21. Paper.js
22. Konva.js
23. Fabric.js
24. ezdxf
25. Gmsh
26. BIMserver
27. IFChili
28. Gimsphil Open CAD

### 5. AI, condition-guided visualization, segmentation (21 candidates)
01. ComfyUI
02. Diffusers
03. AUTOMATIC1111 Stable Diffusion WebUI
04. InvokeAI
05. ControlNet
06. comfyui-controlnet-aux
07. Depth Anything
08. Depth Anything V2
09. Segment Anything
10. SAM 2
11. MiDaS
12. ZoeDepth
13. OpenPose
14. T2I-Adapter
15. IP-Adapter
16. Fooocus
17. InstantMesh
18. TripoSR
19. Hunyuan3D
20. ComfyUI-Manager
21. BlenderProc

### 6. QA, site framework, creative asset processing (19 candidates)
01. Playwright
02. Puppeteer
03. Lighthouse
04. axe-core
05. Pa11y
06. Vitest
07. ESLint
08. Prettier
09. Vite
10. Astro
11. Eleventy
12. Svelte
13. Vue
14. React
15. esbuild
16. Inkscape
17. GIMP
18. Krita
19. darktable

## 2. Decision matrix — the highest-signal tools actually compared for the project

| Tool | Main strengths | Cost/complexity | Decision |
|---|---|---|---|
| Three.js | Real browser 3D meshes, material control, camera, reusable model parts | Medium; WebGL and third-party module load | **IMPLEMENTED** for seven-stage scroll house assembly; pinned ES module version |
| Native sticky scroll + IntersectionObserver + requestAnimationFrame | Scroll position is always directly readable and reversible; accessible fallback | Very low | **IMPLEMENTED** instead of bespoke scroll hijack |
| Three.js PBR / CanvasTexture | Stone and plaster texture, real light/shadow and glazing | Moderate; need device optimization | **IMPLEMENTED** procedural materials |
| Native SVG diagrams | Crisp CAD-like schematics and floor-plan overlay from shared footprint values | Low | **IMPLEMENTED** concept drawings, not DWG |
| Codrops mask reveals / GSAP ScrollTrigger | Precise choreography, photo reveal and pinning | More JS, can interfere with normal scroll if overdone | **DEFERRED**: currently unnecessary for a sticky user-controlled 3D story |
| Theatre.js | Artist-authored camera and scene keyframes | Editor/runtime complexity | **FUTURE** for bespoke motion art direction and shot planning |
| React Three Fiber + Drei | Declarative component model, many optimized scene utilities | Requires React migration | **DEFERRED** while existing Cloudflare Pages project is no-build static |
| Blender + Cycles | Render photoreal stills/animations from a true modeling source | Requires asset production and camera/material art direction | **NEXT STEP** for genuine matching high-quality hero visualization |
| FreeCAD / IfcOpenShell / Bonsai | Open CAD/BIM source data; scales, levels, real geometry and interoperability | Expertise and file conversion needed | **NEXT STEP** when Rehab gives original DWG/PDF/IFC files |
| glTF-Transform + meshoptimizer | Compress imported 3D models for mobile | Build/asset optimization pipeline | **NEXT STEP** if real architectural GLB models are introduced |
| Open CAD (experimental) | Browser-native geometry operations, IFC/STEP ambition | Moving API / beta engineering | **NOT FOR CURRENT DISPLAY SITE** |
| Web-ifc / That Open | Interactive BIM models, model tree / classification / selection | Requires valid IFC input and integration | **FUTURE** for a genuine technical case study, not fabricated props |
| ComfyUI + ControlNet depth/line art | Geometry-conditioned architectural visual enhancement | AI hardware, model licensing, QA of geometry drift | **NOT RUN**; documented exact-geometry workflow below |
| Postprocessing / path tracing | SSAO, realistic reflections, polished renders | High GPU cost; mobile risk | **DEFERRED** until visual QA shows spare performance budget |
| Playwright + Lighthouse + axe-core | Browser viewport, screenshot, performance, accessibility tests | No frontend runtime cost | **QA PLANNED**, not yet run on live deployed site |

## 3. What was actually implemented in the current source

- `assembly.js`: procedural Three.js scene, pinned `three@0.180.0` ES module.
- A single `H` footprint object defines dimensions for the architectural plan overlay and 3D footprint (18×14 nominal design units).
- Separate stages for terrain, foundation/slabs, columns/beams, exterior + glazing, roofing/upper volume, timber louvers + pool + furnishings, landscaping and lights.
- Stone micro-noise CanvasTextures, PBR material settings, directional sunlight, shadows, glass and wood detailing.
- Native page scroll drives deterministic stage reveal and camera repositioning, with a seven-stop navigation and visible progress.
- Reduced-motion condition is observed, and mobile pixel ratio/shadow quality is reduced.
- A PNG screenshot button captures the rendered model; this is a **concept visualization**, NOT a photo of a real building.
- `project.html?case=courtyard` uses the building module; other projects do not misleadingly show the same model.

## 4. AI-assisted architecture images: geometry must be authoritative

**Actual execution status:** no AI generator or ComfyUI workflow was run in this chat. It is documented for a later asset production pass.

Preferred workflow:
1. Start from Rehab's authentic DWG/BIM drawings, confirm dimensions and rights, or create an explicit fictional plan.
2. In Blender/FreeCAD, model actual walls/openings/roof/doors/landscape and fix a **single camera pose**.
3. Produce from that exact geometry: clay render, RGB render, line-art edge pass, depth map, normal pass, mask/segmentation IDs.
4. In ComfyUI, feed **depth + line-art** guidance to ControlNet (plus optional image reference for material direction). Request *material and lighting enhancement only*, not new plan geometry. Use a locked seed and fixed camera.
5. Use inpainting on selected masked materials, not global uncontrolled regeneration. Review geometry changes against silhouette / edges / facade openings.
6. Render a higher-fidelity final view in Blender Cycles (or strict geometry-conditioned AI enhancement with manual QA), then compare side-by-side to the actual 3D source. Never call an AI visualization a real completed building.
7. Export aligned plan, axon, daylight, exploded assembly, final render and legitimate construction/snapshot photos only if the project was actually built.

**Practical architectural AI prompt (geometry-conditioned, not stand-alone text-to-image):**

> Photoreal editorial visualization of the supplied architectural model, modern Gulf courtyard residence. PRESERVE the source camera, building silhouette, floor heights, slab extents, every window and door opening, structural columns, courtyard opening and terrace geometry exactly as in the supplied line-art and depth maps. Refine only PBR limestone texture, warm timber screen material, low-reflection glazing, realistic landscaping details inside the existing planter boundaries, and soft late-afternoon physical sunlight. Architectural photography, disciplined restrained color palette, physically plausible materials, natural light falloff, no stylization, no added structures. The result must be a render of precisely this source building.

**Negative constraints:** no changed layout, no extra windows, no missing columns, no invented floors, no reshaped roof, no moved camera, no distorted facade, no duplicated trees, no illustration/cartoon/anime style, no inflated color grading, no fake built-work caption.

**QA acceptance gate:** compare source and enhanced output using registered edges/opening rectangles and depth. If facade geometry differs, reject the enhancement; the text prompt alone is not a geometry guarantee.

## 5. Remaining blockers to a real commercial architectural portfolio

- Need Rehab's **actual authored design files** if site is to portray her own work; replace invented concepts with authorized real source.
- Need modeled and rendered images from that same geometry, or actual verified built photographs for a legitimate "drawing → built" case.
- Need visual device QA on deployed Pages URL; commits alone do not prove rendered appearance.
- Need legally cleared brand name, actual business contact details and user-approved bio, licensing and privacy practices.
- Need provenance/license checks for all remotely loaded media and third-party code.
