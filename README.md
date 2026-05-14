# AI_GUIDE v2.0

A quick workflow for using AI without outsourcing your brain.

## Folder Structure

```
AI_GUIDE/
├── index.html              # Main page: Prompt Forge + collapsible reference drawer
├── guide.html              # Full standalone reference manual
├── forge.html              # Redirect to index.html (legacy bookmark support)
├── assets/
│   ├── css/
│   │   └── styles.css      # Shared styles (used by guide.html)
│   ├── js/
│   │   └── forge.js        # Legacy forge JS (new index.html uses inline JS)
│   └── favicon.svg         # Cyberpunk favicon
└── README.md               # This file
```

## Architecture

### Single-Page Focus
The Prompt Forge is the default landing (`index.html`). The educational reference material lives in two places:

1. **Collapsible drawer** (`index.html`) — triggered by a "?" button fixed at the bottom-right corner. Includes all reference sections in a native `<details name>` accordion (only one panel open at a time). A "→ VIEW FULL GUIDE" link in the drawer footer opens the standalone page.
2. **Standalone page** (`guide.html`) — full-page reference manual linked from the drawer footer, for deep reading.

### Navigation Flow
```
index.html (forge + drawer)  ←→  guide.html (full reference)
        ↑                              ↑
        └── forge.html (legacy redirect)
```

## Implementation Details

### Main Page (index.html)
- Self-contained single file (inline CSS and JS)
- Left column: 5 textarea inputs (Persona, Context, Task, Format, Constraints)
- Right column: live preview in terminal-style window with copy/reset
- Drawer with native HTML accordion (`<details name="guide-accordion">`)
- "?" button in the bottom-right corner opens the reference drawer
- Escape key or backdrop click closes the drawer
- Scanline overlay renders uniformly across the entire viewport (including drawer)

### Reference Page (guide.html)
- Standalone version of all educational content
- Self-contained with inline styles (same cyberpunk theme as main page)
- "← Back to Forge" link fixed to top-left corner
- Preserves the original full content from v1.1

### Prompt Generation Template
```javascript
const generatedPrompt = `You are ${persona}.

Context: ${context}

Task: ${task}

Output: ${format}

If unclear/unknown: Say "I don't know" exactly.

Examples/Constraints: ${examples}`;
```

## Design System

### Cyberpunk/Hacker Terminal Theme
- Background: pure black (`#000000`)
- Primary: bright terminal green (`#22c55e` / `#10b981`)
- Font: JetBrains Mono + Share Tech Mono
- Radius: `0rem` (sharp edges)
- Effects: scanline overlay, neon glow borders, CRT aesthetic

### Token Overrides (styles.css)
```css
--background: oklch(0 0 0);
--foreground: oklch(0.8348 0.1302 160.9080);
--primary: oklch(0.8348 0.1302 160.9080);
--card: oklch(0.15 0 0);
--border: oklch(0.3 0.08 160);
--input: oklch(0.2046 0 0);
--font-mono: 'JetBrains Mono', 'Share Tech Mono', monospace;
```

## Responsive Design

- Desktop: full two-column forge layout, drawer slides over from right
- Mobile (≤768px): single column forge layout, drawer is full-width
- Drawer trigger ("?" button) adjusts position and size on mobile

## Technical Stack

- HTML5: semantic markup, native `<details name>` accordion
- CSS3: custom properties, CSS Grid, Flexbox, transitions
- Vanilla JavaScript: event listeners, Clipboard API, localStorage
- Google Fonts: JetBrains Mono, Share Tech Mono
- No frameworks: pure HTML/CSS/JS

## Features

### Visual Effects
- Scanline overlay for CRT aesthetic
- Neon glow borders on hover
- Terminal-style preview window with fake OS dots
- Slide-in drawer with backdrop blur

### Interactivity
- Real-time prompt generation
- Copy to clipboard with visual feedback
- Exclusive accordion (native `<details name>` — zero JS)
- drawer open/close with backdrop and Escape key
- localStorage persistence for prompt fields
- Reset with inline confirmation

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- High contrast (bright green on black)
- Keyboard navigation support (Tab, Enter, Escape)
- Native `<details>` accordion (ARIA-compatible)
- `aria-label` on trigger and drawer

## Performance

- Fast loading (minimal dependencies)
- CSS-based animations (GPU accelerated)
- No JavaScript blocking rendering
- Optimized font loading via Google Fonts `@import`

## Usage

1. Open `index.html` in a web browser to see the Prompt Forge
2. Fill in textarea inputs to generate a structured prompt
3. Click "COPY PROMPT" to copy to clipboard
4. Click "RESET" to clear fields (confirmation required)
5. Click the "?" button (bottom-right) to open the reference drawer
6. Click "→ VIEW FULL GUIDE" in the drawer footer for the standalone page
7. Press Escape or click the backdrop to close the drawer

## Local Preview

No build system is required. Serve the directory with a static server:

```bash
python -m http.server 8000
```

Then open:
- `http://localhost:8000/index.html`
- `http://localhost:8000/guide.html`

## Upgrading from v1.1

- Old bookmarks to `forge.html` now redirect automatically to `index.html`
- The standalone guide moved from `index.html` → `guide.html`
- `assets/js/forge.js` is preserved for reference but no longer loaded by any page
