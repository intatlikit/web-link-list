# Project Instructions: web-link-list

This project is a professional, curated link directory ("hub") showcasing personal tools and utilities. It is built for high performance and reliability using Vue 3, TypeScript, Vite, and Supabase.

## Architecture & Tech Stack

- **Framework:** Vue 3 (`<script setup lang="ts">`, Composition API)
- **Build Tool:** Vite
- **Language:** TypeScript (Strict Mode, checked with `vue-tsc`)
- **Styling:** Vanilla CSS (scoped per component, HSL CSS variables in `src/assets/main.css`)
- **Data Management:** Supabase `links` table; `src/data/links.ts` is a local fallback
- **Deployment:** GitHub Pages (Automated via GitHub Actions)

## Key Files & Directories

- `src/components/`: Vue components grouped by role (`layout/`, `search/`, `links/`, `states/`).
  - `links/LinkCard.vue`: Renders external links with security best practices (`noopener noreferrer`).
- `src/composables/`: `useLinks` (Supabase fetch) and `useLinkSearch` (filtering).
- `src/lib/supabase.ts`: Supabase client from `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`.
- `src/data/links.ts`: Local fallback links when Supabase is not configured.
- `src/types.ts`: Core TypeScript interfaces (`LinkItem`, `LinkRow`).
- `src/App.vue`: Main layout and state selection.
- `src/assets/main.css`: Theme tokens and shared grid.
- `src/main.ts`: Application entry point.
- `supabase/schema.sql`: Table, RLS policy, and seed data.
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

- **Components:** `<script setup lang="ts">` SFCs with type-based `defineProps`.
- **Styling:** Prefer Vanilla CSS. Use HSL variables for color management.
- **Security:** External links MUST use `target="_blank"` and `rel="noopener noreferrer"`.
- **Data Updates:** 
  - Add/modify links in the Supabase `links` table (production source of truth).
  - Keep `src/data/links.ts` and the seed in `supabase/schema.sql` in sync as the local fallback.
- **Developer Skills:** Whenever custom developer skills are modified, update `git-conventional-commits/SKILL.md` and run `npm run skill:build` to compile changes.
- **Validation:** Always run `npm run check` before committing. A `pre-push` git hook is configured to enforce this.

## CI/CD & Deployment

- **Automated Deployment:** Pushes to `main` trigger a GitHub Action (`deploy.yml`) that builds and deploys to GitHub Pages.
- **Notifications:** Successful deployments trigger an SMTP email notification to the maintainer.

## Core Mandates

- **Zero Warnings:** Code must pass `npm run check` with no linting warnings or TypeScript errors.
- **Security First:** Never commit secrets or API keys. Ensure all external links are secure.
- **Contextual Integrity:** Always refer to `ANTIGRAVITY.md` for historical context and future roadmaps.
