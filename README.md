# Intat Hub

A curated, accessible link directory built with React, Vite, and TypeScript. Live at [https://intatlikit.github.io/web-link-list/](https://intatlikit.github.io/web-link-list/).

## Features
- **Accessible Links:** Uses standard `<a>` tags with `noopener noreferrer` for security and SEO.
- **External Indicators:** Visual cues (↗) for links opening in new browser tabs.
- **Responsive Layout:** A perfectly centered, mobile-friendly grid system.
- **Automated Quality Gate:** Integrated Git pre-push hooks to ensure code integrity.
- **CI/CD:** Automatic deployment to GitHub Pages via GitHub Actions.

## Development Routine

### 1. Local Development
```bash
npm install
npm run dev
```
Start the development server with Hot Module Replacement (HMR) at [http://localhost:5173](http://localhost:5173).

### 2. Quality Checks
```bash
npm run check
```
Runs **ESLint** and **TypeScript** validation. This is also automatically triggered during `git push`.

### 3. Production Preview
```bash
npm run preview:prod
```
Builds the project and serves the production-ready minified files locally.

## Deployment Routine
This project uses **GitHub Actions** for continuous deployment.
1. Any push to the `main` branch triggers the `Deploy static content to Pages` workflow.
2. The workflow installs dependencies, builds the project, and deploys the `dist/` folder to GitHub Pages.

## Project Structure
- `src/components/LinkCard.tsx`: Reusable card component with external link styling.
- `src/data/links.ts`: Centralized data file for managing your links and descriptions.
- `.github/workflows/deploy.yml`: GitHub Actions configuration for automated deployment.
- `.git/hooks/pre-push`: Local hook to prevent pushing broken code.
