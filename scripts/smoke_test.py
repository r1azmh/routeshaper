#!/usr/bin/env python3
"""Read-only HTTP checks for the running, compiled application (stdlib only)."""

import argparse
import re
from urllib.request import ProxyHandler, build_opener


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("base_url", nargs="?", default="http://localhost:8000")
    args = parser.parse_args()
    base = args.base_url.rstrip("/")
    opener = build_opener(ProxyHandler({}))

    def get(path):
        with opener.open(base + path, timeout=15) as response:
            return response.status, response.headers.get_content_type(), response.read()

    for path in ("/", "/signup/", "/login/"):
        status, content_type, body = get(path)
        assert status == 200 and content_type == "text/html", path
        assert b'id="root"' in body, f"Missing React entry point at {path}"
        assert b"{%" not in body and b"{{" not in body, "Django template not rendered"
        print(f"PASS {path}")

    html = get("/login/")[2].decode()
    assets = re.findall(r'(?:src|href)=[\'"](/static/[^\'"]+)[\'"]', html)
    assert any(asset.endswith(".js") for asset in assets), "Missing JavaScript bundle"
    assert any(asset.endswith(".css") for asset in assets), "Missing CSS bundle"
    for asset in assets:
        status, content_type, body = get(asset)
        assert status == 200 and body, asset
        assert content_type != "text/html", f"HTML served instead of asset: {asset}"
        if asset.endswith(".js"):
            assert content_type in ("text/javascript", "application/javascript"), content_type
        if asset.endswith(".css"):
            assert content_type == "text/css", content_type
        print(f"PASS {asset} ({content_type})")

    status, content_type, body = get("/logo.png")
    assert status == 200 and content_type == "image/png", "Public logo not served"
    assert body.startswith(b"\x89PNG\r\n\x1a\n"), "Logo response is not PNG"
    print("PASS /logo.png")
    print("PASS: compiled frontend and backend are served from one origin.")


if __name__ == "__main__":
    main()
