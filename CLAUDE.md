# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build to ./dist/
npm run preview  # Preview production build
```

## Architecture

This is an Astro portfolio site with React integration, deployed to GitHub Pages at `/astro-portfolio/`.

### Tech Stack
- **Astro 5** - Static site generator with islands architecture
- **React 19** - Interactive components (using `client:load` directive)
- **Tailwind CSS 3** - Styling
- **Framer Motion** - Animations
- **Three.js / tsparticles** - Visual effects

### Project Structure

```
src/
├── layouts/BaseLayout.astro   # Main HTML shell with Header/Footer
├── pages/*.astro              # Routes (index, about, projects, connect)
├── components/*.tsx           # React components with client-side interactivity
└── styles/global.css          # Global styles
```

### Key Patterns

**Astro Pages**: Use `.astro` files that import React components with hydration directives:
```astro
<StarBackground client:load />
<Hero client:load />
```

**Navigation**: All internal links must use the `/astro-portfolio/` base path (configured in `astro.config.mjs`).

**Terminal Component** (`src/components/Terminal.tsx`): Interactive command-line interface with:
- Navigation commands (home, about, projects, connect)
- Typing test feature
- Sound effects (audio files in `public/audio/`)
- Command history (arrow keys) and tab completion

### Configuration

- `astro.config.mjs` - Site URL, base path, React/Tailwind integrations
- `tailwind.config.js` - Custom animations (fade-in), Inter font family
