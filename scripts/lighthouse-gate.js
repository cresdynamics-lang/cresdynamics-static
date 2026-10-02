#!/usr/bin/env node
/**
 * Lightweight Lighthouse gate (optional).
 * Requires Chrome/Chromium. Skips cleanly when unavailable.
 *
 * Usage:
 *   BASE_URL=http://127.0.0.1:3001 node scripts/lighthouse-gate.js
 *
 * Thresholds (mobile):
 *   performance >= 0.5 (informational floor for CI; raise after image CDN work)
 *   accessibility >= 0.85
 *   seo >= 0.85
 *   best-practices >= 0.8
 */
const { spawnSync } = require('child_process');
const BASE = (process.env.BASE_URL || 'http://127.0.0.1:3001').replace(/\/$/, '');
const URL = process.env.LH_URL || `${BASE}/`;

const THRESHOLDS = {
  performance: parseFloat(process.env.LH_PERF || '0.5'),
  accessibility: parseFloat(process.env.LH_A11Y || '0.85'),
  'best-practices': parseFloat(process.env.LH_BP || '0.8'),
  seo: parseFloat(process.env.LH_SEO || '0.85'),
};

function hasChrome() {
  const bins = [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
  ].filter(Boolean);
  const fs = require('fs');
  return bins.find((b) => {
    try { return fs.existsSync(b); } catch { return false; }
  });
}

async function main() {
  const chrome = hasChrome();
  if (!chrome && process.env.CI !== 'true') {
    console.warn('Lighthouse gate skipped — Chrome/Chromium not found. Smoke remains the hard gate.');
    process.exit(0);
  }

  let lighthouse;
  try {
    lighthouse = require('lighthouse');
  } catch {
    console.warn('lighthouse package not installed — run: npm i -D lighthouse chrome-launcher');
    if (process.env.LH_REQUIRE === '1') process.exit(1);
    process.exit(0);
  }

  let chromeLauncher;
  try {
    chromeLauncher = require('chrome-launcher');
  } catch {
    console.warn('chrome-launcher not installed — skipping Lighthouse gate');
    if (process.env.LH_REQUIRE === '1') process.exit(1);
    process.exit(0);
  }

  const chromeInst = await chromeLauncher.launch({
    chromePath: chrome || undefined,
    chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],
  });
  try {
    const result = await lighthouse(URL, {
      port: chromeInst.port,
      output: 'json',
      onlyCategories: Object.keys(THRESHOLDS),
      formFactor: 'mobile',
      screenEmulation: { mobile: true, width: 412, height: 823, deviceScaleFactor: 1.75, disabled: false },
    });
    const cats = result.lhr.categories;
    let failed = 0;
    for (const [key, min] of Object.entries(THRESHOLDS)) {
      const score = cats[key]?.score;
      const label = `${key}=${score == null ? 'n/a' : score.toFixed(2)} (min ${min})`;
      if (score == null || score < min) {
        failed += 1;
        console.error(`  FAIL ${label}`);
      } else {
        console.log(`  OK   ${label}`);
      }
    }
    if (failed) {
      console.error(`Lighthouse gate failed for ${URL}`);
      process.exit(1);
    }
    console.log(`Lighthouse gate passed for ${URL}`);
  } finally {
    await chromeInst.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(process.env.LH_REQUIRE === '1' ? 1 : 0);
});
