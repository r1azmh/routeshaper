#!/bin/sh
set -eu

if [ -z "${SECRET_KEY:-}" ] || [ -z "${ORS_SECRET_KEY:-}" ]; then
    echo "Set SECRET_KEY and ORS_SECRET_KEY in the root .env file." >&2
    exit 1
fi

mkdir -p "${APP_DATA_DIR:-/data}"
if [ ! -w "${APP_DATA_DIR:-/data}" ]; then
    echo "The database directory must be writable by container user 10001." >&2
    exit 1
fi

# Explicit commands (e.g. manage.py, backups) should have no startup side effects.
if [ "${1:-}" = "gunicorn" ]; then
    python manage.py migrate --noinput
    python manage.py collectstatic --noinput
fi

exec "$@"
