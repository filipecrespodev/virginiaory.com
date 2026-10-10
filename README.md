# virginiaory.com

Portfolio site of Virginia Ory, illustrator. A static [Astro](https://astro.build) site, hosted for free on Cloudflare Workers.

It replicates the Adobe Portfolio site (layout, URLs and content) as it was in October 2026: grey header band with the hand-lettered logo, "About me / Illustration / Contact" menu, a three-column grid of project covers and one page per project.

```sh
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # static site in dist/
pnpm preview
```

## Pages

| URL | Content |
|---|---|
| `/` | Grid of project covers (`/work` redirects here) |
| `/about-me` | Portrait and bio (`src/content/pages/about-me/index.md`) |
| `/contact` | Contact form plus the text in `src/content/pages/contact/index.md` |
| `/<project>` | One page per project folder (same URLs as on Adobe Portfolio) |

## Content

Each project is a folder holding its images and an `index.md` file:

```
src/content/projects/ciclos/
├── index.md
├── cover.jpg      # thumbnail used on the home grid
├── 01.jpg
└── 02.jpg
```

```yaml
---
title: "Ciclos"
year: 2024
order: 5                     # position on the home grid
cover: "./cover.jpg"
description: "Optional intro shown under the title."
draft: false                 # true = hidden in production
blocks:
  - type: image              # full-width image
    src: ./01.jpg
  - type: grid               # justified row of images
    images:
      - ./02.jpg
      - ./03.jpg
  - type: text
    html: "<p>Some text with <strong>bold</strong> and <a href='https://…'>links</a>.</p>"
  - type: columns            # side by side (used on About me), stacks on phones
    columns:
      - flex: 87
        blocks:
          - type: image
            src: ./04.jpg
      - flex: 113
        blocks:
          - type: text
            html: "<p>…</p>"
---
```

To add a project: create a folder in `src/content/projects/` (the folder name is the URL), add the images and an `index.md`, then commit and push. Cloudflare publishes it automatically. Astro makes the responsive WebP versions at build time, so 2000–2600px wide originals are ideal.

### Re-importing from Adobe Portfolio

`pnpm import:portfolio` downloads every project, About me and Contact from the old site (https://virginiaory.com while it is still on Adobe) into `src/content`, plus the header logo into `src/assets/logo.png`. It only works while that site is online, and it overwrites the `index.md` files.

## Hosting: Cloudflare Workers (free)

The site is deployed as a Cloudflare Worker that serves only static files (`wrangler.jsonc` points to `dist/`).

- Project: **virginiaory-com** (Workers & Pages).
- Live URL: https://virginiaory-com.filipesoares-crespo.workers.dev
- `public/_redirects` keeps the old `/work` URL working (→ `/`). Unknown paths serve `404.html`.

To build and deploy on every push, connect this repository to the worker in the Cloudflare dashboard (Workers & Pages → virginiaory-com → Settings → Build → Connect repository; build command `pnpm build`, deploy command `npx wrangler deploy`).

Custom domain: in the worker, open **Domains** and add `virginiaory.com` and `www.virginiaory.com`. The domain's DNS needs to be on Cloudflare (add the site on the free plan and switch the nameservers at the registrar). Once the domain shows the new site, disconnect it in Adobe Portfolio.

## Contact form

The form posts to [Web3Forms](https://web3forms.com) (free, 250 messages/month, no backend). Create an access key with `oi@virginiaory.com` and set it as `PUBLIC_WEB3FORMS_KEY` in the worker's **Settings → Build → Variables and secrets** (build variable), or in `.env` locally. Without a key the form opens the visitor's mail app instead.

## Fonts

The original uses Museo Slab from Adobe Fonts, which is licensed only through the Adobe subscription. The site uses Roboto Slab (300/500/700) instead, self-hosted through Fontsource.
