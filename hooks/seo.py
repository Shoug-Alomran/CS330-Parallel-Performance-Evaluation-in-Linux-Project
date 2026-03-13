from __future__ import annotations

from pathlib import Path
from urllib.parse import urljoin


def _canonical_url(site_url: str, relative_path: str) -> str:
    cleaned = relative_path.replace("\\", "/")
    if cleaned in {"", "."}:
        return site_url.rstrip("/") + "/"
    if cleaned.endswith("index.html"):
        cleaned = cleaned[: -len("index.html")]
    return urljoin(site_url.rstrip("/") + "/", cleaned)


def _inject_meta_robots(html: str, content: str) -> str:
    if 'name="robots"' in html or "name='robots'" in html:
        return html
    return html.replace("</head>", f'  <meta name="robots" content="{content}">\n</head>', 1)


def _replace_canonical(html: str, canonical: str) -> str:
    marker = 'rel="canonical"'
    idx = html.find(marker)
    if idx == -1:
        return html.replace("</head>", f'  <link rel="canonical" href="{canonical}">\n</head>', 1)

    start = html.rfind("<link", 0, idx)
    end = html.find(">", idx)
    if start == -1 or end == -1:
        return html

    tag = html[start : end + 1]
    replacement = f'  <link rel="canonical" href="{canonical}">'
    return html[:start] + replacement + html[end + 1 :]


def _write_robots(site_dir: Path, site_url: str, disallow_rules: list[str]) -> None:
    lines = ["User-agent: *", "Allow: /"]
    lines.extend(f"Disallow: {rule}" for rule in disallow_rules)
    lines.extend(["", f"Sitemap: {site_url.rstrip('/')}/sitemap.xml", ""])
    (site_dir / "robots.txt").write_text("\n".join(lines), encoding="utf-8")


def _write_redirect_stub(target: Path, absolute_url: str) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(
        "\n".join(
            [
                "<!doctype html>",
                '<html lang="en">',
                "  <head>",
                '    <meta charset="utf-8">',
                '    <meta name="robots" content="noindex,follow">',
                f'    <link rel="canonical" href="{absolute_url}">',
                f'    <meta http-equiv="refresh" content="0; url={absolute_url}">',
                f"    <title>Redirecting to {absolute_url}</title>",
                "  </head>",
                "  <body>",
                f'    <p>Redirecting to <a href="{absolute_url}">{absolute_url}</a>.</p>',
                "  </body>",
                "</html>",
                "",
            ]
        ),
        encoding="utf-8",
    )


def on_post_build(config, **kwargs):
    site_dir = Path(config["site_dir"])
    site_url = config.get("site_url", "").strip()
    seo = (config.get("extra") or {}).get("seo") or {}
    noindex_paths = {
        path.strip("/").replace("\\", "/")
        for path in (seo.get("noindex_paths") or [])
        if path
    }

    if site_url:
        _write_robots(site_dir, site_url, seo.get("robots_disallow", []))

    for html_file in site_dir.rglob("*.html"):
        if html_file.name == "404.html":
            html_file.write_text(
                _inject_meta_robots(html_file.read_text(encoding="utf-8"), "noindex,follow"),
                encoding="utf-8",
            )
            continue

        if html_file.name != "index.html":
            relative_path = html_file.relative_to(site_dir).as_posix()
            html = html_file.read_text(encoding="utf-8")
            canonical = _canonical_url(site_url, relative_path) if site_url else ""
            if canonical:
                html = _replace_canonical(html, canonical)
            html = _inject_meta_robots(html, "noindex,follow")
            html_file.write_text(html, encoding="utf-8")
            continue

        relative_dir = html_file.relative_to(site_dir).parent.as_posix().strip(".").strip("/")
        if relative_dir in noindex_paths:
            html_file.write_text(
                _inject_meta_robots(html_file.read_text(encoding="utf-8"), "noindex,follow"),
                encoding="utf-8",
            )

    if site_url:
        for source, destination in (seo.get("legacy_redirects") or {}).items():
            _write_redirect_stub(site_dir / source, urljoin(site_url.rstrip("/") + "/", destination.lstrip("/")))
