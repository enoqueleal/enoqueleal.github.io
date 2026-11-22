#!/usr/bin/env python3
"""
Importa os artigos do DEV.to para o blog Hugo (page bundles em português).

Só lê a API pública do DEV.to (GET, sem chave). Não altera nada no DEV.to.
Usa apenas a biblioteca padrão do Python. A saída é determinística: rodar de
novo sem mudanças no DEV.to gera arquivos idênticos byte a byte.

Uso (a partir da raiz do repositório):
    python3 scripts/devto-import.py                      # importa todos
    python3 scripts/devto-import.py --only 1554716       # só um artigo
    python3 scripts/devto-import.py --dry-run            # mostra o que faria

Spec: openspec/changes/import-devto-articles
"""

import argparse
import json
import os
import re
import shutil
import sys
import tempfile
import time
import unicodedata
import urllib.error
import urllib.parse
import urllib.request

API = "https://dev.to/api"
USER_AGENT = "enoque.dev-blog-importer/1.0"
REQUEST_INTERVAL = 3          # segundos entre requisições à API
MAX_RETRIES = 5

# Vocabulário de tags (design D4). None = descartar.
# Tags são hashtags: só minúsculas e dígitos, sem acento, espaço ou hífen (ex.: "bancodedados").
TAG_MAP = {
    "java": "java",
    "go": "go",
    "aws": "aws",
    "awstraining": "aws",
    "cloud": "cloud",
    "ai": "ia",
    "aipractitioner": "certificacao",
    "cloudpractitioner": "certificacao",
    "monolith": "arquitetura",
    "development": "arquitetura",
    "microservices": "microsservicos",
    "h2db": "bancodedados",
    "dbcp": "bancodedados",
    "backend": "backend",
    "developement": None,  # erro de digitação no original
}

HASHTAG_RE = re.compile(r"^[a-z0-9]+$")
for _tag in TAG_MAP.values():
    if _tag is not None and not HASHTAG_RE.match(_tag):
        raise SystemExit(f"tag fora do formato de hashtag em TAG_MAP: {_tag!r}")

# Ajustes editoriais de título, além da remoção automática de "[ pt-BR ]".
TITLE_OVERRIDES = {
    995475: "Golang for Java Developers: parte 1",
    1470497: "Criando um pool de conexões com Apache Commons DBCP",
}

# Texto alternativo para imagens sem descrição útil no original.
# Chave: (id do artigo, índice da imagem no corpo, a partir de 1).
ALT_OVERRIDES = {
    (1554716, 1): "Meme: um gato em primeiro plano com a legenda “eu, chamando sem querer uma função Lambda "
                  "recursivamente”, enquanto um homem identificado como AWS toca um tambor identificado como "
                  "“minha conta da AWS”, com cifrões que aumentam de $ para $$$$",
}

# Imagens substituídas por uma versão otimizada versionada no repositório, em vez do download.
# Motivo: o GIF original do meme tem ~19 MB (224 quadros). O primeiro quadro, estático, já mostra
# o meme completo com as legendas e tem poucos KB.
LOCAL_IMAGE_OVERRIDES = {
    (1554716, 1): "scripts/devto-assets/1554716-image-1.jpg",
}

GENERIC_ALTS = {"", "image description", "image", "imagem"}


def log(msg):
    print(msg, file=sys.stderr)


def http_get(url, binary=False):
    """GET com retry e backoff para HTTP 429 e erros 5xx."""
    for attempt in range(1, MAX_RETRIES + 1):
        req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, "Accept": "*/*"})
        try:
            with urllib.request.urlopen(req, timeout=60) as res:
                data = res.read()
                return (data, res.headers.get("Content-Type", "")) if binary else data.decode("utf-8")
        except urllib.error.HTTPError as e:
            if e.code == 429 or e.code >= 500:
                wait = REQUEST_INTERVAL * (2 ** attempt)
                log(f"  HTTP {e.code} em {url}; nova tentativa em {wait}s ({attempt}/{MAX_RETRIES})")
                time.sleep(wait)
                continue
            raise
    raise RuntimeError(f"falha após {MAX_RETRIES} tentativas: {url}")


def api(path):
    time.sleep(REQUEST_INTERVAL)
    return json.loads(http_get(f"{API}{path}"))


def strip_devto_front_matter(body):
    if body.startswith("---"):
        end = body.find("\n---", 3)
        if end == -1:
            raise ValueError("front matter do DEV.to sem fechamento")
        body = body[end + 4:]
    return body.lstrip("\n")


