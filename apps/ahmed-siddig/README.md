# Ahmed Siddig — THE SIGNAL / Director’s Cut 3

A separate, static, interactive electrical and electronics engineering portfolio for Ahmed Siddig.

## Live site source
This folder is designed as an **independent Cloudflare Pages root** (`apps/ahmed-siddig`). Its presence in `client-showcase` does not automatically make it accessible on `atelier-08-demo.pages.dev`, which builds from `apps/atelier-08`.

Set up a **second** Pages project connected to the same GitHub repository, with production branch `main`, root directory `apps/ahmed-siddig`, build command `exit 0`, and build output directory `.`. Do not change the existing Rehab Haider deployment settings.

## Technical highlights
- Dependency-free procedural WebGL 2 electrical control cabinet, with drag interaction, physical/exploded/schematic modes and accessible SVG fallback.
- Scene-directed sticky opening and continuous animated electrical current threaded through multiple page sections.
- Full project case study for the 2025 ESP32 / MAX30102 solar heart-monitoring prototype.
- Interactive ideal DC circuit lab showing Ohm's law and power.
- New interactive balanced three-phase laboratory with selectable waveforms and phasors; calculate line current, apparent/reactive power and lag angle from line-line voltage, kW and power factor.
- Separate Blender Python model source + procedural GLB asset. **The live WebGL model is procedural and not loaded from the GLB**; the GLB is supplied as an editable 3D starting point.
- Responsive UX, semantic HTML and reduced-motion/low-GPU fallbacks, internal pages and local resources.

## Accuracy and limitations
Engineering diagrams and calculation tools are **educational approximations**, not certified CAD documents or operating instructions. The internship and technician roles are distinguished as such; university project details follow the user's CV. Photos, confidential client installation files and performance data have not been invented. The public model is conceptual rather than a physical replica of a real cabinet. No promises of professional approval or ratings are implied.

## Local preview
Run `python3 -m http.server 8000` from this directory and visit `http://localhost:8000/`. No build dependencies required.

## QA
Run `python3 tools/check_site.py`. Optionally use Playwright with Chromium for responsive screenshots, interaction checks and WebGL support testing on your device. A successful source commit does not prove a Cloudflare deployment or hardware rendering.