// Nihon Statistical Atlas — page renderers. One function per hash route; each
// returns HTML for #view and wires up that page's controls after render.

import {
  META, KPI, POPULATION_TREND, POPULATION_TREND_SOURCE, AGE_PYRAMID,
  AGE_PYRAMID_SOURCE, AGE_SHARES, AGE_SHARES_SOURCE, GDP_TREND, GDP_TREND_SOURCE,
  GDP_SECTORS, GDP_SECTORS_SOURCE, TRADE, TRADE_SOURCE, UNEMPLOYMENT_TREND,
  UNEMPLOYMENT_SOURCE, EMPLOYMENT_SECTORS, EMPLOYMENT_SECTORS_NOTE, WAGES,
  WAGES_SOURCE, CPI_TREND, CPI_SOURCE, HOUSEHOLD_SPENDING, HOUSEHOLD_SPENDING_SOURCE,
  PREFECTURES, PREFECTURES_SOURCE, REGIONS, REGIONS_SOURCE, formatThousands,
} from './data.js';
import { barChart, hBarChart, lineChart, donutChart, pyramidChart } from './charts.js';

function sourceLine(text) {
  return `<p class="source">${text}</p>`;
}

function kpiCards() {
  return `<div class="kpi-grid">${KPI.map((k) => `
    <article class="kpi">
      <div class="kpi-label">${k.label}</div>
      <div class="kpi-value">${k.value}</div>
      <div class="kpi-detail">${k.detail}</div>
      <div class="kpi-source">${k.source}</div>
    </article>`).join('')}</div>`;
}

export function renderOverview() {
  const top5 = [...PREFECTURES].sort((a, b) => b.population - a.population).slice(0, 5);
  return `
  <section class="hero">
    <h1>Japan in numbers <span class="ja">日本の統計</span></h1>
    <p>An independent atlas of Japan's official statistics — population, economy,
    regions, work and prices — drawn from the publications of the Statistics Bureau
    of Japan, the Cabinet Office and the ministries, with every figure sourced and dated.</p>
    <div class="hero-facts">
      <span><b>47</b> prefectures</span>
      <span><b>8</b> regions</span>
      <span><b>124.6m</b> people (2024)</span>
      <span><b>Updated</b> ${META.updated}</span>
    </div>
  </section>
  ${kpiCards()}
  <section class="card">
    <h2>Japan at a glance</h2>
    <p>Japan is the world's fourth-largest economy and one of its oldest societies:
    29.1% of the population is aged 65 or over, the highest share of any large country.
    The population has fallen every year since 2011, while life expectancy — 84.0 years —
    remains among the longest in the world. The Greater Tokyo area holds over a third of
    the country in the Kanto region alone.</p>
    <p>Use the sections above to explore: the population trend and age structure, the
    economy and trade, all 47 prefectures, the labour market, and prices and household
    spending. Every chart and table on this site is drawn from the data files shipped
    with it — the site works fully offline.</p>
    ${sourceLine('Statistics Bureau of Japan; Cabinet Office; Ministry of Health, Labour and Welfare, 2024')}
  </section>
  <section class="card">
    <h2>Largest prefectures by population</h2>
    <div class="chart-wrap">${hBarChart(top5.map((p) => ({ label: p.name, value: p.population })), {
      format: (v) => `${formatThousands(v)}k`, aria: 'Largest prefectures by population',
    })}</div>
    ${sourceLine(PREFECTURES_SOURCE)}
    <p><a href="#/regions">See all 47 prefectures →</a></p>
  </section>`;
}

export function renderPopulation() {
  return `
  <header class="page-head">
    <h1>Population</h1>
    <p class="lede">Japan's population peaked at 128.1 million in 2010 and has fallen every year
    since. The age structure has shifted with it: children are fewer, and the 65-and-over
    group now outnumbers the under-15s by more than two to one.</p>
  </header>
  <section class="card">
    <h2>Population trend, 1990–2024</h2>
    <div class="controls">
      <label>Year range
        <select id="pop-range">
          <option value="all" selected>1990–2024 (all years)</option>
          <option value="recent">2015–2024 (last decade)</option>
          <option value="peak">2005–2015 (around the peak)</option>
        </select>
      </label>
    </div>
    <div class="chart-wrap" id="pop-chart"></div>
    ${sourceLine(POPULATION_TREND_SOURCE)}
  </section>
  <section class="card">
    <h2>Age structure, 2024</h2>
    <div class="chart-wrap">${pyramidChart(AGE_PYRAMID, { aria: 'Population pyramid by age band, 2024' })}</div>
    <div class="legend">
      <span><span class="swatch" style="background:#232a52"></span>Male</span>
      <span><span class="swatch" style="background:#c0392b"></span>Female</span>
    </div>
    ${sourceLine(AGE_PYRAMID_SOURCE)}
    <h3>Share by broad age group</h3>
    <ul class="stat-list">${AGE_SHARES.map((a) => `
      <li><span class="stat-name">${a.group}</span><span class="stat-value">${a.share}%</span></li>`).join('')}
    </ul>
    ${sourceLine(AGE_SHARES_SOURCE)}
  </section>
  <section class="card">
    <h2>What the numbers say</h2>
    <p>The working-age population (15–64) is 59.5% of the total, down from 69.5% in 1995.
    Births fell below 730,000 in 2024, the lowest on record, while deaths exceeded 1.6 million.
    The old-age dependency ratio — people 65+ per 100 working-age people — now stands at 48.9,
    the highest of any major economy.</p>
    ${sourceLine('Statistics Bureau of Japan, Population Estimates; Ministry of Health, Labour and Welfare, Vital Statistics, 2024')}
  </section>`;
}

