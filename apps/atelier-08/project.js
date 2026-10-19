'use strict';
const validCases = ["courtyard", "material", "monolith", "urban", "quiet", "open"];
const requested = new URLSearchParams(location.search).get('case');
location.replace(validCases.includes(requested) ? './projects/' + requested + '.html' : './index.html#work');
