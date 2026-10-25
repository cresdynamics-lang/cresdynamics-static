#!/usr/bin/env bash
# Nightly PostgreSQL backup for cresdynamics.com. Read-only on the database.
#
# Writes a compressed dump to $BACKUP_DIR (default: <app>/backups), keeps
# $BACKUP_KEEP_DAYS days (default 7), and, when BACKUP_RCLONE_REMOTE is set
# (e.g. "spaces:cres-backups"), also copies each dump off the server with rclone.
#
# Cron (as site_cresdynamics): 15 2 * * * /var/www/sites/cresdynamics.com/scripts/backup-db.sh
set -euo pipefail

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
set -a; source "$APP_DIR/.env"; set +a

BACKUP_DIR="${BACKUP_DIR:-$APP_DIR/backups}"
KEEP_DAYS="${BACKUP_KEEP_DAYS:-7}"
STAMP="$(date -u +%Y%m%d-%H%M%S)"
OUT="$BACKUP_DIR/cresdynamics-db-$STAMP.sql.gz"

mkdir -p "$BACKUP_DIR"
chmod 700 "$BACKUP_DIR"

# Custom-format-free plain SQL keeps restores simple: gunzip -c file | psql "$DATABASE_URL"
pg_dump --no-owner --no-privileges "$DATABASE_URL" | gzip -6 > "$OUT.partial"
mv "$OUT.partial" "$OUT"
chmod 600 "$OUT"

# Sanity check: a valid dump ends with the PostgreSQL completion marker
if ! gunzip -c "$OUT" | tail -n 5 | grep -q "PostgreSQL database dump complete"; then
  echo "[backup] dump incomplete: $OUT" >&2
  exit 1
fi

if [ -n "${BACKUP_RCLONE_REMOTE:-}" ] && command -v rclone >/dev/null 2>&1; then
  rclone copy "$OUT" "$BACKUP_RCLONE_REMOTE" --quiet
fi

find "$BACKUP_DIR" -name 'cresdynamics-db-*.sql.gz' -mtime +"$KEEP_DAYS" -delete
echo "[backup] ok $(du -h "$OUT" | cut -f1) $OUT"