export function mountPopulation() {
  const select = document.getElementById('pop-range');
  const target = document.getElementById('pop-chart');
  if (!select || !target) return;
  const draw = () => {
    let rows = POPULATION_TREND;
    if (select.value === 'recent') rows = POPULATION_TREND.filter((p) => p.year >= 2015);
    if (select.value === 'peak') rows = POPULATION_TREND.filter((p) => p.year >= 2005 && p.year <= 2015);
    target.innerHTML = lineChart(rows.map((p) => ({ label: String(p.year), value: p.value })), {
      format: (v) => `${v.toFixed(1)}m`,
      min: Math.min(...rows.map((p) => p.value)) - 1.5,
      max: Math.max(...rows.map((p) => p.value)) + 2,
      aria: 'Population of Japan in millions',
    });
  };
  select.addEventListener('change', draw);
  draw();
}

export function renderEconomy() {
  return `
  <header class="page-head">
    <h1>Economy</h1>
    <p class="lede">Japan's nominal GDP was $4.03 trillion in 2024, the world's fourth largest.
    Services produce about 70% of value added; manufacturing — led by cars, electronics
    and machinery — still accounts for nearly a fifth.</p>
  </header>
  <section class="card">
    <h2 id="gdp-title">Nominal GDP, 2015–2024</h2>
    <div class="controls">
      <span class="toggle-group" role="group" aria-label="Chart type">
        <button class="btn" id="gdp-bars" aria-pressed="true" type="button">Bars</button>
        <button class="btn ghost" id="gdp-line" aria-pressed="false" type="button">Line</button>
      </span>
    </div>
    <div class="chart-wrap" id="gdp-chart"></div>
    ${sourceLine(GDP_TREND_SOURCE)}
  </section>
  <div class="two-col">
    <section class="card">
      <h2>GDP by sector</h2>
      <div class="chart-wrap">${donutChart(GDP_SECTORS.map((s) => ({ label: s.sector, value: s.share })), {
        centerLabel: 'Value added', format: () => '100%', aria: 'GDP by sector',
      })}</div>
      <ul class="stat-list">${GDP_SECTORS.map((s, i) => `
        <li><span class="stat-name"><span class="swatch" style="background:${['#232a52', '#c0392b', '#0f766e', '#b7791f', '#5b7fa6'][i]}"></span> ${s.sector}</span><span class="stat-value">${s.share}%</span></li>`).join('')}
      </ul>
      ${sourceLine(GDP_SECTORS_SOURCE)}
    </section>
    <section class="card">
      <h2>Trade, 2024</h2>
      <ul class="stat-list">${TRADE.map((t) => `
        <li><span class="stat-name">${t.item}<span class="stat-note">${t.note}</span></span><span class="stat-value">${t.value}</span></li>`).join('')}
      </ul>
      ${sourceLine(TRADE_SOURCE)}
      <p>Japan ran a goods deficit for a third straight year, driven by energy imports,
      but a large surplus on investment income kept the current account firmly positive.</p>
    </section>
  </div>`;
}

export function mountEconomy() {
  const barsBtn = document.getElementById('gdp-bars');
  const lineBtn = document.getElementById('gdp-line');
  const target = document.getElementById('gdp-chart');
  if (!barsBtn || !lineBtn || !target) return;
  const rows = GDP_TREND.map((p) => ({ label: String(p.year), value: p.value }));
  const drawBars = () => {
    target.innerHTML = barChart(rows, { format: (v) => `$${v.toFixed(2)}tn`, color: '#232a52', aria: 'Nominal GDP by year, bars' });
    barsBtn.setAttribute('aria-pressed', 'true');
    lineBtn.setAttribute('aria-pressed', 'false');
    barsBtn.classList.remove('ghost');
    lineBtn.classList.add('ghost');
  };
  const drawLine = () => {
    target.innerHTML = lineChart(rows, { format: (v) => `$${v.toFixed(2)}tn`, min: 3.8, aria: 'Nominal GDP by year, line' });
    lineBtn.setAttribute('aria-pressed', 'true');
    barsBtn.setAttribute('aria-pressed', 'false');
    lineBtn.classList.remove('ghost');
    barsBtn.classList.add('ghost');
  };
  barsBtn.addEventListener('click', drawBars);
  lineBtn.addEventListener('click', drawLine);
  drawBars();
}