def clean_title(article):
    if article["id"] in TITLE_OVERRIDES:
        return TITLE_OVERRIDES[article["id"]]
    title = re.sub(r"\s*\[\s*pt-BR\s*\]\s*", " ", article["title"], flags=re.I)
    return re.sub(r"\s+", " ", title).strip()


def slug_words(text):
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode().lower()
    return set(re.findall(r"[a-z0-9]+", text))


def clean_slug(slug, title):
    """Remove o sufixo de hash do DEV.to (último segmento que não é palavra do título)."""
    parts = slug.split("-")
    if parts and parts[-1] not in slug_words(title):
        parts = parts[:-1]
    slug = "-".join(p for p in parts if p)
    slug = re.sub(r"-pt-br$", "", slug)
    return slug.strip("-")


def map_tags(tag_list):
    tags = []
    for tag in tag_list:
        key = tag.strip().lower()
        if key not in TAG_MAP:
            raise ValueError(f"tag sem mapeamento no vocabulário: {key!r} (adicione em TAG_MAP)")
        mapped = TAG_MAP[key]
        if mapped and mapped not in tags:
            tags.append(mapped)
    return tags


def demote_headings(body):
    """Se o corpo usa H1, rebaixa todos os títulos um nível (fora de blocos de código)."""
    lines = body.split("\n")
    in_code = False
    uses_h1 = False
    for line in lines:
        if line.lstrip().startswith("```"):
            in_code = not in_code
        elif not in_code and re.match(r"^# \S", line):
            uses_h1 = True
            break
    if not uses_h1:
        return body
    out, in_code = [], False
    for line in lines:
        if line.lstrip().startswith("```"):
            in_code = not in_code
        elif not in_code and re.match(r"^#{1,5} ", line):
            line = "#" + line
        out.append(line)
    return "\n".join(out)


HTML_TAGS = {
    "a", "abbr", "b", "br", "code", "del", "details", "div", "em", "hr", "i", "img", "kbd", "li",
    "ol", "p", "pre", "s", "small", "span", "strong", "sub", "summary", "sup", "table", "tbody",
    "td", "th", "thead", "tr", "u", "ul",
}


def escape_pseudo_tags(body):
    """
    Fora de blocos e trechos de código, coloca entre crases marcações como <dependencies>,
    que o navegador trataria como tag HTML desconhecida (o texto sumiria).
    Mantém tags HTML conhecidas e autolinks (<https://...>).
    """
    out, in_code = [], False
    for line in body.split("\n"):
        if line.lstrip().startswith("```"):
            in_code = not in_code
            out.append(line)
            continue
        if in_code:
            out.append(line)
            continue
        parts = re.split(r"(`[^`]*`)", line)  # preserva código inline
        for i, part in enumerate(parts):
            if i % 2 == 0:
                parts[i] = re.sub(
                    r"<(/?)([A-Za-z][\w.-]*)>",
                    lambda m: m.group(0) if m.group(2).lower() in HTML_TAGS else f"`{m.group(0)}`",
                    part,
                )
        out.append("".join(parts))
    return "\n".join(out)


def check_unsupported(body, article_id):
    in_code = False
    for line in body.split("\n"):
        if line.lstrip().startswith("```"):
            in_code = not in_code
        elif not in_code and "{%" in line:
            raise ValueError(f"artigo {article_id}: liquid tag não suportada: {line.strip()[:80]}")


def original_cover_url(cover):
    """A capa vem embrulhada no CDN media2.dev.to; usa a URL original do S3."""
    if not cover:
        return None
    m = re.search(r"(https?%3A%2F%2F.+)$", cover)
    return urllib.parse.unquote(m.group(1)) if m else cover


def extension(url, content_type):
    ext = os.path.splitext(urllib.parse.urlparse(url).path)[1].lower()
    if ext in (".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"):
        return ".jpg" if ext == ".jpeg" else ext
    by_type = {"image/png": ".png", "image/jpeg": ".jpg", "image/gif": ".gif", "image/webp": ".webp"}
    for t, e in by_type.items():
        if t in content_type:
            return e
    raise ValueError(f"tipo de imagem desconhecido: {url} ({content_type})")


def yaml_str(value):
    # Strings JSON são strings YAML válidas entre aspas duplas
    return json.dumps(value, ensure_ascii=False)


