# Project Instructions: web-link-list

This project is a professional, curated link directory ("hub") showcasing personal tools and utilities. It is built for high performance and reliability using React, TypeScript, and Vite.

## Architecture & Tech Stack

- **Framework:** React 18 (Functional Components)
- **Build Tool:** Vite
- **Language:** TypeScript (Strict Mode)
- **Styling:** Vanilla CSS (Responsive Design, HSL colors)
- **Data Management:** Static data defined in `src/data/links.ts`
- **Deployment:** GitHub Pages (Automated via GitHub Actions)

## Key Files & Directories

- `src/components/`: React components.
  - `LinkCard.tsx`: Renders external links with security best practices (`noopener noreferrer`).
- `src/data/links.ts`: The source of truth for the links.
- `src/types.ts`: Core TypeScript interfaces (e.g., `LinkItem`).
- `src/App.tsx`: Main layout, grid management, and link mapping.
- `src/App.css`: Global styles, layout, and typography (`Inter`).
- `src/main.tsx`: Application entry point.
- `git-conventional-commits/`: The local directory defining the custom conventional commits developer skill.
- `git-conventional-commits.skill`: The packaged developer skill zip archive.
- `.gemini/skills/`: Active workspace configuration for assistant developer skills.

## Workflows & Scripts

- `npm run dev`: Start the development server at `http://localhost:5173/web-link-list/`.
- `npm run check`: **Primary Validation.** Runs ESLint and TypeScript type checking.
- `npm run build`: Build the production bundle in `./dist`.
- `npm run preview:prod`: Test the production build locally.
- `npm run lint`: Run ESLint checks.
- `npm run skill:build`: Synchronize the developer skill configuration to `.gemini/` and rebuild the `.skill` package.

## Development Conventions

- **Components:** Functional components with explicit TypeScript props.
- **Styling:** Prefer Vanilla CSS. Use HSL variables for color management.
- **Security:** External links MUST use `target="_blank"` and `rel="noopener noreferrer"`.
- **Data Updates:** 
  - Update `src/data/links.ts` to add/modify links.
  - Ensure `id` values are unique strings.
  - Follow the `LinkItem` interface in `src/types.ts`.
- **Developer Skills:** Whenever custom developer skills are modified, update `git-conventional-commits/SKILL.md` and run `npm run skill:build` to compile changes.
- **Validation:** Always run `npm run check` before committing. A `pre-push` git hook is configured to enforce this.

## CI/CD & Deployment

- **Automated Deployment:** Pushes to `main` trigger a GitHub Action (`deploy.yml`) that builds and deploys to GitHub Pages.
- **Notifications:** Successful deployments trigger an SMTP email notification to the maintainer.

## Core Mandates

- **Zero Warnings:** Code must pass `npm run check` with no linting warnings or TypeScript errors.
- **Security First:** Never commit secrets or API keys. Ensure all external links are secure.
- **Contextual Integrity:** Always refer to `ANTIGRAVITY.md` for historical context and future roadmaps.