export function renderRegions() {
  const regionRows = REGIONS.map((r) => `
    <tr><td>${r.region}</td><td class="num">${r.prefectures}</td><td class="num">${formatThousands(r.population)}k</td></tr>`).join('');
  return `
  <header class="page-head">
    <h1>Regions &amp; prefectures</h1>
    <p class="lede">Japan is divided into 47 prefectures across 8 regions. Tokyo alone holds
    14.2 million people — more than 11% of the country — on 0.6% of its land. Tottori,
    the smallest prefecture, has about 540,000 residents.</p>
  </header>
  <section class="card">
    <h2>Population by region, 2024</h2>
    <div class="table-wrap">
      <table class="data">
        <thead><tr><th>Region</th><th class="num">Prefectures</th><th class="num">Population (thousands)</th></tr></thead>
        <tbody>${regionRows}
          <tr class="total-row"><td>Japan total</td><td class="num">47</td><td class="num">124,720k</td></tr>
        </tbody>
      </table>
    </div>
    ${sourceLine(REGIONS_SOURCE)}
  </section>
  <section class="card">
    <h2>All 47 prefectures</h2>
    <div class="controls">
      <label>Search prefectures
        <input type="search" id="pref-search" placeholder="Type a name or region…" autocomplete="off">
      </label>
      <label>Region
        <select id="pref-region">
          <option value="">All regions</option>
          ${[...new Set(PREFECTURES.map((p) => p.region))].map((r) => `<option>${r}</option>`).join('')}
        </select>
      </label>
      <span class="result-count" id="pref-count"></span>
    </div>
    <div class="table-wrap">
      <table class="data" id="pref-table">
        <thead><tr>
          <th><button type="button" data-sort="name">Prefecture ↕</button></th>
          <th><button type="button" data-sort="region">Region ↕</button></th>
          <th><button type="button" data-sort="capital">Capital ↕</button></th>
          <th class="num"><button type="button" data-sort="population">Population ↕</button></th>
          <th class="num"><button type="button" data-sort="area">Area (km²) ↕</button></th>
          <th class="num"><button type="button" data-sort="density">Density /km² ↕</button></th>
        </tr></thead>
        <tbody id="pref-body"></tbody>
      </table>
    </div>
    <p class="empty-note" id="pref-empty" hidden>No prefecture matches that search.</p>
    ${sourceLine(PREFECTURES_SOURCE)}
  </section>`;
}

export function mountRegions() {
  const body = document.getElementById('pref-body');
  const search = document.getElementById('pref-search');
  const regionSel = document.getElementById('pref-region');
  const count = document.getElementById('pref-count');
  const empty = document.getElementById('pref-empty');
  if (!body || !search || !regionSel) return;
  let sortKey = 'population';
  let sortDir = -1;
  const density = (p) => Math.round((p.population * 1000) / p.area);
  const draw = () => {
    const q = search.value.trim().toLowerCase();
    const region = regionSel.value;
    let rows = PREFECTURES.filter((p) =>
      (!region || p.region === region) &&
      (!q || p.name.toLowerCase().includes(q) || p.region.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q)));
    rows = [...rows].sort((a, b) => {
      const av = sortKey === 'density' ? density(a) : a[sortKey];
      const bv = sortKey === 'density' ? density(b) : b[sortKey];
      return (typeof av === 'string' ? av.localeCompare(bv) : av - bv) * sortDir;
    });
    body.innerHTML = rows.map((p) => `
      <tr><td>${p.name}</td><td>${p.region}</td><td>${p.capital}</td>
      <td class="num">${formatThousands(p.population)}k</td><td class="num">${formatThousands(p.area)}</td>
      <td class="num">${formatThousands(density(p))}</td></tr>`).join('');
    count.textContent = `${rows.length} of 47 prefectures`;
    empty.hidden = rows.length > 0;
  };
  document.querySelectorAll('#pref-table th button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.sort;
      if (sortKey === key) sortDir *= -1;
      else { sortKey = key; sortDir = key === 'name' || key === 'region' || key === 'capital' ? 1 : -1; }
      draw();
    });
  });
  search.addEventListener('input', draw);
  regionSel.addEventListener('change', draw);
  draw();
}

