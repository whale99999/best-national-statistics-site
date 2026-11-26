// Nihon Statistical Atlas — chart builders. Every chart is plain inline SVG drawn
// from the data in data.js: no libraries, no images, no network. Each builder takes
// plain arrays and returns an SVG string; views.js places the result in the page.

const INDIGO = '#232a52';
const VERMILION = '#c0392b';
const TEAL = '#0f766e';
const GOLD = '#b7791f';
const SLATE = '#6b7194';
const GRID = '#e3dfd3';
const PALETTE = [INDIGO, VERMILION, TEAL, GOLD, '#5b7fa6', '#8a6d3b', '#4a6b4f', '#7d5ba6'];

function esc(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function niceMax(max) {
  const pow = Math.pow(10, Math.floor(Math.log10(max)));
  const n = max / pow;
  const steps = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
  const step = steps.find((s) => n <= s) ?? 10;
  return step * pow;
}

function axisLabels(max, ticks) {
  const labels = [];
  for (let i = 0; i <= ticks; i += 1) labels.push((max * i) / ticks);
  return labels;
}

// Vertical bar chart. points: [{label, value}], valueLabel formats a value.
export function barChart(points, options = {}) {
  const width = options.width || 760;
  const height = options.height || 320;
  const pad = { top: 14, right: 14, bottom: 34, left: 56 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const max = niceMax(Math.max(...points.map((p) => p.value)) * 1.08);
  const fmt = options.format || ((v) => String(v));
  const barW = Math.min(46, (innerW / points.length) * 0.62);
  const gap = innerW / points.length;
  let out = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(options.aria || 'Bar chart')}">`;
  for (const v of axisLabels(max, 4)) {
    const y = pad.top + innerH - (v / max) * innerH;
    out += `<line x1="${pad.left}" y1="${y}" x2="${width - pad.right}" y2="${y}" stroke="${GRID}" stroke-width="1"/>`;
    out += `<text x="${pad.left - 8}" y="${y + 4}" text-anchor="end" font-size="11" fill="${SLATE}">${esc(fmt(v))}</text>`;
  }
  points.forEach((p, i) => {
    const cx = pad.left + gap * i + gap / 2;
    const h = (p.value / max) * innerH;
    const color = options.color || PALETTE[i % PALETTE.length];
    out += `<rect x="${(cx - barW / 2).toFixed(1)}" y="${(pad.top + innerH - h).toFixed(1)}" width="${barW}" height="${h.toFixed(1)}" rx="3" fill="${color}"/>`;
    out += `<text x="${cx.toFixed(1)}" y="${(pad.top + innerH - h - 6).toFixed(1)}" text-anchor="middle" font-size="11.5" font-weight="700" fill="${INDIGO}">${esc(fmt(p.value))}</text>`;
    out += `<text x="${cx.toFixed(1)}" y="${height - 12}" text-anchor="middle" font-size="11.5" fill="${SLATE}">${esc(p.label)}</text>`;
  });
  return out + '</svg>';
}

// Horizontal bar chart, good for ranked lists. points: [{label, value}]
export function hBarChart(points, options = {}) {
  const width = options.width || 760;
  const rowH = options.rowHeight || 34;
  const height = 16 + points.length * rowH + 8;
  const pad = { top: 8, right: 64, bottom: 8, left: 130 };
  const innerW = width - pad.left - pad.right;
  const max = niceMax(Math.max(...points.map((p) => p.value)) * 1.05);
  const fmt = options.format || ((v) => String(v));
  let out = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(options.aria || 'Horizontal bar chart')}">`;
  points.forEach((p, i) => {
    const y = pad.top + i * rowH;
    const w = (p.value / max) * innerW;
    const color = options.color || PALETTE[i % PALETTE.length];
    out += `<text x="${pad.left - 10}" y="${y + 20}" text-anchor="end" font-size="12.5" fill="${INDIGO}">${esc(p.label)}</text>`;
    out += `<rect x="${pad.left}" y="${y + 6}" width="${Math.max(w, 2).toFixed(1)}" height="18" rx="3" fill="${color}"/>`;
    out += `<text x="${(pad.left + Math.max(w, 2) + 8).toFixed(1)}" y="${y + 20}" font-size="12.5" font-weight="700" fill="${INDIGO}">${esc(fmt(p.value))}</text>`;
  });
  return out + '</svg>';
}

