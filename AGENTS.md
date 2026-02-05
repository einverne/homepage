# Repository Guidelines

## Project Structure & Module Organization
- `src/` holds all site code. Key areas: `src/pages/` for route pages, `src/layouts/` for shared layouts, `src/components/` for UI pieces, `src/assets/` for local assets, and `src/utils/` + `src/types/` for helpers and type definitions.
- `public/` contains static files served as-is (e.g., `public/fonts/`, `public/favicon/`).
- Site configuration lives in `src/config.ts`. Global site root and build settings are in `astro.config.mjs`.

## Build, Test, and Development Commands
- `pnpm install` installs dependencies (Node.js 20+ and pnpm required).
- `pnpm dev` starts the local Astro dev server at `http://localhost:4321`.
- `pnpm build` builds the production site into `dist/`.
- `pnpm preview` serves the production build locally for verification.
- `pnpm astro ...` runs raw Astro commands (e.g., `pnpm astro add`).

## Coding Style & Naming Conventions
- This project is TypeScript + Astro. Prefer clear, self-descriptive names (e.g., `Footer.astro`, `siteConfig`).
- Follow existing file naming patterns: PascalCase for components in `src/components/`, lower-case for directories, and `.astro` / `.ts` extensions.
- No automated formatter or linter is configured; keep formatting consistent with nearby code and avoid trailing whitespace.

## Testing Guidelines
- No test framework is currently configured. If you add tests, document the chosen tooling and add scripts in `package.json`.
- Keep any future tests close to the feature area (e.g., `src/`-adjacent) and use descriptive names (e.g., `config.test.ts`).

## Commit & Pull Request Guidelines
- Commit history follows Conventional Commit style (e.g., `feat(config): ...`, `fix(config): ...`, `style(footer): ...`). Keep subjects short and scoped.
- PRs should include: a brief summary, relevant screenshots for UI changes, and any config changes called out explicitly (`src/config.ts`, `astro.config.mjs`).

## Configuration & Content Tips
- Update site metadata and profile content in `src/config.ts`.
- If you change fonts or icons, ensure assets are in `public/` and referenced with absolute paths (e.g., `/fonts/...`).
