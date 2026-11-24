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

## Per-site access log (added 2026-11-24)

The shared `/var/log/nginx/access.log` has no hostname, so traffic for each site
can't be separated. cresdynamics.com now also writes
`/var/log/nginx/cresdynamics.access.log` using the `cres` format in
`/etc/nginx/conf.d/cresdynamics-log.conf` (copy: `cresdynamics-log.conf`).
It records the real visitor IP (`CF-Connecting-IP`), host, referrer, user agent,
response time and Cloudflare country. It is rotated by the stock nginx logrotate
rule: daily, 14 days kept.

`cresdynamics.site.conf` is a copy of `/etc/nginx/sites-available/cresdynamics`
(Certbot-managed TLS lines included). The previous version is on the server as
`/etc/nginx/sites-available/cresdynamics.bak-20261124-1921`.

Quick reads:

    sudo awk -F'"' '{print $6}' /var/log/nginx/cresdynamics.access.log | grep -E 'google|bing|chatgpt|perplexity' | sort | uniq -c | sort -rn
    sudo grep -E 'ChatGPT-User|Claude-User|Perplexity-User' /var/log/nginx/cresdynamics.access.log

## Real visitor IP behind Cloudflare (added 2026-11-24)

`/etc/nginx/snippets/cloudflare-realip.conf` (copy: `cloudflare-realip.conf`) trusts
Cloudflare's published edge ranges and takes the visitor IP from `CF-Connecting-IP`.
It is included only in the cresdynamics.com server block. Without it every visitor
looked like a Cloudflare IP to the app: visit geography was wrong and per-IP form
limits were shared by everyone on the same Cloudflare edge. Refresh the ranges from
https://www.cloudflare.com/ips if Cloudflare announces changes.
