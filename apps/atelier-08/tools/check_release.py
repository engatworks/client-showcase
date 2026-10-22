#!/usr/bin/env python3
"""Static QA for the Rehab Haider bilingual portfolio. No third-party packages."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
SLUGS = ("courtyard", "material", "monolith", "urban", "quiet", "open")
PAGES = [ROOT / "index.html", ROOT / "en/index.html"]
PAGES += [ROOT / "projects" / (slug + ".html") for slug in SLUGS]
PAGES += [ROOT / "en/projects" / (slug + ".html") for slug in SLUGS]
problems = []

class Reader(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.urls = []
        self.h1 = 0
        self.imgs = 0
        self.html_lang = None
        self.html_dir = None
        self.alternates = set()
        self.canonical = False
        self.css_v5 = False
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html":
            self.html_lang, self.html_dir = a.get("lang"), a.get("dir")
        if "id" in a:
            if a["id"] in self.ids:
                problems.append("duplicate ID: " + a["id"])
            self.ids.add(a["id"])
        if tag == "h1":
            self.h1 += 1
        if tag == "img":
            self.imgs += 1
            if "alt" not in a:
                problems.append("image missing alt")
        if tag == "link":
            if a.get("rel") == "canonical":
                self.canonical = True
            if a.get("rel") == "alternate":
                self.alternates.add(a.get("hreflang"))
            if any(("portfolio.css?v=" + v) in a.get("href", "") for v in ("5", "6")):
                self.css_v5 = True
        for attr in ("href", "src"):
            if a.get(attr):
                self.urls.append(a[attr])
        if a.get("srcset"):
            self.urls.extend(e.strip().split()[0] for e in a["srcset"].split(","))

for page in PAGES:
    if not page.is_file():
        problems.append(str(page.relative_to(ROOT)) + ": missing page")
        continue
    text = page.read_text(encoding="utf-8")
    reader = Reader()
    before = len(problems)
    reader.feed(text)
    expected = ("ar", "rtl") if page.parts[-2] != "en" and "en" not in page.relative_to(ROOT).parts else ("en", "ltr")
    if (reader.html_lang, reader.html_dir) != expected:
        problems.append("wrong lang/dir, expected " + str(expected))
    if reader.h1 != 1:
        problems.append("expected exactly one h1")
    if reader.imgs < 1:
        problems.append("no photography")
    if reader.alternates != {"ar", "en", "x-default"}:
        problems.append("language alternates incomplete")
    if not reader.canonical or not reader.css_v5:
        problems.append("missing canonical or new CSS version")
    for link in reader.urls:
        parts = urlsplit(link)
        if parts.scheme or parts.netloc or link.startswith("//") or link.startswith("mailto:") or link.startswith("tel:"):
            continue
        target = (page.parent / parts.path).resolve() if parts.path else page
        if not target.is_relative_to(ROOT.resolve()):
            problems.append("path escapes site: " + link)
            continue
        if not target.is_file():
            problems.append("broken local reference: " + link)
            continue
        if parts.fragment and target.suffix == ".html":
            if "id=\"" + parts.fragment + "\"" not in target.read_text(encoding="utf-8"):
                problems.append("unresolved fragment: " + link)
    home = page == ROOT / "index.html" or page == ROOT / "en/index.html"
    if home and (text.count('class="work-card work-card--') != 6 or 'class="editorial-cover"' in text):
        problems.append("homepage portfolio index unexpectedly changed")
    if home and not all(t in text for t in ('class="hero cinematic-hero"', 'class="cinema-interlude"', 'class="manifesto"', 'id="work"', 'id="about"')):
        problems.append("missing editorial homepage sections")
    if home and not all(t in text for t in ('data-typed', 'class="living-band"', 'data-cad-build', 'data-cad-paper="site"', 'data-cad-paper="plan"', 'data-cad-paper="lighting"', 'data-drafting-sheet="site"', 'data-drafting-sheet="lighting"', 'living-motion.js?v=1', 'living-motion.css?v=1', 'drafting-exhibits.js?v=1', 'drafting-exhibits.css?v=1', 'cad-studio.js', 'house-config.js')):
        problems.append("missing live motion or authentic CAD render hooks")
    if home and any(t in text for t in ('data-scene-button', 'class="cinema-diagram"', 'class="atelier-drawing"')):
        problems.append("retired scene buttons or faux drafting illustration returned")
    if home and text.count('class="drafting-work-preview"') != 0:
        problems.append("unexpected duplicate drafting thumbnail")
    if home and text.count('class="work-media drafting-work-preview"') != 4:
        problems.append("expected four drafting-led card previews")
    if home and text.count('data-drafting-sheet=') < 6:
        problems.append("drawing previews or site sheets missing")
    if home and text.count('class="cinema-scene') < 3:
        problems.append("cinematic photo scenes missing")
    if re.search(r'href="[^"]+\\.dxf(?:[?#][^"]*)?"', text, flags=re.I):
        problems.append("editable DXF source link must not be published")
    if "drafting" in page.as_posix() and "download" in text:
        problems.append("unexpected downloadable content in drafting")
    new_problems = problems[before:]
    print(f"{page.relative_to(ROOT)}: " + ("FAIL " + "; ".join(new_problems) if new_problems else "OK"))

css = (ROOT / "portfolio.css").read_text(encoding="utf-8")
if css.count("{") != css.count("}") or "CINEMATIC EDITION / FRAMED BY LIGHT" not in css:
    problems.append("CSS layer invalid or absent")
if not (ROOT / "gallery.js").is_file():
    problems.append("gallery.js is missing")
if not (ROOT / "living-motion.js").is_file():
    problems.append("living-motion.js is missing")
if not (ROOT / "living-motion.css").is_file():
    problems.append("living-motion.css is missing")
if (ROOT / "rehab-haider-courtyard-concept.dxf").exists():
    problems.append("public editable DXF file must not be shipped")
if not (ROOT / "drafting-exhibits.js").is_file() or not (ROOT / "drafting-exhibits.css").is_file():
    problems.append("read-only drafting gallery assets are missing")
if not (ROOT / "house-config.js").is_file() or not (ROOT / "cad-studio.js").is_file():
    problems.append("DXF source geometry or CAD renderer is missing")
if problems:
    print("\nRelease QA FAILED:", len(problems), "issues")
    for p in problems:
        print(" -", p)
    sys.exit(1)
print("\nPASS — 14 bilingual pages, local routes/assets, anchors and release styles validated")
