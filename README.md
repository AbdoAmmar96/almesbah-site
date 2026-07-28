# ALMESBAH — almesbah-eg.com rebuild

Laravel 12 + Inertia + React 18 (public site) + **custom React dashboard** (no Filament).
English-first, i18n-ready for `zh` / `ar` — add the locale to `config/localization.php` and the routing, hreflang, sitemap, and translation tables are already wired.

**Design:** "Organic Premium" — Fraunces + Karla (self-hosted via @fontsource, China-safe), cream/forest/terracotta palette, linen-weave texture, fiber-strand hero motif.

---

## Screenshots

### Public site

| Home | Products |
| --- | --- |
| ![Home](docs/screenshots/home.png) | ![Products](docs/screenshots/products.png) |

| About | Product detail |
| --- | --- |
| ![About](docs/screenshots/about.png) | ![Product detail](docs/screenshots/product-detail.png) |

| Industries | Export |
| --- | --- |
| ![Industries](docs/screenshots/industries.png) | ![Export](docs/screenshots/export.png) |

| Gallery | Certifications |
| --- | --- |
| ![Gallery](docs/screenshots/gallery.png) | ![Certifications](docs/screenshots/certifications.png) |

| Blog | Article |
| --- | --- |
| ![Blog](docs/screenshots/blog.png) | ![Article](docs/screenshots/article.png) |

| Contact (RFQ) | |
| --- | --- |
| ![Contact](docs/screenshots/contact.png) | |

### Dashboard (custom React, no Filament)

| Login | Overview |
| --- | --- |
| ![Dashboard login](docs/screenshots/dashboard-login.png) | ![Dashboard overview](docs/screenshots/dashboard-overview.png) |

| Products CRUD | Articles CRUD |
| --- | --- |
| ![Dashboard products](docs/screenshots/dashboard-products.png) | ![Dashboard articles](docs/screenshots/dashboard-articles.png) |

| Settings | |
| --- | --- |
| ![Dashboard settings](docs/screenshots/dashboard-settings.png) | |

---

## 1. Install

```bash
./setup.sh                       # scaffolds Laravel 12 + deps into ./almesbah
cp -r custom/. almesbah/         # overlay all project files (overwrite)
cd almesbah
cp .env.example .env             # set DB_*, APP_URL, MAIL_*
php artisan key:generate
php artisan storage:link
php artisan migrate --seed       # 8 products, 4 published + 8 draft articles, settings, SEO
npm run build
php artisan serve                # http://localhost:8000/en  ·  /dashboard
```

**Dashboard login:** `admin@almesbah-eg.com` / `password` → **change immediately in production** (tinker: `User::first()->update(['password' => bcrypt('...')])`).

## 2. What was fixed from the old site (talk track for the client)

| Old site problem | Fixed here |
| --- | --- |
| Hacked: 300+ casino spam posts indexed | Any `casino` / `free-spins` / `no-deposit` URL now returns **410 Gone** (bootstrap/app.php) so Google drops them fast |
| robots.txt blocked Baiduspider (China!) & SEO crawlers | Clean robots.txt welcoming all legitimate bots — `/robots.txt` route |
| Header email → stranger's domain (`orchardtrade.com`) | `info@almesbah-eg.com` seeded in Settings |
| Maps link → a Cairo mall | Correct Shubrameles/Zefta location in Settings |
| No meta descriptions, junk titles (`product?i=76`) | Per-page SEO table + per-product/article SEO fields, editable in dashboard |
| No blog | Blog engine + 4 published SEO articles + 8 outlined drafts |
| Old URLs would 404 | 301 map: `/producti76..81`, `/about-us`, `/our-products`, `/gallery`, `/contact-us`, `/flax-fibers` |

## 3. Content model

- **Products / Articles** = base row + `*_translations` row per locale (name, slug, body, SEO). Dashboard editors write locale `en` today; add a locale tab later without schema changes.
- **Static pages** copy lives in the React pages; UI strings in `lang/en.json` (duplicate as `zh.json` for phase 2). Their SEO lives in the `seo_metas` table (dashboard → SEO).
- **Settings** (phone, WhatsApp, emails, addresses, WeChat ID, map URL) → dashboard → Settings; injected site-wide via Inertia shared props.
- Descriptions/bodies are **Markdown** rendered by `resources/js/i18n.ts → md()` (headings, bold, links, tables, lists).

## 4. Shared-hosting deploy (cPanel)

1. Locally: `composer install --optimize-autoloader --no-dev` and `npm run build`
2. Upload everything except `node_modules/` ; point the domain's document root to `public/`
3. Create MySQL DB, fill `.env`, then via cPanel terminal: `php artisan key:generate && php artisan migrate --seed && php artisan storage:link`
4. Make `storage/` and `bootstrap/cache/` writable
5. **DNS cut-over:** point almesbah-eg.com here; keep the old WordPress files offline (do NOT delete the DB before exporting a backup)
6. Google Search Console: submit `/sitemap.xml`, use **Removals** for the worst casino URLs, and request re-indexing of the homepage

## 5. Playwright tests

```bash
npm i -D @playwright/test && npx playwright install chromium
npx playwright test          # site smoke + 301/410 + robots + sitemap + RFQ + dashboard CRUD
```

## 6. Client TODO (blocking polish, not launch)

- High-res product & factory photos (current images are 475px from the old site — the design will look 2× better with real photography)
- Founding year + WeChat ID (Settings)
- Certificate PDF for the Certifications page download
- SMTP credentials in `.env` so RFQ emails deliver (leads are captured in the dashboard regardless)

## 7. Phase 2 — 中文 (when ready)

`config/localization.php` → `'supported' => ['en','zh']`, add `lang/zh.json`, add `zh` rows in the dashboard editors. Hreflang, sitemap alternates, and routing pick it up automatically. Hosting note for China performance: HK/SG CDN + no Google-hosted assets (already true — fonts are bundled).

---
**Deployment kit:** see `custom/deploy/DEPLOYMENT-CHECKLIST-AR.md` (خطوة بخطوة بالعربي), `custom/.env.production.example`, `custom/deploy/root.htaccess` (fallback docroot), and `custom/public/install.php` (one-time web installer — change its token, it self-deletes). Index-cleanup tasks are parked at the bottom of the checklist until actual go-live.
