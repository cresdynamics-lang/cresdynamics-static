#!/usr/bin/env node
/**
 * Uptime check for cresdynamics.com, run by cron every 5 minutes.
 * Emails info@cresdynamics.com when the site fails two checks in a row,
 * and again when it recovers. State lives in a small JSON file.
 *
 * Cron (as site_cresdynamics): *\/5 * * * * cd /var/www/sites/cresdynamics.com && node scripts/uptime-check.js
 *
 * This runs on the same server, so it catches the app or database failing but
 * not the whole server going down; pair it with an external monitor for that.
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const fs = require('fs');
const path = require('path');
const { sendEmail, hasResendConfigured } = require('../lib/email');

const BASE = (process.env.UPTIME_BASE_URL || 'https://cresdynamics.com').replace(/\/$/, '');
const TO = process.env.ALERT_EMAIL || 'info@cresdynamics.com';
const STATE = path.join(__dirname, '..', 'logs', 'uptime-state.json');

async function probe(url, mustInclude) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 15000);
  try {
    const res = await fetch(url, { signal: ctrl.signal, headers: { 'User-Agent': 'Mozilla/5.0 (cres-uptime-check)' } });
    const text = await res.text();
    if (res.status !== 200) return `${url} returned ${res.status}`;
    if (mustInclude && !text.includes(mustInclude)) return `${url} is missing "${mustInclude}"`;
    return '';
  } catch (err) {
    return `${url} did not respond (${err.name === 'AbortError' ? 'timeout' : err.message})`;
  } finally {
    clearTimeout(timer);
  }
}

(async () => {
  const problems = (await Promise.all([
    probe(`${BASE}/health`, '"status":"ok"'),
    probe(`${BASE}/`, 'Cres Dynamics'),
  ])).filter(Boolean);

  let state = { failures: 0, alerted: false };
  try { state = JSON.parse(fs.readFileSync(STATE, 'utf8')); } catch (_) {}

  const now = new Date().toISOString();
  if (problems.length) {
    state.failures += 1;
    if (state.failures >= 2 && !state.alerted && hasResendConfigured()) {
      await sendEmail({
        to: TO,
        subject: 'ALERT: cresdynamics.com is down',
        html: `<p>Checked at ${now}:</p><ul>${problems.map((p) => `<li>${p}</li>`).join('')}</ul><p>Restart: sudo -u site_cresdynamics env PM2_HOME=/var/www/sites/cresdynamics.com/.pm2 pm2 restart cresdynamics</p>`,
      });
      state.alerted = true;
    }
    console.error(`[uptime] ${now} FAIL ${problems.join(' | ')}`);
  } else {
    if (state.alerted && hasResendConfigured()) {
      await sendEmail({ to: TO, subject: 'RESOLVED: cresdynamics.com is back up', html: `<p>All checks passed at ${now}.</p>` });
    }
    state = { failures: 0, alerted: false };
  }
  fs.mkdirSync(path.dirname(STATE), { recursive: true });
  fs.writeFileSync(STATE, JSON.stringify(state));
})();
