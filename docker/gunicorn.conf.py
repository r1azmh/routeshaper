"""Keep a long request timeout for the existing synchronous optimization API."""

import os

bind = "0.0.0.0:8000"
workers = int(os.environ.get("GUNICORN_WORKERS", "2"))
worker_class = "sync"
threads = 1
timeout = int(os.environ.get("GUNICORN_TIMEOUT", "600"))
graceful_timeout = 600
accesslog = "-"
errorlog = "-"
capture_output = True
