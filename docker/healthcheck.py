"""Check a real Django page using a host accepted by ALLOWED_HOSTS."""

import os
import sys
from urllib.request import ProxyHandler, Request, build_opener


def main():
    hosts = os.environ.get("ALLOWED_HOSTS", "localhost,127.0.0.1").split(",")
    host = hosts[0].strip().lstrip(".")
    if not host or host == "*":
        host = "localhost"
    request = Request("http://127.0.0.1:8000/login/", headers={"Host": host})
    try:
        with build_opener(ProxyHandler({})).open(request, timeout=4) as response:
            if response.status != 200 or b'id="root"' not in response.read():
                raise RuntimeError("The Django/React entry page was not returned")
    except Exception as exc:
        print(f"Health check failed: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
