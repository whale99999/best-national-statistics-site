# Nihon Statistical Atlas

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun)
[![make.fun rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/whale99999/best-national-statistics-site/rank.svg)](https://make.fun)
[![make.fun reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/whale99999/best-national-statistics-site/reward.svg)](https://make.fun)

An independent national statistics site for **Japan** — population, economy, regions,
work and prices — that runs fully offline in a web browser, on desktop and on a phone,
from its own static files. No server, no network requests, no external assets.

## What it covers

- **Overview** — KPI cards (population, GDP, GDP per capita, unemployment, life
  expectancy, land area) plus the five largest prefectures.
- **Population** — trend line chart 1990–2024 with a year-range selector, an
  age-pyramid chart, and the share by broad age group.
- **Economy** — GDP trend with a bars/line toggle, GDP by sector donut, and trade figures.
- **Regions** — population by region and a sortable, searchable table of all
  47 prefectures (population, area, density, capital).
- **Work** — unemployment trend, employment by sector, wages and the labour force.
- **Prices** — CPI trend 2015–2024 and household spending shares.

Every figure names its source and year (Statistics Bureau of Japan, Cabinet Office,
Ministry of Health, Labour and Welfare, Ministry of Finance, IMF World Economic
Outlook). All charts are inline SVG drawn locally; the site stores nothing and
sets no cookies.

## Run it

```sh
node serve.ts
# open http://localhost:8080
```

## Layout

- `app/index.html` — shell: header, nav, `<main id="view">`, footer
- `app/style.css` — the whole design (indigo + vermilion on off-white)
- `app/data.js` — every figure, each with source and year
- `app/charts.js` — inline-SVG chart builders (bar, line, donut, pyramid)
- `app/views.js` — hash-router page renderers
- `app/main.js` — bootstrap: routing + nav state
- `main.ts` — entry program: copies `app/` and `screenshots/` to `/output` and
  writes `dossier.json` (run `mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts`)
- `vendor/makefun-frontend.ts` — make.fun library, copied unchanged from the kit

## License

MIT — see [LICENSE](LICENSE).
