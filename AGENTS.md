# AGENTS.md - Repository Guide for Coding Agents

This repository is a small static site (HTML/CSS/vanilla JS) with a cyberpunk/hacker terminal aesthetic. There is no build system, package manager, linting, or test framework configured. Follow the guidance below to keep changes consistent with existing patterns.

## Project Layout

- `index.html`: Main guide page with AI‑empowerment content and verification framework.
- `forge.html`: Prompt Forge interactive tool for building structured prompts.
- `assets/css/styles.css`: Shared styles with CSS custom properties (design tokens).
- `assets/js/forge.js`: Prompt Forge behavior (real‑time preview, clipboard, persistence).
- `assets/favicon.svg`: Cyberpunk favicon.
- `README.md`: Project documentation (architecture, design system, usage).
- `AGENTS.md`: This file.

## Build / Lint / Test Commands

**No build, lint, or test scripts are configured in this repository.**

### Previewing Changes Locally

To view the site, run a static file server:

```bash
python -m http.server 8000
```

Then open:
- `http://localhost:8000/index.html`
- `http://localhost:8000/forge.html`

### Single Test Guidance

- No test runner is configured. There are no unit/integration tests to run.
- Do not introduce test tooling unless explicitly requested by the user.
- Manual verification consists of opening the HTML files in a browser and checking functionality.

## Development Workflow

1. Make changes directly to HTML, CSS, or JS files.
2. Preview with a static server (see above).
3. Verify the cyberpunk theme (green‑on‑black, sharp edges, scanline overlay).
4. Ensure responsiveness by resizing the browser window.
5. Check accessibility (semantic HTML, label‑for associations, keyboard focus).

## Code Style Guidelines

### General

- Keep changes minimal and scoped to the requested feature.
- Prefer readable, declarative HTML/CSS/JS over heavy abstraction.
- Avoid introducing external dependencies unless explicitly requested.
- Follow existing patterns in each file.

### Formatting

- Indentation: 2 spaces for HTML, CSS, and JS.
- Line width: keep lines readable; break long lines as needed.
- Semicolons: required in JavaScript.
- Trailing commas: only when already present in multi‑line JS literals.
- Quotes: double quotes for HTML attributes, single quotes for JavaScript strings.

### HTML

- Use semantic tags where possible (`header`, `main`, `section`, `footer`).
- Keep class names descriptive and kebab‑case (e.g., `preview-window`).
- Attribute order follows existing files: `class`, `id`, `href`, `for`, etc.
- Avoid inline styles; place styles in `assets/css/styles.css`.
- Ensure every form input has a matching `label` with `for` attribute.

### CSS

- Structure: design tokens first (`:root`), then global styles, then component styles.
- Indentation: 2 spaces, one declaration per line.
- Selectors: keep them simple; avoid over‑specificity.
- Variables: use CSS custom properties (e.g., `var(--primary)`).
- Effects: use `rgba()` or `oklch()` for glow effects.
- Transitions: apply `transition` on the base selector, not `:hover`.
- Group related selectors together; separate sections with comments.
- Place `@media` queries at the bottom of the file.

### JavaScript

- Variables: use `const` and `let`; avoid `var`.
- Naming: `camelCase` for variables and functions.
- Functions: keep them small and single‑purpose (e.g., `updatePreview`, `copyPrompt`).
- DOM: prefer `textContent` over `innerHTML` unless markup is required.
- Input handling: guard for empty inputs with `.trim()` when building output strings.
- Events: attach listeners with `addEventListener`; avoid inline `on*` attributes.
- Async/await: use for clipboard operations with proper error logging.
- Storage: localStorage keys should be namespaced (e.g., `forge-persona`).

### Imports and Modules

- No bundler is used; avoid module syntax (`import`/`export`) in browser JS.
- Keep scripts in `assets/js` and load them with the `defer` attribute.
- The only external dependency is Google Fonts (JetBrains Mono, Share Tech Mono).

### Naming Conventions

- CSS classes: kebab‑case (e.g., `protocol-table`, `preview-window`).
- JavaScript IDs: camelCase to mirror DOM IDs (e.g., `previewContent`, `copyButton`).
- Files: lowercase with hyphens for assets; root HTML uses clear names.

### Error Handling

- Log recoverable browser errors to `console.error`.
- Do not silently ignore clipboard or DOM errors.
- Provide reasonable fallbacks for browser APIs (clipboard, etc.).
- Use `try`/`catch` for async clipboard operations.

### Accessibility

- Ensure form inputs have matching `label` + `for` attributes.
- Preserve keyboard focus styles unless explicitly redesigning them.
- Keep contrast high in dark theme changes.
- Use semantic HTML and proper heading hierarchy.

## Theme Consistency

The site uses a cyberpunk/hacker terminal aesthetic. Maintain these visual characteristics:

- Background: pure black (`#000000` / `oklch(0 0 0)`).
- Primary color: bright terminal green (`#22c55e` / `oklch(0.8348 0.1302 160.9080)`).
- Fonts: `JetBrains Mono`, `Share Tech Mono`, monospace.
- Borders: sharp edges (`--radius: 0rem`).
- Glow effects: neon green shadows (`rgba(34, 197, 94, 0.2)`).
- Scanline overlay: subtle (`opacity: 0.08`) linear gradient.
- Hover states: green glow and slight upward translation.

When adding new components, reuse existing CSS custom properties and follow the same glow/transition patterns.

## Responsive Design

- Layout uses CSS Grid and Flexbox.
- Breakpoints defined at `max-width: 768px` (mobile) and `max-width: 1024px` (tablet).
- On mobile, grid cards stack into a single column and spacing adjusts.
- Textareas and preview windows adjust height and max‑height appropriately.
- Keep scanline overlay and glow effects intact across screen sizes.

## Browser Compatibility

- Target modern browsers with support for CSS Grid, Flexbox, and CSS custom properties.
- Clipboard API is used with async/await; provide fallback logging if it fails.
- No polyfills are included; avoid features that lack broad support (e.g., `:has()`).

## Performance Considerations

- No heavy JavaScript libraries; keep scripts lightweight.
- CSS animations are GPU‑accelerated (transforms, opacity).
- Google Fonts are loaded via `@import`; do not add additional font files.
- Images are not used; avoid introducing large assets.

## Cursor / Copilot Rules

- No `.cursorrules` or `.cursor/rules/` files found.
- No `.github/copilot-instructions.md` found.

If any of these files are added later, ensure their rules are applied and summarized here.
