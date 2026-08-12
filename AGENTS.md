# Repository Guidelines

## Project Structure & Module Organization
- `src/` holds all site code. Key areas: `src/pages/` for route pages, `src/layouts/` for shared layouts, `src/components/` for UI pieces, `src/assets/` for local assets, and `src/utils/` + `src/types/` for helpers and type definitions.
- `public/` contains static files served as-is (e.g., `public/fonts/`, `public/favicon/`).
- Site configuration lives in `src/config.ts`. Global site root and build settings are in `astro.config.mjs`.

## Architecture

This is an Astro 7 site (React islands + Tailwind v4) for a personal homepage, with three locales: `zh` (default), `en`, `ja`.

**Routing / i18n**: `src/pages/index.astro` is a locale-detection stub — it reads `navigator.languages` client-side and redirects (`window.location.replace`) into the correct `/[lang]/` route; there is no server-side geo/header detection. All real pages live under `src/pages/[lang]/` (e.g. `index.astro`, `lab.astro`, `tools/*.astro`) and use `getStaticPaths` from `getLocaleStaticPaths('lang')` (`src/utils/i18n.ts`) to prerender one page per locale. Locale config (`supportedLocales`, `localeCodes`, date/lang tags) and **all UI copy** live in `src/utils/i18n.ts` as a single `translations` object keyed by locale — there is no external i18n library or per-locale JSON files; new user-facing strings must be added to all three locale blocks there and read via `getTranslations(locale)`.

**Site content config**: `src/config.ts` (typed by `src/types/config.ts`) holds three exported objects: `siteConfig` (title, favicon, background, cache TTL), `profileConfig` (avatar, bio, social/profile links), and `labConfig` (the tools/services grid shown on `/lab`, each entry with a localized name/description via `LocalizedText`). Editing site metadata or links means editing this file, not component code.

**External data fetching**: The homepage (`src/pages/[lang]/index.astro`) fetches an RSS blog feed and a YouTube channel feed at request/build time via `rss-parser`, wrapped through `getCached()` (`src/utils/cache.ts`) — an in-process `Map` on `globalThis` keyed by cache key, with TTL from `siteConfig.cache.ttlMs` and stale-value fallback on fetch failure. This cache is process-local (not persisted), so it only helps within a single long-lived server/dev process, not across builds.

**Components**: `src/components/` holds `.astro` components (server-rendered, e.g. `Profile.astro`, `Projects.astro`, `Footer.astro`); `src/components/control/` holds nav/theme/icon controls; `src/components/ui/` holds shadcn-style Radix-based primitives (`button.tsx`, `select.tsx`, etc.) shared by React islands; `src/components/tools/<tool-name>/` holds self-contained React tool implementations (e.g. `compound-interest`, `japan-tax`), each with its own `hooks/`, `types.ts`, and chart components built on `recharts` — these are hydrated as islands from the corresponding `src/pages/[lang]/tools/*.astro` page.

**Path aliases** (`tsconfig.json`): `@/*` → `src/*`, plus `@components`, `@utils`, `@layouts`, `@assets` (note: `@constants` and `@i18n` aliases are declared but those directories don't currently exist).

## Build, Test, and Development Commands
- `pnpm install` installs dependencies (pnpm required; Node.js version pinned in `mise.toml`, currently 24.x).
- `pnpm dev` starts the local Astro dev server at `http://localhost:4321`.
- `pnpm build` builds the production site into `dist/`.
- `pnpm preview` serves the production build locally for verification.
- `pnpm astro ...` runs raw Astro commands (e.g., `pnpm astro add`, `pnpm astro check`).
- There is no lint, typecheck, or test script configured in `package.json`. Astro's built-in diagnostics run as part of `pnpm build`; use `pnpm astro check` for a standalone TypeScript/template check if needed.

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
- Global font is `Source Serif 4`; background is a mesh-gradient + grid texture with dark-mode variants — both configured in `src/layouts/Layout.astro`.
- Site root URL is set via `defineConfig.site` in `astro.config.mjs`, currently `https://einverne.info`.

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **homepage** (510 symbols, 813 relationships, 17 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/homepage/context` | Codebase overview, check index freshness |
| `gitnexus://repo/homepage/clusters` | All functional areas |
| `gitnexus://repo/homepage/processes` | All execution flows |
| `gitnexus://repo/homepage/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
