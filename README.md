# Intat's Hub

A professional, curated link directory of personal tools and calculators. Built with **React**, **Vite**, and **TypeScript**.

Live at: [https://intatlikit.github.io/web-link-list/](https://intatlikit.github.io/web-link-list/)

## 🚀 Key Features

- **Personalized Branding:** Custom identity as "Intat's Hub".
- **Accessible & SEO-Friendly:** Uses semantic HTML (`<a>` tags) with proper security attributes (`noopener noreferrer`).
- **Interactive UI:** A centered, responsive grid with hover effects and external link indicators (↗).
- **Automated Workflow:**
  - **Git Pre-Push Hook:** Prevents pushing code with linting or type errors.
  - **GitHub Actions CI/CD:** Automatically builds and deploys to GitHub Pages on every push to `main`.

## 🛠 Project Structure

- `src/data/links.ts`: The source of truth for all links and descriptions.
- `src/components/LinkCard.tsx`: The reusable card component for link items.
- `src/App.tsx`: Main application shell and layout.
- `.github/workflows/deploy.yml`: Configuration for automated deployments.

## 📋 Development Routines

### Local Development
```bash
npm install
npm run dev
```
Starts the development server at [http://localhost:5173](http://localhost:5173) with Hot Module Replacement (HMR).

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

## 🔗 Integrated Tools

Currently featured in the hub:
1. **Harn-Tang**: Bill splitting and shared expenses tool.
2. **Monthly Expense Calculator**: Personal finance tracker.
3. **Loan Calculator**: Interest and payment breakdown.
4. **Saving Account Plan Calculator**: Financial goal visualization.

## 📦 Deployment Details
This project is configured to use **GitHub Actions** for deployment. To enable it:
1. Go to **Settings > Pages** in your GitHub repository.
2. Under **Build and deployment > Source**, select **GitHub Actions**.
3. Pushing to the `main` branch will now automatically update the live site.