export function renderWork() {
  return `
  <header class="page-head">
    <h1>Work</h1>
    <p class="lede">Japan's unemployment rate, 2.5% in 2024, is among the lowest in the OECD —
    and employers still report severe labour shortages. The labour force is 69.1 million
    people, with participation rising as more women and older workers stay in work.</p>
  </header>
  <section class="card">
    <h2>Unemployment rate, 2015–2024</h2>
    <div class="chart-wrap">${lineChart(UNEMPLOYMENT_TREND.map((p) => ({ label: String(p.year), value: p.value })), {
      format: (v) => `${v.toFixed(1)}%`, min: 2.0, max: 3.6, color: '#c0392b', fill: 'rgba(192,57,43,0.07)', aria: 'Unemployment rate by year',
    })}</div>
    ${sourceLine(UNEMPLOYMENT_SOURCE)}
  </section>
  <div class="two-col">
    <section class="card">
      <h2>Employment by sector</h2>
      <div class="chart-wrap">${hBarChart(EMPLOYMENT_SECTORS.map((s) => ({ label: s.sector, value: s.share })), {
        format: (v) => `${v.toFixed(1)}%`, aria: 'Employment share by sector',
      })}</div>
      <p class="section-note">${EMPLOYMENT_SECTORS_NOTE}</p>
    </section>
    <section class="card">
      <h2>Wages &amp; the labour force</h2>
      <ul class="stat-list">${WAGES.map((w) => `
        <li><span class="stat-name">${w.item}<span class="stat-note">${w.note}</span></span><span class="stat-value">${w.value}</span></li>`).join('')}
      </ul>
      ${sourceLine(WAGES_SOURCE)}
      <p>Real wages fell in 2024 as prices rose faster than pay, though nominal pay
      growth in the spring wage round was the strongest in three decades.</p>
    </section>
  </div>`;
}

export function renderPrices() {
  return `
  <header class="page-head">
    <h1>Prices</h1>
    <p class="lede">After decades of near-zero inflation, consumer prices rose 2.7% in 2024.
    Food is the largest slice of household spending at 27.9%, and housing the next at 21.6%.</p>
  </header>
  <section class="card">
    <h2>Consumer price inflation, 2015–2024</h2>
    <div class="chart-wrap">${barChart(CPI_TREND.map((p) => ({ label: String(p.year), value: p.value })), {
      format: (v) => `${v.toFixed(1)}%`, color: '#0f766e', aria: 'Annual CPI change by year',
    })}</div>
    <p>Annual average change in the consumer price index (all items, % year on year).
    The 2022–2024 burst was the first sustained inflation above 2% since the early 1990s.</p>
    ${sourceLine(CPI_SOURCE)}
  </section>
  <div class="two-col">
    <section class="card">
      <h2>Where households spend</h2>
      <div class="chart-wrap">${donutChart(HOUSEHOLD_SPENDING.map((h) => ({ label: h.category, value: h.share })), {
        centerLabel: 'Monthly spend', format: () => '100%', aria: 'Household spending shares',
      })}</div>
      <ul class="stat-list">${HOUSEHOLD_SPENDING.map((h, i) => `
        <li><span class="stat-name"><span class="swatch" style="background:${['#232a52', '#c0392b', '#0f766e', '#b7791f', '#5b7fa6', '#8a6d3b', '#4a6b4f', '#7d5ba6'][i]}"></span> ${h.category}</span><span class="stat-value">${h.share}%</span></li>`).join('')}
      </ul>
      ${sourceLine(HOUSEHOLD_SPENDING_SOURCE)}
    </section>
    <section class="card">
      <h2>Reading the prices</h2>
      <p>The Bank of Japan ended its negative-rate policy in March 2024 and raised its
      policy rate to 0.5% by January 2025 — the first rate-hiking cycle in 17 years.</p>
      <p>A two-person-or-more household spent on average ¥290,511 a month in 2024.
      Spending on food has risen as a share of the total for three straight years,
      driven by higher prices for rice, vegetables and eating out.</p>
      <div class="callout"><p><strong>Why it matters:</strong> with wages only just catching up
      to prices, the CPI is the number most Japanese households watch month to month.</p></div>
      ${sourceLine('Statistics Bureau of Japan, Family Income and Expenditure Survey; Bank of Japan, 2024')}
    </section>
  </div>`;
}

export const ROUTES = {
  '': { render: renderOverview },
  population: { render: renderPopulation, mount: mountPopulation },
  economy: { render: renderEconomy, mount: mountEconomy },
  regions: { render: renderRegions, mount: mountRegions },
  work: { render: renderWork },
  prices: { render: renderPrices },
};
