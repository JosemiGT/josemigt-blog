# JosemiGT - Blog - Repositorio

Este proyecto se ha desarrollado usando el "framework" de ["Astro"](https://astro.build). Es un framework que ayuda a desarrollar sitios web estáticos.

## Estructura del proyecto

Los ficheros de código que componen el blog, están organizados siguiendo esta estructura de directorios:

```text
/
├── public/
├── src/
│   └── components/
│       └── BlogPost.astro
│       └── Footer.astro
│       └── FormattedDate.astro
│       └── Hamburger.astro
│       └── Header.astro
│       └── Navigation.astro
│       └── ScrollTopButton.astro
│       └── Social.astro
│       └── Tag.astro
│   └── content/
│       └── posts/ (cada artículo en markdown)
│       └── config.ts
│   └── Icons/
│       └── DownArrow.astro
│       └── GitHubIcon.astro
│       └── LinkednIcon.astro
│       └── MastodonIcon.astro
│       └── RssIcon.astro
│       └── SadIcon.astro
│       └── ThemeIcon.astro
│       └── UpArrow.astro
│       └── XsocialMediaIcon.astro
│   └── layouts/
│       └── BaseLayout.astro
│       └── MarkdownPostLayout.astro
│   └── pages/
│       └── index.astro
|       └── posts/
│           └── [...slug].astro
|       └── tags/
│           └── index.astro
│           └── [tag].astro
|       └── 404.astro
|       └── about.astro
|       └── blog.astro
|       └── books.astro
|       └── index.astro
|       └── privacidad.astro
|       └── rss.xml.js
│   └── scripts/
|       └── menu.ts
|       └── theme.ts
│   └── styles/
|       └── global.css
└── package.json
└── env.d.ts
└── .node-version
└── astro.config.ms
└── .gitignore
└── README.md
└── tsconfig.json
```

Astro renderiza automáticamente los ficheros `.astro` o `.md` que estén en el directorio `src/pages/` en páginas propias, el cual emplea el nombre del fichero como nombre de la página.

En el directorio `src/components/` se crean componentes reutilizables que se pueden usar en las webs. Es compatible con componentes de otros frameworks como Vue, Svelte, Preact o React, pero en este proyecto sólo se usan componentes `.astro` que no dejan de ser simple html y js para renderizar contenido estático.

Dentro de `src/content/` se ubican los ficheros .md que tenemos a modo de colecciones. Aquí se ubica otro subdirectorio de `src/content/posts` donde se ubican todos los posts del blog que voy escribiendo.

Los ficheros estáticos como imágenes, se encuentran en el directorio `public/`.

## 🧞 Commands

Los comandos que puedes ejecutar desde el directorio raíz en una terminal, son los siguitenes:

| Command                      | Action                                                        |
| :--------------------------- | :------------------------------------------------------------ |
| `pnpm install`               | Installa las dependencias                                     |
| `node --run dev`             | Inicia un servidor local de desarrollo en `localhost:4321`    |
| `node --run build`           | Construye los ficheros para subir a producción en `./dist/`   |
| `node --run preview`         | Previsualiza tu build localmente, antes de desplegar          |
| `node --run astro ...`       | Ejecuta comandos CLI de astro como `astro add`, `astro check` |
| `node --run astro -- --help` | Obtiene ayuda para usar Astro CLI                             |
