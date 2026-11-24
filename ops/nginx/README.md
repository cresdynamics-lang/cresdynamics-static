# Shared nginx settings (DigitalOcean droplet, all 13 sites)

These live outside the app and affect every site on the server. Change them only with care.

| File on server | What | Why |
|---|---|---|
| `/etc/nginx/nginx.conf` | `worker_connections 4096` (was 768), `worker_rlimit_nofile 16384` | On 24 Nov 2026 nginx logged 3.8M "worker_connections are not enough" errors and every site, cresdynamics included, timed out intermittently |
| `/etc/nginx/conf.d/scraper-limit.conf` (copy in this folder) | Limits Python aiohttp / requests / Scrapy clients to 30 requests a minute per IP | One aiohttp scraper made about 79% of all requests |

Backup of the previous config: `/etc/nginx/nginx.conf.bak-20261124`.

Apply or roll back:

```bash
sudo nginx -t && sudo systemctl reload nginx            # after any change
sudo cp /etc/nginx/nginx.conf.bak-20261124 /etc/nginx/nginx.conf
sudo rm /etc/nginx/conf.d/scraper-limit.conf
sudo nginx -t && sudo systemctl reload nginx            # roll back
```
