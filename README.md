# Index Page

A minimal personal homepage template built with [Astro](https://astro.build/).

## 💻 Requirements
- Node.js (20.x or newer recommended)
- pnpm (`npm -g pnpm`)

## 🚀 Quick Start

1. Clone this repo
    ```bash
    git clone https://github.com/einverne/homepage.git
    cd homepage
    ```
2. Install dependencies with `pnpm install`
3. Run `pnpm dev` to start the dev server, or `pnpm build` to build for production

## 🔨 Configuration

Site configuration lives in `src/config.ts`. The site root is configured in `astro.config.mjs`.

**Site root**

Edit [`astro.config.mjs`](astro.config.mjs) and update the `defineConfig.site` value.

**Site metadata**

Edit [`/src/config.ts`](./src/config.ts). `siteConfig` contains site-level settings (title, icons, background, etc.) and `profileConfig` stores personal profile data (avatar, name, bio, and so on).

**Footer**

The footer is defined in [`/src/components/Footer.astro`](./src/components/Footer.astro).

## 🎨 Styling Notes

- The global font is now `Source Serif 4` (more formal tone) and configured in `src/layouts/Layout.astro`.
- The background has been updated to a modern mesh-gradient plus a subtle grid texture, with dark-mode variants, also in `src/layouts/Layout.astro`.

## ⚡ Commands

All commands should be run from the project root.

| Command | Description |
| --- | --- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start the dev server at `http://localhost:4321` |
| `pnpm build` | Build the production site into `./dist` |
| `pnpm preview` | Preview the production build |
| `pnpm astro ...` | Run Astro CLI commands, e.g. `astro add` |

## 📜 TODO

- [X] Add dark mode
- [X] Upgrade to a modern mesh-gradient background
- [X] Switch to a more formal font
- [ ] Add i18n
