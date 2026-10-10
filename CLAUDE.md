# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static Astro replica of illustrator Virginia Ory's Adobe Portfolio site (virginiaory.com). It is deployed as a static-assets-only Cloudflare Worker, with no server code, no test suite and no linter. It started from the `v2.0` replica of larabordalo.com and was restyled to the Virginia theme.

## Commands

Uses pnpm 12.6.0 (pinned via `packageManager`) and Node >=22.

```sh
pnpm install
pnpm dev                 # http://localhost:4321 (drafts are visible in dev)
pnpm build               # static output in dist/ — the only real correctness check
pnpm preview
npx wrangler dev         # serve dist/ exactly like production
pnpm import:portfolio    # re-scrape the Adobe site (overwrites index.md files)
```

## Architecture

- **Content**: each project is `src/content/projects/<slug>/` with `index.md` (frontmatter only) and its images; the folder name is the URL. Standalone pages (`about-me`, `contact`) live in `src/content/pages/`. Schema in `src/content.config.ts`; blocks are `image`, `grid`, `text`, `embed` and `columns` (one level of nesting, from Adobe's "tree" module).
- **Rendering**: `src/components/Blocks.astro` renders blocks (recursively for `columns`, via `Astro.self`) and mounts `Lightbox.astro` once.
- **Layout**: `src/layouts/Base.astro` holds the full-width grey header (logo left, scaled to the band's height; nav offset 31.5%), the mobile menu, back-to-top and footer. Nav items are in `src/consts.ts`.
- **Styling**: all in `src/styles/global.css`; values come from the original theme CSS. Breakpoints 768px and 540px.
- **URL compatibility**: `build.format: 'file'` plus `trailingSlash: 'never'` turns `/ciclos` into `ciclos.html`; `wrangler.jsonc` uses `drop-trailing-slash` plus `404-page`. `/work` → `/` lives in both `astro.config.mjs` and `public/_redirects`; keep them in sync.
- **Contact form**: posts to Web3Forms using the build-time `PUBLIC_WEB3FORMS_KEY`; without it the form falls back to `mailto:`.
