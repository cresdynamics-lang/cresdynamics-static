# Deploying cresdynamics.com

Production runs on a DigitalOcean droplet at **143.198.169.74** (SSH alias `do-new`, user `deploy` with sudo). The droplet hosts about 13 sites. Touch only cresdynamics.

## Layout on the server

| What | Where |
|------|-------|
| App directory | `/var/www/sites/cresdynamics.com` (owner `site_cresdynamics:websites`, mode 750, not a git checkout) |
| Process | PM2 under user `site_cresdynamics`, app name `cresdynamics`, `PM2_HOME=/var/www/sites/cresdynamics.com/.pm2` |
| Port | Node listens on `127.0.0.1:3000`; nginx proxies `cresdynamics.com` to it (`/etc/nginx/sites-enabled/cresdynamics`) |
| Secrets | `/var/www/sites/cresdynamics.com/.env` (never committed) |
| Database | PostgreSQL 16 on `127.0.0.1` |
| DB backups | `/var/www/sites/cresdynamics.com/backups`, nightly 02:15 UTC, 7 days kept |

## Deploy

```bash
# 1. From the repo, on a reviewed commit that is pushed to GitHub main
python3 scripts/optimize-images.py          # only if images were added
ssh do-new 'rm -rf ~/cres-deploy && mkdir -p ~/cres-deploy'
rsync -az --relative server.js lib scripts views public db do-new:cres-deploy/

# 2. Install into the app directory and restart only cresdynamics
ssh do-new 'APP=/var/www/sites/cresdynamics.com
  sudo rsync -a --chown=site_cresdynamics:websites --chmod=D750,F640 ~/cres-deploy/ $APP/
  sudo chmod 750 $APP/scripts/*.sh $APP/scripts/uptime-check.js
  sudo -u site_cresdynamics node --check $APP/server.js
  sudo -u site_cresdynamics env PM2_HOME=$APP/.pm2 pm2 restart cresdynamics --update-env
  rm -rf ~/cres-deploy'
```

If `package.json` changed, run `sudo -u site_cresdynamics bash -c 'cd $APP && npm install --omit=dev'` before the restart.

Never use `rsync --delete` against the app directory: it holds `.env`, `uploads/`, `logs/`, `backups/` and `.pm2/`, which are not in git.

## Verify

```bash
curl -sf https://cresdynamics.com/health          # {"status":"ok",...,"db":"up"}
BASE_URL=https://cresdynamics.com npm run smoke   # all checks pass
curl -sI https://www.cresdynamics.com/ | grep -i location   # 301 to apex
```

Spot-check that sibling sites still answer (each should return 200 or a 302 to its login):

```bash
ssh do-new 'for h in $(ls /var/www/sites); do echo "$(curl -sk -o /dev/null -w "%{http_code}" --resolve $h:443:127.0.0.1 https://$h/) $h"; done'
```

## Optional switches (set in `.env`, then restart)

| Variable | Effect |
|----------|--------|
| `GOOGLE_SITE_VERIFICATION` | Adds the Search Console verification meta tag |
| `GA4_ID` (`G-XXXX`) | Loads Google Analytics 4; WhatsApp clicks, phone taps and enquiries are sent as events |
| `CLARITY_ID` | Loads Microsoft Clarity |
| `TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile check on every enquiry form |
| `BOOKING_URL` | Calendar link for "book a call" buttons (default: email to info@cresdynamics.com) |
| `BACKUP_RCLONE_REMOTE` | Copies each nightly DB dump off the server with rclone (e.g. `spaces:cres-backups`) |
| `ALERT_EMAIL` | Where uptime and bot-spike alerts go (default info@cresdynamics.com) |

## Restore a database backup

```bash
gunzip -c backups/cresdynamics-db-YYYYMMDD-HHMMSS.sql.gz | psql "$DATABASE_URL"
```

Restore into a fresh database first and check it before pointing the app at it.

## Rules

1. Commit and push to GitHub `main` before deploying, so the repo matches production.
2. Restart only `cresdynamics`. Never restart all PM2 apps or reload nginx without checking the other sites.
3. Never delete database rows during a deploy. Data clean-ups need written approval from Cres.
