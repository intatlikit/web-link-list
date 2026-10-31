# Intat's Hub

A professional, curated link directory of personal tools and calculators. Built with **Vue 3**, **Vite**, **TypeScript**, and **Supabase**.

Live at: [https://intatlikit.github.io/web-link-list/](https://intatlikit.github.io/web-link-list/)

## 🚀 Key Features

- **Personalized Branding:** Custom identity as "Intat's Hub".
- **Accessible & SEO-Friendly:** Uses semantic HTML (`<a>` tags) with proper security attributes (`noopener noreferrer`).
- **Interactive UI:** A centered, responsive grid with hover effects and external link indicators (↗).
- **Automated Workflow:**
  - **Git Pre-Push Hook:** Prevents pushing code with linting or type errors.
  - **GitHub Actions CI/CD:** Automatically builds and deploys to GitHub Pages on every push to `main`.

## 🛠 Project Structure

- `src/App.vue`: Main application shell; picks loading / error / empty / grid state.
- `src/components/`: UI components grouped by role — `layout/` (header, footer), `search/` (search bar), `links/` (grid, card), `states/` (loading, error, empty).
- `src/composables/useLinks.ts`: Loads links from the Supabase `links` table.
- `src/lib/supabase.ts`: Supabase client configured from env vars.
- `src/data/links.ts`: Local fallback data used when Supabase is not configured.
- `supabase/schema.sql`: Table definition, RLS policy, and seed data.
- `.github/workflows/deploy.yml`: Configuration for automated deployments.
- `git-conventional-commits/SKILL.md`: Source file for the custom conventional commits developer skill.
- `git-conventional-commits.skill`: Zipped package of the conventional commit skill configuration.

## 📋 Development Routines

### Local Development
```bash
npm install
cp .env.example .env.local   # optional: fill in Supabase URL + anon key
npm run dev
```
Without `.env.local`, the app falls back to `src/data/links.ts`.
Starts the development server at [http://localhost:5173/web-link-list/](http://localhost:5173/web-link-list/) with Hot Module Replacement (HMR).

### Quality Assurance (Auto-checked on Push)
```bash
npm run check
```
Runs **ESLint** and **TypeScript** validation to ensure code health.

### Production Preview
```bash
npm run preview:prod
```
Builds the production assets and serves them locally for final verification.

### AI Assistant Integration (Developer Skills)
To package and synchronize changes to the AI assistant's custom conventional commits skill:
```bash
npm run skill:build
```
Copies the template configuration into the active `.gemini/` skill directory and packages it into the zipped `.skill` file.

## 🔗 Integrated Tools

Currently featured in the hub:
1. **Harn-Tang**: Bill splitting and shared expenses tool.
2. **Monthly Expense Calculator**: Personal finance tracker.
3. **Loan Calculator**: Interest and payment breakdown.
4. **Text Converter**: Simple and efficient text conversion utility.
5. **Saving Account Plan Calculator**: Financial goal visualization.
6. **Android Chucker View**: Web-based viewer for Android Chucker HTTP inspector logs.
7. **iOS Pulse View**: API log inspector and viewer for iOS Pulse console logs.

## 📦 Deployment Details
This project is configured to use **GitHub Actions** for deployment. To enable it:
1. Go to **Settings > Pages** in your GitHub repository.
2. Under **Build and deployment > Source**, select **GitHub Actions**.
3. Pushing to the `main` branch will now automatically update the live site.

### Supabase Setup
1. Run `supabase/schema.sql` in the Supabase Dashboard SQL Editor.
2. In **Settings > Secrets and variables > Actions**, add repository secrets:
   - `SUPABASE_URL` — your project URL
   - `SUPABASE_ANON_KEY` — the project's anon (public) key
3. The deploy workflow passes them to the build as `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`.
