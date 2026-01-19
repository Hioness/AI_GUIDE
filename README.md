# AI_GUIDE_v1.1

A quick workflow for using AI without outsourcing your brain.

## Folder Structure

```
AI_GUIDE_v1.1/
├── index.html              # Homepage with guide and verification framework
├── forge.html              # Prompt Forge interactive tool
├── assets/
│   ├── css/
│   │   └── styles.css      # Shared styles (tokens + layout + components)
│   ├── js/
│   │   └── forge.js        # Prompt Forge interactive functionality
│   └── favicon.svg         # Cyberpunk favicon
└── README.md               # This file
```

## Architecture

### Multi-Page Navigation
- Homepage (`index.html`): "Prompt Forge" link fixed to top-right corner
- Forge Page (`forge.html`): "← Back to Main Page" button fixed to top-left corner
- No persistent navigation bar across pages

### Token System Integration
The site uses CSS custom properties (design tokens) in `assets/css/styles.css`:
- Base tokens are defined first, then cyberpunk overrides follow
- Components reference tokens like `var(--primary)`, `var(--background)`, etc.
- The theme can be adjusted by editing the override values

## Implementation Details

### Homepage (index.html)
Content order:
1. Site title and plain-English subtitle
2. Purpose statement with AI plausibility clarification
3. 1.0 SYSTEM ETHICS (4-card grid with "Rule:" and "Example:" format)
4. 2.0 THE AI CYCLE LOOP (4 operational cards with goal/decision framing and examples)
5. 3.0 ADVANCED PROTOCOLS (Visible Checkpoints and Adversarial Playoff with explicit output)
6. AI USE CATEGORIES section with concrete examples
7. PROMPT HEURISTIC PROTOCOL table (PROMPTS + "Questions to Ask" column)
8. Reflection section with mandatory question
9. Footer
10. "Prompt Forge" link (fixed top-right)

### Prompt Forge (forge.html)
Interactive two-column tool:
- Left column: 5 textarea inputs with labels and default values
- Right column: live preview in terminal-style window
- Preview box: min-height 80px, max-height 60vh, overflow-y auto
- Real-time updates: preview updates as user types
- Copy button: visual feedback for 2 seconds after copying
- Reset flow: inline confirmation before clearing inputs
- Persistence: prompt fields stored in localStorage

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

- Desktop: full multi-column layouts
- Tablet (≤1024px): grid cards reduce to smaller columns
- Mobile (≤768px): single column layouts, adjusted spacing

## Technical Stack

- HTML5: semantic markup
- CSS3: custom properties, CSS Grid, Flexbox
- Vanilla JavaScript: event listeners, Clipboard API
- Google Fonts: JetBrains Mono, Share Tech Mono
- No frameworks: pure HTML/CSS/JS

## Features

### Visual Effects
- Scanline overlay for CRT aesthetic
- Neon glow borders on hover
- Terminal-style window with fake OS dots

### Interactivity
- Real-time prompt generation
- Copy to clipboard with visual feedback
- Hover effects on cards and buttons
- Smooth transitions and animations

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- High contrast (bright green on black)
- Keyboard navigation support

## Performance

- Fast loading (minimal dependencies)
- CSS-based animations (GPU accelerated)
- No JavaScript blocking rendering
- Optimized font loading

## Usage

1. Open `index.html` in a web browser to view the guide
2. Click "Prompt Forge" (top-right) to access the prompt builder
3. Fill in textarea inputs to generate prompts
4. Click "COPY PROMPT" to copy to clipboard
5. Click "RESET" to clear fields (confirmation required)
6. Click "← Back to Main Page" (top-left) to return to guide

## Local Preview

No build system is required. Serve the directory with a static server:

```bash
python -m http.server 8000
```

Then open:

- `http://localhost:8000/index.html`
- `http://localhost:8000/forge.html`
