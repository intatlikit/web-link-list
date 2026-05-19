# Web Link List

A curated, accessible link directory built with React, Vite, and TypeScript.

## Features
- **Accessible Links:** Uses standard `<a>` tags for better SEO and screen reader support.
- **External Indicators:** Visual cues (↗) for links opening in new tabs.
- **Responsive Grid:** Clean layout that works on mobile and desktop.
- **Dev Routines:** Integrated linting and type-checking scripts.

## Getting Started

### Development
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Quality Checks
```bash
npm run check
```

### Production Build
```bash
npm run build
```

## Project Structure
- `src/components/LinkCard.tsx`: The reusable card component.
- `src/data/links.ts`: Centralized data store for your links.
- `src/types.ts`: TypeScript interfaces.
