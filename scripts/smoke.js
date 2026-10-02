#!/usr/bin/env node
/**
 * Smoke checks for cresdynamics key routes.
 * Usage: BASE_URL=http://127.0.0.1:3001 node scripts/smoke.js
 */
const BASE = (process.env.BASE_URL || 'http://127.0.0.1:3001').replace(/\/$/, '');

const ROUTES = [
  { path: '/', mustInclude: ['Intelligent Systems That Run Your Business', 'home-hero'] },
  { path: '/cresos', mustInclude: ['CresOS', 'product-hero'] },
  { path: '/case-studies', mustInclude: ['case-featured', 'Outcomes you can measure'] },
  { path: '/contact', mustInclude: ['contact-split', 'contact-form'] },
  { path: '/industries', mustInclude: ['Hospitality', 'Retail'] },
  { path: '/industries/hospitality', mustInclude: ['Hospitality'] },
  { path: '/industries/retail', mustInclude: ['Retail'] },
  { path: '/industries/multi-unit', mustInclude: ['Multi-unit'] },
  { path: '/blog', mustInclude: ['Blog', 'blog-grid'] },
  { path: '/data-security', mustInclude: ['Data', 'Security'] },
  { path: '/css/styles.css', mustInclude: ['--font-display', '.home-hero'] },
  { path: '/health', mustInclude: ['"status"'], allowStatus: [200, 503] },
  { path: '/sitemap.xml', mustInclude: ['<urlset', '/industries'] },
  { path: '/robots.txt', mustInclude: ['Sitemap:'] },
];

async function check(route) {
  const url = BASE + route.path;
  const res = await fetch(url, { redirect: 'follow' });
  const text = await res.text();
  const errors = [];
  const allowed = route.allowStatus;
  if (allowed) {
    if (!allowed.includes(res.status)) errors.push(`status ${res.status}`);
  } else if (res.status < 200 || res.status >= 400) {
    errors.push(`status ${res.status}`);
  }
  for (const needle of route.mustInclude || []) {
    if (!text.includes(needle)) errors.push(`missing "${needle}"`);
  }
  return { path: route.path, ok: errors.length === 0, status: res.status, errors, bytes: text.length };
}

(async () => {
  console.log(`Smoke → ${BASE}`);
  let failed = 0;
  for (const route of ROUTES) {
    try {
      const r = await check(route);
      if (r.ok) {
        console.log(`  OK  ${r.status} ${r.path} (${r.bytes}b)`);
      } else {
        failed += 1;
        console.error(`  FAIL ${r.status} ${r.path}: ${r.errors.join('; ')}`);
      }
    } catch (err) {
      failed += 1;
      console.error(`  FAIL ${route.path}: ${err.message}`);
    }
  }
  if (failed) {
    console.error(`\n${failed} smoke check(s) failed`);
    process.exit(1);
  }
  console.log('\nAll smoke checks passed');
})();