// Line chart. points: [{label, value}] — label is usually a year.
export function lineChart(points, options = {}) {
  const width = options.width || 760;
  const height = options.height || 320;
  const pad = { top: 18, right: 18, bottom: 34, left: 56 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const values = points.map((p) => p.value);
  const min = options.min !== undefined ? options.min : Math.min(...values) * 0.92;
  const max = options.max !== undefined ? options.max : niceMax(Math.max(...values) * 1.03);
  const fmt = options.format || ((v) => String(v));
  const x = (i) => pad.left + (i / (points.length - 1)) * innerW;
  const y = (v) => pad.top + innerH - ((v - min) / (max - min)) * innerH;
  let out = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(options.aria || 'Line chart')}">`;
  for (let i = 0; i <= 4; i += 1) {
    const v = min + ((max - min) * i) / 4;
    const yy = y(v);
    out += `<line x1="${pad.left}" y1="${yy}" x2="${width - pad.right}" y2="${yy}" stroke="${GRID}" stroke-width="1"/>`;
    out += `<text x="${pad.left - 8}" y="${yy + 4}" text-anchor="end" font-size="11" fill="${SLATE}">${esc(fmt(v))}</text>`;
  }
  const area = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  out += `<path d="${area} L${x(points.length - 1).toFixed(1)},${(pad.top + innerH).toFixed(1)} L${x(0).toFixed(1)},${(pad.top + innerH).toFixed(1)} Z" fill="${options.fill || 'rgba(35,42,82,0.08)'}" stroke="none"/>`;
  out += `<path d="${area}" fill="none" stroke="${options.color || INDIGO}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  points.forEach((p, i) => {
    out += `<circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="3.5" fill="#fff" stroke="${options.color || INDIGO}" stroke-width="2"/>`;
    if (i % 2 === 0 || i === points.length - 1) {
      out += `<text x="${x(i).toFixed(1)}" y="${height - 12}" text-anchor="middle" font-size="11.5" fill="${SLATE}">${esc(p.label)}</text>`;
    }
  });
  const last = points[points.length - 1];
  out += `<text x="${x(points.length - 1).toFixed(1)}" y="${(y(last.value) - 10).toFixed(1)}" text-anchor="end" font-size="12.5" font-weight="700" fill="${options.color || INDIGO}">${esc(fmt(last.value))}</text>`;
  return out + '</svg>';
}

// Donut chart with a centre total. slices: [{label, value}]
export function donutChart(slices, options = {}) {
  const size = options.size || 300;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 14;
  const hole = r * 0.58;
  const total = slices.reduce((s, p) => s + p.value, 0);
  const fmt = options.format || ((v) => `${v}%`);
  let out = `<svg viewBox="0 0 ${size} ${size}" role="img" aria-label="${esc(options.aria || 'Donut chart')}">`;
  let angle = -Math.PI / 2;
  slices.forEach((s, i) => {
    const frac = s.value / total;
    const a0 = angle;
    const a1 = angle + frac * Math.PI * 2;
    angle = a1;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const xi1 = cx + hole * Math.cos(a1);
    const yi1 = cy + hole * Math.sin(a1);
    const xi0 = cx + hole * Math.cos(a0);
    const yi0 = cy + hole * Math.sin(a0);
    const color = PALETTE[i % PALETTE.length];
    if (frac >= 0.999) {
      out += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}"/>`;
      out += `<circle cx="${cx}" cy="${cy}" r="${hole}" fill="#fff"/>`;
    } else {
      out += `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${xi1.toFixed(1)},${yi1.toFixed(1)} A${hole},${hole} 0 ${large} 0 ${xi0.toFixed(1)},${yi0.toFixed(1)} Z" fill="${color}"/>`;
    }
  });
  out += `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="15" font-weight="700" fill="${INDIGO}">${esc(options.centerLabel || 'Total')}</text>`;
  out += `<text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="13" fill="${SLATE}">${esc(fmt(total))}</text>`;
  return out + '</svg>';
}

// Population pyramid. bands: [{band, male, female}] in thousands.
export function pyramidChart(bands, options = {}) {
  const width = options.width || 760;
  const rowH = options.rowHeight || 24;
  const height = 30 + bands.length * rowH + 26;
  const mid = width / 2;
  const pad = { top: 26, bottom: 22, side: 46 };
  const max = Math.max(...bands.flatMap((b) => [b.male, b.female])) * 1.08;
  const half = (mid - pad.side);
  let out = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(options.aria || 'Population pyramid')}">`;
  out += `<text x="${mid - half / 2}" y="16" text-anchor="middle" font-size="12" font-weight="700" fill="${INDIGO}">Male</text>`;
  out += `<text x="${mid + half / 2}" y="16" text-anchor="middle" font-size="12" font-weight="700" fill="${VERMILION}">Female</text>`;
  bands.forEach((b, i) => {
    const y = pad.top + i * rowH;
    const mw = (b.male / max) * half;
    const fw = (b.female / max) * half;
    out += `<rect x="${(mid - mw).toFixed(1)}" y="${y}" width="${mw.toFixed(1)}" height="18" rx="2" fill="${INDIGO}"/>`;
    out += `<rect x="${mid}" y="${y}" width="${fw.toFixed(1)}" height="18" rx="2" fill="${VERMILION}"/>`;
    out += `<text x="${width / 2}" y="${y + 13}" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">${esc(b.band)}</text>`;
  });
  out += `<text x="${pad.side}" y="${height - 6}" font-size="11" fill="${SLATE}">Thousands of people, 2024</text>`;
  return out + '</svg>';
}
