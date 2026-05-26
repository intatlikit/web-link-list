# Antigravity Developer & Project Log

This file is a project documentation and analysis log initialized by the Antigravity assistant. It tracks the system architecture, development workflows, current state, and future improvements.

## 📋 Project Overview

**Intat's Hub** is a professional, curated link directory showcasing personal tools, calculators, and viewers.
- **Hosted Base URL**: [https://intatlikit.github.io/web-link-list/](https://intatlikit.github.io/web-link-list/)
- **Tech Stack**: React 18, TypeScript, Vite, Vanilla CSS.

---

## 🏗️ Architecture & Code Map

The project is structured simply and follows modular React development patterns:

```
web-link-list/
├── .gemini/
│   └── skills/
│       └── git-conventional-commits/
│           └── SKILL.md    # Active workspace skill configuration
├── .github/workflows/
│   └── deploy.yml          # CI/CD deployment to GitHub Pages and SMTP Notification
├── .git/hooks/
│   └── pre-push            # Git push hook to run checks before pushing
├── git-conventional-commits/
│   └── SKILL.md            # Repository source for custom git-conventional-commits developer skill
├── src/
│   ├── components/
│   │   └── LinkCard.tsx    # Renders an individual external link card with hover animations
│   ├── data/
│   │   └── links.ts        # Source-of-truth JSON array for links
│   ├── App.tsx             # Main layout, containing header, link grid, and footer
│   ├── App.css             # Vanilla CSS layout styling and typography
│   ├── main.tsx            # App bootstrapping
│   └── types.ts            # Core TypeScript interfaces (e.g., LinkItem)
├── git-conventional-commits.skill # Packaged developer skill zip archive
├── index.html              # HTML shell
├── vite.config.ts          # Vite config (defines base route as /web-link-list/)
└── package.json            # Scripts and dependencies
```

### File Breakdown & Purpose

1. **[App.tsx](file:///Users/i.likitpolchaloon/web-link-list/src/App.tsx)**:
   Serves as the root UI component. Maps the list of links to `LinkCard` components inside a dynamic grid.
2. **[LinkCard.tsx](file:///Users/i.likitpolchaloon/web-link-list/src/components/LinkCard.tsx)**:
   Renders a link with proper security parameters (`target="_blank"` and `rel="noopener noreferrer"`). Displays title, description, truncated URL, and a micro-animated external indicator (`↗`).
3. **[links.ts](file:///Users/i.likitpolchaloon/web-link-list/src/data/links.ts)**:
   Hosts the array of 7 tools/calculators configured currently.
4. **[App.css](file:///Users/i.likitpolchaloon/web-link-list/src/App.css)**:
   Contains global styling rules, HSL light/dark colors, grid layouts, transitions, responsive breakpoints, and custom typography (`Inter`).
5. **[git-conventional-commits/SKILL.md](file:///Users/i.likitpolchaloon/web-link-list/git-conventional-commits/SKILL.md)**:
   The source template for the conventional commit skill configuration used by the Gemini coding assistant.
6. **[git-conventional-commits.skill](file:///Users/i.likitpolchaloon/web-link-list/git-conventional-commits.skill)**:
   The zipped package of the conventional commit skill, which can be shared or loaded directly as an IDE plugin/extension.

---

## ⚙️ Development Workflows & Automation

### 1. Build and Lint Scripts
Defined in [package.json](file:///Users/i.likitpolchaloon/web-link-list/package.json):
* `npm run dev`: Starts local development server at `http://localhost:5173/web-link-list/`.
* `npm run check`: Executes ESLint syntax check and TypeScript compiler (`tsc`) verification.
* `npm run build`: Bundles files for production into `./dist` directory.
* `npm run preview:prod`: Tests the bundled production files locally before deployment.

### 2. Git Hooks Validation
A custom pre-push hook resides in `.git/hooks/pre-push`:
* Automatically runs `npm run check` before any push succeeds.
* Aborts push if any linting or type compiler error occurs to prevent broken main builds.

### 3. CI/CD Pipeline
Configured in [.github/workflows/deploy.yml](file:///Users/i.likitpolchaloon/web-link-list/.github/workflows/deploy.yml):
* **Trigger**: Triggered automatically on push to the `main` branch.
* **Environment**: Ubuntu-latest environment running Node 20.
* **Flow**:
  1. Installs npm dependencies.
  2. Builds static production bundle (`npm run build`).
  3. Uploads `./dist` directory using `actions/upload-pages-artifact@v3`.
  4. Deploys to GitHub Pages using `actions/deploy-pages@v4`.
  5. If the deployment is successful, uses SMTP `dawidd6/action-send-mail` to notify `intat.likit@gmail.com` of success, detailing the commit ID, branch, and live deployment URL.

### 4. Custom Developer Skills Automation
A custom assistant skill helps guide the AI development partner in writing standard Conventional Commits.
* **Skill Source**: Defined in [git-conventional-commits/SKILL.md](file:///Users/i.likitpolchaloon/web-link-list/git-conventional-commits/SKILL.md).
* **Skill Active Configuration**: Copied to [SKILL.md (active)](file:///Users/i.likitpolchaloon/web-link-list/.gemini/skills/git-conventional-commits/SKILL.md) for IDE integration.
* **Packaging and Sync Script**:
  - Run `npm run skill:build` to synchronize updates from the repository template to the active `.gemini/` config and rebuild the packaged [git-conventional-commits.skill](file:///Users/i.likitpolchaloon/web-link-list/git-conventional-commits.skill) archive.

---

## 🔗 Live Curated Directory
The following 7 tools are presently active in the hub:

| # | Tool Name | Live URL | Functionality |
|---|-----------|----------|---------------|
| 1 | Harn-Tang | [Link](https://intatlikit.github.io/harn-tang/) | Shared expense & bill splitting calculator |
| 2 | Monthly Expense Calculator | [Link](https://intatlikit.github.io/monthly_expense_calculator/) | Monthly budget tracking and category analysis |
| 3 | Loan Calculator | [Link](https://intatlikit.github.io/loan-calculator/) | Interest rates and repayment options checker |
| 4 | Text Converter | [Link](https://text-converter-bice-five.vercel.app/) | Text processing and formatting converter |
| 5 | Saving Account Plan Calculator | [Link](https://intatlikit.github.io/saving_account_plan_calculator/) | Financial planning and future savings visualizer |
| 6 | Android Chucker View | [Link](https://vb-android-chucker-viewer.web.app/) | Android HTTP request logs reader and viewer |
| 7 | iOS Pulse View | [Link](https://amefuri.github.io/zloggerlens/) | Console logs and API logs inspector for iOS Pulse |

---

## 🚀 Potential Enhancement Roadmaps

1. **Category Sorting / Tagging**: 
   Group links by category (e.g., *Finance*, *Developer Tools*, *Utilities*) to improve organization as the list grows.
2. **Search functionality**:
   Add a search bar to dynamically filter tools based on title or keywords.
3. **Status Check / Ping Indicators**:
   Integrate a periodic background check to verify if the link targets are healthy and mark them online/offline.
4. **Custom Theme Toggler**:
   Allow manual toggling between dark and light modes instead of relying purely on system defaults (`prefers-color-scheme`).
5. **Developer Experience (DX) Custom Skills**:
   Build and introduce additional custom developer skills for testing (e.g., vitest/playwright automation) or UI components auditing to further integrate AI developer support.
