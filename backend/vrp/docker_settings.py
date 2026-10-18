"""Container-specific paths and static serving; application settings are inherited."""

import os
from pathlib import Path

from .settings import *  # noqa: F401,F403


DATA_DIR = Path(os.environ.get("APP_DATA_DIR", "/data"))
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": DATA_DIR / "mydatabase",
        "OPTIONS": {"timeout": 30},
    }
}

# Keep Vite's existing names and Django template tags. No second asset hashing.
STATIC_ROOT = BASE_DIR / "staticfiles"
MIDDLEWARE = list(MIDDLEWARE)
MIDDLEWARE.insert(
    MIDDLEWARE.index("django.middleware.security.SecurityMiddleware") + 1,
    "whitenoise.middleware.WhiteNoiseMiddleware",
)
# React requests /logo.png from the site root.
# Only frontend/public is exposed here, never the backend's working directory.
WHITENOISE_ROOT = BASE_DIR.parent / "public"

# Same-origin local installs need no entry. Include scheme and port for proxies.
CSRF_TRUSTED_ORIGINS = env.list("CSRF_TRUSTED_ORIGINS", default=[])

# Allow web map providers to receive the application origin as Referer.
SECURE_REFERRER_POLICY = "strict-origin-when-cross-origin"
