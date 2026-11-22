# enoqueleal.github.io

URL: https://enoque.dev

## Descrição
Esse é o repositório do meu site pessoal, construído para divulgação do meu portfólio e de conteúdo que venho criando ao passar do tempo.

| Caminho publicado | Origem no repositório | Tecnologia |
|---|---|---|
| `/` | `index.html`, `css/`, `js/`, `fonts/`, `img/` | HTML 5, CSS 3, JavaScript, Bootstrap 3.3, jQuery |
| `/blog/` (PT) e `/blog/en/` (EN) | `blog/` | [Hugo](https://gohugo.io) extended + tema [hugo-book](https://github.com/alex-shpak/hugo-book) (submódulo) |
| `/design-patterns-quiz/` | `design-patterns-quiz/` | HTML, CSS, jQuery |

## Clonar

```sh
git clone --recurse-submodules https://github.com/enoqueleal/enoqueleal.github.io.git
# se já clonou sem submódulos:
git submodule update --init --recursive
```

## Blog (Hugo)

**Versão do Hugo: `0.158.0` extended**, a mesma usada no CI (`HUGO_VERSION` em `.github/workflows/deploy.yml`). Ao atualizar uma, atualize a outra.

Instalação no macOS sem Homebrew: baixe `hugo_extended_<versão>_darwin-universal.pkg` em https://github.com/gohugoio/hugo/releases, instale e confira:

```sh
hugo version   # deve mostrar a versão acima com "+extended"
```

Comandos (a partir da raiz do repositório):

```sh
hugo server --source blog                                       # desenvolvimento em http://localhost:1313/blog/
hugo new --source blog content.pt/posts/meu-artigo.md           # novo artigo em português
hugo new --source blog content.en/posts/meu-artigo.md           # tradução (mesmo nome de arquivo = páginas vinculadas)
hugo new --source blog content.pt/docs/java/streams.md          # nova página na trilha Java
```

### Organização

| Pasta | No menu | URL (PT / EN) | Para quê |
|---|---|---|---|
| `posts/` | **Artigos** (lista, não um a um) | `/blog/posts/<slug>/` · `/blog/en/posts/<slug>/` | Textos com data e tags, em ordem cronológica, com RSS (`/blog/posts/index.xml`) |
| `docs/` | **Trilhas**, em árvore | `/blog/trilhas/<trilha>/` · `/blog/en/tracks/<trilha>/` | Conteúdo de referência por assunto: `java`, `aws`, `devops`, `observability` |

- Os artigos nascem com `draft: true`. Remova a linha para publicar. Use `tags` (ex.: `["java", "aws"]`) e, se quiser, `summary` para o resumo da lista. As tags são hashtags: só minúsculas e dígitos, sem acento, espaço ou hífen (`bancodedados`), exibidas como `#java`.
- A home do blog lista os 5 artigos mais recentes (shortcode `{{</* recent-posts */>}}`).
- `BookSection: /` faz o menu mostrar **todas as pastas de primeiro nível**. Uma pasta nova nesse nível aparece no menu, a menos que o `_index.md` dela tenha `bookHidden: true`.
- **Trilhas** aparece recolhida no menu (`bookCollapseSection: true` em `docs/_index.md`). O texto e a seta abrem e fecham a seção, graças ao override `layouts/_partials/docs/menu-filetree.html`, e ela vem aberta quando o leitor está numa trilha. Uma trilha com muitas páginas pode ser recolhida do mesmo jeito, no `_index.md` dela. **Artigos** não tem subitens.
- Links internos usam o caminho do conteúdo (`/docs/java/`), não a URL final; o tema avisa no build se o destino não existir.
- Ícones do menu ficam em `blog/assets/icons/` (licenças em `LICENSES.md`).
- O Google Analytics só é incluído no build de produção, então o `hugo server` não coleta métricas.

### Tema claro/escuro

O menu do blog tem o seletor Automático/Claro/Escuro. A escolha fica em `localStorage.preferredTheme` (`auto`, `light` ou `dark`) e também vale no quiz. A página principal ainda não tem modo escuro.

## Internacionalização

A página principal e o quiz traduzem no navegador (`js/i18n.js`, `design-patterns-quiz/i18n.js`). O blog gera páginas por idioma. Os três compartilham a preferência `localStorage.preferredLanguage` com os valores `pt` ou `en`. Quem escolhe um idioma em uma parte do site encontra o mesmo idioma nas outras.

## Deploy

Todo push na `master` dispara `.github/workflows/deploy.yml`, que:

1. builda o blog em `_site/blog/`;
2. copia a página principal, o quiz e o `CNAME` para `_site/`;
3. publica `_site/` no GitHub Pages.

Requer **Settings → Pages → Source = GitHub Actions**. Para voltar ao modo antigo (publicar a branch direto), mude a fonte para "Deploy from a branch" (`master`, `/`). Nesse modo o blog não é publicado.

Para simular o deploy localmente:

```sh
rm -rf _site && hugo --source blog --minify --gc --baseURL http://localhost:8000/blog/ --destination ../_site/blog
cp -R index.html CNAME css js fonts img design-patterns-quiz _site/
python3 -m http.server 8000 --directory _site
```
