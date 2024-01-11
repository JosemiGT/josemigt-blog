---
title: 'Mis primeros pasos con Astro'
pubDate: 2024-01-17
description: 'En esta publicación narro mis primeros pasos con Astro.'
author: JosemiGT
image:
    url: 'https://docs.astro.build/assets/full-logo-light.png'
    alt: 'El logotipo completo de Astro.'
tags: ["Astro", "JavaScript"]
---

Bienvenidos a mi  recién inaugurado _blog_. En este blog quiero detallar y documentar mis pasos con diferentes tecnologías para enriquecer mi aprendizaje, para crearlo me he decidido a utilizar un nuevo framework web que está creciendo en popularidad y se sitúa como uno de los frameworks webs con más futuro (presuntamente), especialmente para desarrollar páginas estáticas.

Tras decidirme por astro, para elaborar este blog, me puse manos a la obra empapándome de la documentación en la [web de astro 🚀](https://docs.astro.build/es/getting-started/).

En este primer post voy a narrar algunos puntos que he ido desarrollando y aprendiendo para elaborar este blog.

## ¿Por qué Astro?

Una de las cosas que más me llamó la atención en un inicio, es que tiene la posibilidad de usar diferentes frameworks de JavaScript, incluso a la vez, en Astro. Esto quiere decir que si quieres, puedes usar componentes de React junto a componentes de Vue...

Pero luego, indagando más sobre Astro, vi la filosofía que utiliza de enviar a los dispositivos el mínimo código de JavaScript posible, renderizando toda tu web a HTML/CSS en el servidor previamente. Esto hace que las webs sean muy eficientes ya que se convierten en páginas estáticas (siempre y cuando sea posible).

Toda esta filosofía lo hace  ideal para iniciar un proyecto pequeño y sencillo como puede ser la creación de un blog personal, aunque no dudes que se pueden hacer también proyectos más complejos con esta herramienta.

## Primeros pasos con Astro

Para iniciar un proyecto en Astro, es tan fácil como tener instalado nodeJS o sus equivalentes y ejecutar el siguiente comando:

``` bash
npm create astro@latest
```

Después sigues las instrucciones que te indican, y listo, ya has iniciado tu primer proyecto con Astro, así de sencillo.

Después, si lo abres en VSCode (o tu editor de código favorito), puedes observar la estructura de proyecto que te ha generado Astro:

- **public/**: Donde colocaremos aquellos archivos que no sean código que queramos exponer en la web, como imágenes o el favicon.
- **src/components**:  Aquí colocaremos los diferentes componentes de código que se pueden reutilizar en diferentes lugares.
- **src/layouts**:  En este directorio colocaremos las plantillas con las que añadiéndole componentes construiremos las páginas.
- **src/pages**:  Por aquí podremos construir las páginas de nuestro sitio web. Cada fichero creado en este directorio que sea de extensión ".astro", ".html" o ".md", creará un directorio en nuestra web. Para la creación de los mismos, usaremos las plantillas y los componentes del resto de directorios.
- **src/scripts**:  Aquí se añadirán ficheros .js o .ts para incluir lógica en nuestras páginas si la necesitan.
- **src/styles**:  Por último, aquí añadiremos los ficheros ".css" comunes que den estilos globales. Aunque como veremos más adelante, podemos usar estilos por componente.

- Conociendo la extensión ".astro".
- Creando páginas
  - Ruta donde se crean
  - Tipos de ficheros válidos para crear páginas.
- Creando componentes.
  - JS mínimo y como habilitar para el navegador.
  - Agregar integraciones y frameworks UI.
- Creando plantillas.
- Creando páginas dinámicas.
- Concepto de "islas".

## Colecciones de contenido

//TODO.

## View Transitions

//TODO.