def build_front_matter(article, title, tags):
    lines = [
        "---",
        f"title: {yaml_str(title)}",
        f"date: {article['published_at']}",
    ]
    if article.get("edited_at"):
        lines.append(f"lastmod: {article['edited_at']}")
    lines += [
        f"tags: {json.dumps(tags, ensure_ascii=False)}",
        f"summary: {yaml_str(article['description'].strip())}",
        "devto:",
        f"  id: {article['id']}",
        f"  url: {article['url']}",
        "---",
        "",
    ]
    return "\n".join(lines)


def import_article(summary, out_dir, dry_run):
    article = api(f"/articles/{summary['id']}")
    aid = article["id"]
    title = clean_title(article)
    slug = clean_slug(article["slug"], article["title"])
    tags = map_tags(article["tag_list"] if isinstance(article["tag_list"], list) else article["tag_list"].split(","))

    body = strip_devto_front_matter(article["body_markdown"])
    check_unsupported(body, aid)
    body = demote_headings(body)
    body = escape_pseudo_tags(body)

    downloads = []  # (url, nome do arquivo)
    cover = original_cover_url(article.get("cover_image"))

    counter = {"n": 0}

    def replace_image(m):
        counter["n"] += 1
        alt, url = m.group(1).strip(), m.group(2).strip()
        if (aid, counter["n"]) in ALT_OVERRIDES:
            alt = ALT_OVERRIDES[(aid, counter["n"])]
        elif alt.lower() in GENERIC_ALTS:
            raise ValueError(f"artigo {aid}, imagem {counter['n']}: alt genérico ({alt!r}); defina em ALT_OVERRIDES")
        name = f"image-{counter['n']}"
        downloads.append((LOCAL_IMAGE_OVERRIDES.get((aid, counter["n"]), url), name))
        return f"![{alt}]({name}{{ext:{name}}})"

    body = re.sub(r"!\[([^\]]*)\]\(([^)\s]+)\)", replace_image, body)

    log(f"- {aid} {slug}: {title!r} tags={tags} imagens={len(downloads)} capa={'sim' if cover else 'não'}")
    if dry_run:
        return slug

    # Baixa tudo num diretório temporário; só grava o bundle se nada falhar
    tmp = tempfile.mkdtemp(prefix="devto-")
    try:
        files = {}
        if cover:
            data, ctype = http_get(cover, binary=True)
            files["thumbnail" + extension(cover, ctype)] = data
        for url, name in downloads:
            if url.startswith("http"):
                data, ctype = http_get(url, binary=True)
            else:
                with open(url, "rb") as fh:
                    data, ctype = fh.read(), ""
            ext = extension(url, ctype)
            files[name + ext] = data
            body = body.replace(f"{{ext:{name}}}", ext)

        content = build_front_matter(article, title, tags) + "\n" + body.rstrip() + "\n"
        bundle = os.path.join(out_dir, slug)
        for name, data in files.items():
            with open(os.path.join(tmp, name), "wb") as fh:
                fh.write(data)
            log(f"    {name}: {len(data) / 1024:.0f} KB")
        with open(os.path.join(tmp, "index.md"), "w", encoding="utf-8") as fh:
            fh.write(content)

        if os.path.isdir(bundle):
            shutil.rmtree(bundle)
        shutil.copytree(tmp, bundle)
        os.chmod(bundle, 0o755)  # o diretório temporário nasce com 0700
    finally:
        shutil.rmtree(tmp, ignore_errors=True)
    return slug


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--username", default="enoqueleal")
    parser.add_argument("--out", default="blog/content.pt/posts")
    parser.add_argument("--only", type=int, nargs="*", help="IDs dos artigos a importar")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    articles = api(f"/articles?username={urllib.parse.quote(args.username)}&per_page=100")
    if args.only:
        articles = [a for a in articles if a["id"] in args.only]
    articles.sort(key=lambda a: a["published_at"])
    log(f"{len(articles)} artigo(s) de {args.username}")

    errors = 0
    for summary in articles:
        try:
            import_article(summary, args.out, args.dry_run)
        except Exception as e:  # noqa: BLE001 - relata e segue para os demais
            errors += 1
            log(f"  ERRO no artigo {summary['id']}: {e}")
    if errors:
        log(f"{errors} artigo(s) com erro; nada foi gravado para eles.")
        sys.exit(1)


if __name__ == "__main__":
    main()
