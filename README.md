# JosemiGT - Blog - Repositorio



Este proyecto se ha desarrollado usando el "metaframework" de "Astro".

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

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
│       └── posts/ (each article in markdown)
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

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
