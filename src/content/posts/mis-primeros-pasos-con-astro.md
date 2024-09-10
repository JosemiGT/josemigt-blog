---
title: 'Mis primeros pasos con Astro'
pubDate: 2024-09-10
description: 'En esta publicación narro mis primeros pasos con Astro.'
author: JosemiGT
image:
    url: 'https://docs.astro.build/assets/full-logo-light.png'
    alt: 'El logotipo completo de Astro.'
tags: ["Astro", "JavaScript"]
---

Bienvenidos a mi  recién inaugurado _blog_. En este blog quiero detallar y documentar mis aprendizajes sobre tecnología y programación, así que buscando algún generador de páginas web estáticas open source, encontré uno que está ganando mucha popularidad, empapándome de la documentación en la [web de astro 🚀](https://docs.astro.build/es/getting-started/) me gustó lo que vi y lo he estado usando para crear mi propio blog.

## ¿Por qué Astro?

Una de las cosas que más me llamó la atención en un inicio, es que tiene la posibilidad de usar diferentes frameworks de JavaScript, incluso a la vez. Por eso he visto que alguna gente llama a Astro _metaframework_. Esto quiere decir que si quieres, puedes usar componentes de React junto a componentes de Vue.

El segundo punto que me gusta de esta herramienta, es su filosofía de utilizar el mínimo código de JavaScript posible. Se renderiza toda tu web a HTML/CSS en el servidor previamente. Esto hace que las webs sean en general más eficientes ya que no es el navegador el que tiene que descargar el JS y construir la web, como ocurre con otras tecnologías, sino que ya está construida en el momento de la _transpilación_ del proyecto y se transforma todo a HTML ( a no ser que indiquemos que algún componente por su funcionamiento, requiere de JS).

Esta filosofía lo hace ideal para empezar un proyecto pequeño y sencillo como puede ser la creación de un blog personal.

## Iniciando un proyecto con Astro

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

## Conociendo la extensión .astro

Lo primero que nos encontramos después de ver la estructura de fichero son los propios ficheros. Este framework trabaja con unos ficheros ".astro". ¿Qué es esto?

En realidad son ficheros HTML a los que le podemos agregar código de javascript definiéndolo en una especie de cabecera en el fichero que señalamos de la siguiente forma:

``` astro
---
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
console.log("Hola mundo!");
const {description, title, pageTitle } = Astro.props;
---
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="description" content={description}>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={Astro.generator} />
    <title>{title}</title>
    <ViewTransitions />
  </head>
  <body>
    <Header />
    <h1>{pageTitle}</h1>
    <main>
      <slot />
    </main>
    <Footer />
    <script>
      import "../scripts/menu.js";
    </script>
  </body>
</html>
```

Como se observa en este código, entre los "---" de la cabecera se ejecuta código JavaScript que será interpretado por el lado del servidor para construir el HTML. La forma de usar las variables que tenemos de la "parte" de .js es muy similar a como se trabajan en los ficheros ".jsx" de ReactJS.

Así crearíamos un componente en Astro y de forma análoga a lo que sería un componente de ReactJS, podemos pasar "props" (algún tipo de dato de entrada, similar a como si fuese una función), esto es lo que se ve en:

``` js
  const {description, title, pageTitle } = Astro.props;
```

Para luego desde otro fichero, usar este componente, como se ve a continuación.

``` astro
 ---
import SadIcon from '../icons/SadIcon.astro';
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout 
	title="JosemiGT | Blog, programación, dotNet, C#, JavaScript, Dynamics 365"
	description="Soy JosemiGT y me dedico a programar. Me interesa '.Net', C#, NodeJS, JavaScript/TypeScript, Linux, SQL."
	pageTitle="Blog de JosemiGT"
>

    <h3>¡Ops! Página no encontrada.</h3>
    <div class="IconError">
        <SadIcon/>
    </div>
</BaseLayout>

<style>
    h3 { text-align: center; }
    .IconError {
        display: flex;
        justify-content: center;
    }
</style>
```

En esta otra página estamos usando el componente "BaseLayaout" que hemos creado en el código anterior. Los "props" se pasan como _propiedades en el HTML_.

Algo interesante también de los componentes de Astro, es que podemos añadir estilos a cada componente, pero este estilo aunque indiquemos "h3", no se aplicará a todos los títulos de tercer nivel que se aplicará sólo a este componente, por lo que podemos tener micro diseños y saber que no se pisarán entre ellos.

De igual forma podemos añadirles código JavaScript a estos componentes, pero hemos de tener en cuenta que por defecto este componente no funcionará ya que intentará renderizarlos todo en el servidor y no pasará este JS al navegador a no ser que le indiquemos lo contrario, para ello hay que indicar la siguiente propiedad a la hora de llamar un componente:

```js

  <MyReactComponent client:load />

```

De esta forma, por cada componente se crea lo que en Astro denominan "Isla" y cada una de ellas puede ser estática o dinámica, según si indicamos que se cargue en el cliente o en el servidor.

Nos falta por comentar la etiqueta especial _`<slots />`_ que básicamente sirve para indicar en un componente, donde irá todo el HTML que pasemos dentro de una etiqueta de nuestro componente. Así por ejemplo al usar el componente _`<BaseLayout>`_ dentro de él, hemos añadido un _h3_ y un _div_ que al renderizarse, astro lo incluirá en el main del HTML gracias a que se lo hemos indicado al crear el componente padre _`<BaseLayout>`_.

## Creando páginas

Para añadir una página nueva a nuestro sitio web, es tan fácil como crear un nuevo fichero en el directorio _src/pages/_. Eso sí, este fichero tiene que ser de tipo _.astro_, _.html_ o _.md_.

Una vez creado y definido, se generará una nueva página en _"localhost/tu-nueva-pagina"_, por supuesto, la página "index" será la que se pinta en la raíz de nuestro dominio.

## Agregando integraciones y frameworks UI

En la documentación hay una extensa [guía de como añadir diferentes tipos de componentes en nuestro proyectos](https://docs.astro.build/en/guides/framework-components/), a día de hoy se puede usar de forma oficial los siguientes frameworks:

- Vue.
- Svelte.
- Solid-js.
- React.
- Preact.
- Lit.
- AlpineJS.

También existes integraciones no oficiales para "Angular".

Para usar uno de estos framework en nuestro proyecto de Astro, ejecutamos el script que corresponda para cada una:

Por ejemplo para _Vue_:

``` bash

  npx astro add vue

```

y ya con esto podríamos crear en nuestros proyectos componente _.vue_ y usarlos con normalidad e importarlos por ejemplo a componentes _.astro_

## Colecciones de contenido

Otro aspecto interesante que nos permite Astro, es tener colecciones de contenidos. Básicamente consiste en usar un directorio que nosotros indiquemos, como una colección. Así, si estas creando en un directorio de tus posts en _markdown_ dentro de nuestro proyecto de Astro, podemos indicar este directorio como una colección eso sí tiene que estar dentro del siguiente directorio `src/content`.

Por ejemplo:

```
- src/content/
  - posts
    - post1.md
    - post2.md
```

Una vez tenemos esto, podemos hacer consultas de datos desde otros puntos de nuestro proyecto, de la siguiente forma:

``` js
import { getCollection } from 'astro:content';

const allPosts = await getCollection('posts');

```

una vez obtenida nuestra colección, podemos usarla por ejemplo para montar nuestros componentes:

``` jsx
	{allPosts
	.map((post) => 
		<BlogPost 
			url={`/posts/${post.slug}`} 
			postData={post.data} />
		)
	}
```

## View Transitions

El último punto que voy a comentar, es que astro es compatible con la tecnología de las "_View transitions_". Esta tecnología, permite hacer el cambio entre dos páginas que comparten elementos comunes, por ejemplo un header y un footer, sin que parezca que se ha cambiado de página. Sólo refresca el contenido diferente, consiguiendo un efecto visual similar al que se consigue con la _Single Page Application (SPA)_. Esto permite tener una mejor armonía visual al navegar por la página.

Para usar esta herramienta, sólo tenemos que importar el componente "ViewTransitions" de astro como si fuese un componente más y añadirlo a los _head_ de las páginas en las que queramos que se hagan transiciones.

``` astro
---
import { ViewTransitions } from 'astro:transitions';
---
<html lang="es">
  <head>
    <title>Mi página de inicio</title>
    <ViewTransitions />
  </head>
  <body>
    <h1>¡Bienvenido a mi sitio web!</h1>
  </body>
</html>
```

## Conclusiones

Me está gustando bastante la experiencia de desarrollo con este "_metaframework_". Tiene muy buenos resultados como herramienta para conseguir rápidamente páginas estáticas, con un enfoque "HTML First". Por lo pronto, estoy indagando en ella para desarrollar el blog desde el que me estás leyendo, en el futuro seguiré comentando los hallazgos que aprenda sobre Astro.
