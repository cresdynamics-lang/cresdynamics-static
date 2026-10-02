# Deploy & staging hygiene — CRES Dynamics

This host runs **multiple apps**. Never treat Contabo as a single-site box.

## Rules

1. **Touch only `cresdynamics`** — PM2 process name / app directory `/var/www/sites/cresdynamics.com`.
2. **Never** restart, kill, or reconfigure sibling apps (elijays, etc.).
3. Prefer **`app-restart` / `pm2-safe`** wrappers over raw `pm2 restart all`.
4. Keep event registration lockdown unless you intentionally re-open after spam controls prove stable.
5. Deploy from a reviewed commit; avoid rsync `--delete` against shared parent paths.

## Local → Contabo (marketing site)

```bash
# From laptop (example)
rsync -az --exclude node_modules --exclude .git --exclude .env \
  ./ contabo:/var/www/sites/cresdynamics.com/

ssh contabo 'cd /var/www/sites/cresdynamics.com && npm install --omit=dev && app-restart cresdynamics'
```

Verify:

```bash
curl -sf https://cresdynamics.com/health
curl -sf https://cresdynamics.com/ | head -c 200
pm2 describe cresdynamics   # memory cap intact, only this process restarted
```

## Staging hygiene

- Use a **branch + PR** for Phase changes; run `npm run smoke` against a local `PORT=3001` server.
- Keep `.env` off git. Sync secrets via Contabo only.
- After deploy, check:
  - `/health` → `status: ok` (DB up)
  - `/contact` form honeypot still present
  - Nav hover images still load
  - Sibling apps still respond (spot-check their public URL / API)

## Monitoring

| Signal | Where |
|--------|--------|
| Process up | PM2 + `/health` |
| Bot / abuse spike | Email alert when rejects+429 ≥ `BOT_SPIKE_THRESHOLD` (default 40 / window). Stats: `/api/admin/abuse-stats` |
| Daily event summary | Cron 20:00 Africa/Nairobi |

Env knobs:

```
BOT_SPIKE_THRESHOLD=40
BOT_SPIKE_COOLDOWN_MS=3600000
ALERT_EMAIL=info@cresdynamics.com
```

## Rollback

Keep dated backups under `/root/backups/cresdynamics-premerge-*` (or create one before deploy).

```bash
# restore tree then
app-restart cresdynamics
```

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs smoke on PR/push. Lighthouse is soft by default (`LH_REQUIRE=0`); set `LH_REQUIRE=1` when you want it hard-fail.
