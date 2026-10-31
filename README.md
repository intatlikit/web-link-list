# Intat's Hub

A curated link directory of personal tools and calculators. Built with **Vue 3**, **Vite**, **TypeScript**, and **Supabase**.

Live at: [https://intatlikit.github.io/web-link-list/](https://intatlikit.github.io/web-link-list/)

## 🚀 Key Features

- **Search** by name or URL.
- **Add / edit items** — floating `+` button opens an add page; the ⋮ button on each card opens an edit page. Both let you pick the item's position (default: end of list).
- **Drag & drop reordering** on desktop and mobile (drag the grip handle on a card).
- **Open editing:** anyone can add, edit, and reorder — no sign-in. Every device reads and writes the same Supabase table. Deleting is not possible from the site.
- **CI/CD:** GitHub Actions builds and deploys to GitHub Pages on every push to `main`.

## 🛠 Project Structure

- `src/App.vue`: App shell (router view + footer).
- `src/views/`: Pages — `HomeView`, `LinkCreateView`, `LinkEditView`.
- `src/components/`: UI components grouped by role — `layout/`, `search/`, `links/`, `states/`, `common/`, `icons/`.
- `src/composables/`: `useLinks` (load + reorder), `useLinkSearch`.
- `src/services/`: `linkService` (create/update/reorder logic) on top of `linkBackends` (Supabase or localStorage).
- `src/router/`: Hash-based routes.
- `src/data/links.ts`: Seed data for local mode (no Supabase configured).
- `supabase/migrations/`: Table, RLS policies, and the `reorder_links` function.
- `.github/workflows/deploy.yml`: Automated deployment.

## 📋 Development

```bash
npm install
cp .env.example .env.local   # optional: fill in Supabase URL + anon key
npm run dev
```
Starts the dev server at [http://localhost:5173/web-link-list/](http://localhost:5173/web-link-list/).
Without `.env.local` the app runs in **local mode**: changes are saved to the browser's localStorage only.

```bash
npm run check          # ESLint + vue-tsc (run before committing)
npm run preview:prod   # build and preview the production bundle
```

## 📦 Deployment

1. In **Settings > Pages**, set **Source** to **GitHub Actions**.
2. Pushing to `main` updates the live site.

### Supabase Setup
1. In the Supabase SQL Editor, run `supabase/migrations/001_create_links.sql`, then `002_public_editing.sql`.
2. In GitHub **Settings > Secrets and variables > Actions**, add repository secrets:
   - `SUPABASE_URL` — your project URL
   - `SUPABASE_ANON_KEY` — the project's anon (public) key — never the `service_role` key
3. The deploy workflow passes them to the build as `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`.
