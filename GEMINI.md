# Project Instructions: web-link-list

This project is a simple, curated list of web links (a "hub") built with React, TypeScript, and Vite.

## Architecture & Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Vanilla CSS (located in `src/*.css`)
- **Data Management:** Static data defined in `src/data/links.ts`

## Key Files & Directories

- `src/components/`: React components (e.g., `LinkCard.tsx`).
- `src/data/links.ts`: The source of truth for the links displayed in the app.
- `src/types.ts`: TypeScript interfaces and types used across the project.
- `src/App.tsx`: Main application container and layout.
- `src/main.tsx`: Application entry point.

## Workflows & Scripts

- `npm run dev`: Start the development server.
- `npm run check`: Run ESLint and TypeScript type checking.
- `npm run build`: Build the application for production.
- `npm run lint`: Run ESLint.

## Development Conventions

- **Components:** Functional components with TypeScript props.
- **Styling:** Prefer Vanilla CSS. Component-specific styles can be added to existing or new CSS files.
- **Data Updates:** To add or modify links, update `src/data/links.ts`. Follow the `LinkItem` interface in `src/types.ts`.
- **Validation:** Always run `npm run check` before submitting changes to ensure linting and type safety.
