---
title: Biznagafest - Taller - Web performance testing
pubDate: 2024-11-18
description: Introducción a herramientas y buenas prácticas para mejorar el rendimiento de una web.
author: JosemiGT
image:
  url: '/imgs/performance-icon.svg'
  alt: 'Ícono de monitor de un ordenador y una flecha ascendente para indicar performance.'
tags:  ["Desarrollo de software"]
state: Wild
---

Además del taller DDD, que comenté [aquí](./biznagafest-taller-ddd-refactoring), también asistí a otro taller el pasado 26 de octubre de octubre, en la [BiznagaFest](https://www.biznagafest.com/), evento de desarrollo de software. Este otro taller fue impartido por [Joan León](https://bsky.app/profile/nucliweb.net) y se dieron algunas pinceladas sobre como podemos mejorar el rendimiento en una aplicación web.

## Principales métricas

Una frase muy típica en el mundo de la ingeniería, es que aquello que no podemos medir, no podemos optimizarlo, por lo que el primer paso para mejorar algo es establecer unas métricas. Las principales métricas que tenemos que conocer para buscar la optimización de la performance web, son las siguientes:

- **Largest Conterful Paint (LCP)** : Esta métrica mide cuanto tarda en cargar el elemento más importante de una página.
- **Iteraction to Next Paint (INP)**: Nos indica cuanto tarda en responder  la web en cuestión al hacer click en algo, nos ayuda a saber si el usuario tiene que esperar tras hacer una acción.
- **Cumulative Layout Shift (CLS)**: Métrica que indica la estabilidad visual en una web. 

## Lighthouse

Para poder ver qué métricas tiene una web concreta, tenemos que familiarizarnos con el **lighthouse**, esta es una herramienta de las *developer tools* que está disponible en los navegadores chromium cuando pulsamos la tecla *F12* del teclado.

Esta herramienta nos dará el feedback de las principales métricas que hemos mencionado.

Debemos ser conscientes que aunque el lighthouse nos indique una performance de "100", este indicador en bruto sólo se hace teniendo en cuenta algunas métricas pero ignora otras y no mide por ejemplo la interacción entre páginas o el tiempo de respuesta al hacer click en algún elemento accionable de la web, por lo que no debemos fiarnos de esta medición y debemos mirar un poco más a fondo para saber que se puede mejorar.

## Consejos para el uso de las dev-tools para mejorar el rendimiento web

Además de esta introducción el *lighthouse*, Joan nos dejó algunos consejos que podemos aplicar en las *developer tools*:

- Es buena práctica conocer todas las peticiones que se están haciendo al cargar la web y cómo se están haciendo, si son muchas, por ejemplo podríamos estudiar que se vayan cargando poco a poco según se necesita en la aplicación web, en lugar de hacer una carga inicial de todo.
- La pestaña network nos puede ayudar a comprobar que las imágenes están optimizadas (si no lo están debemos optimizarlas, por ejemplo usando el formato *.webp* para reducir su tamaño).
- La pestaña performance, nos da datos reales acerca del tiempo de carga de una web concreta según los datos que ha recopilado Google de usuarios de Google Chrome que hayan navegado por esa página.
- Podemos realizar *testing proactivo* al recargar la pestaña de *performance*, veremos todo lo que ha ido haciendo la web. 
  - Esta pestaña nos indica en rojo los "**render blocking**", es decir estilos que impiden una visualización rápida al cargar una página web.
  - La suma de los números en rojo que nos da esta pestaña, es el total **INP**.
- Las *dev-tools* nos permiten simular velocidades de Internet más lenta u ordenadores con procesadores más lentos, esto nos puede ayudar a saber como se comporta nuestra web con menos recursos.

En las *dev-tools* en la pestaña de source se abre por defecto  una sub-pestaña "page", pero existen otras pestañas como *Overrides* o *Snippets*. En estas otras pestañas se puede ejecutar código para estudiar la performance. Por ejemplo para analizar si se está precargando algo o no y que nos de pistas de mejora. Ver [Snippets de performance](https://webperf-snippets.nucliweb.net/).

## Consejos en el desarrollo para mejorar el rendimiento web

Joan también mencionó algunos consejos que son interesantes seguir en la fase de desarrollo de nuestra aplicación web, algunos de ellos son los siguientes:

- Si en algún momento, por las necesidades del negocio tenemos la presión y urgencia de entregar algo que sabemos que va a generar deuda técnica a un entorno de producción, lo podemos desplegar pero en ese mimo momento debemos crear el ticket en nuestra herramienta de tareas para resolver la deuda técnica que acabamos de generar.
- Si tenemos en una web varias páginas, cuando el usuario está en una y si sabemos cual debe de ser la siguiente, deberíamos estar cargando la siguiente  página para que cuando tenga que cargar sea instantáneo y así mejoramos el rendimiento.
- Si necesitamos usar elementos externos en nuestra web, es importante también usar el *preconectar* y el *precargar* elementos y recursos externos.
- Si tenemos que  renderizar algún dato mientras esperamos que nos responda un servicio externo, debemos usar *placeholders* para evitar los incomodos saltos.
- Usar **content-visibility**: Es una propiedad de CSS para indicar si algo se tiene que tener en cuenta al principio de cargar una página o no.
- Usar **contain-intrinsc-size**: Otra propiedad de CSS, que recuerda el tamaño con el que se renderiza unos elementos en el view port.

Ejemplo de css usando *content-visibility*  y *contain-intrinsc-size*:

``` css
content-visibility: auto
contain-intrinsic-size: 50px auto
```

## Tipos de performance testing

De cara a mejorar la performance de una aplicación web, es interesante también saber que tipos de testing existen para este objetivo:

- **Proactivo**: Este tipo de testing lo hacemos los ingenieros durante el desarrollo. Usando por ejemplo las **dev-tools**.
- **Reactivo**: Este tipo de testing lo hacen tanto los ingenieros como el product owners con **performance budgets**, automatizaciones. Se pueden usar también herramientas de *end to end* que ayudan a detectar fallos, pero también son útiles para detectar problemas de rendimiento, algunas que se pueden usar son: 
  - [Playwright](https://playwright.dev/)
  - [Cypress](https://www.cypress.io/)
- **Pasivo**:  Este se hace de forma constante en entornos de producción. Para este propósito existen herramientas denominadas *RUM tooling* (Real User Monitoring) que monitorizan datos reales de usuarios.

## Recursos interesantes

Algunos recursos interesantes mencionados en el taller:

- [web.dev](https://web.dev/): Web de google que documenta extensamente conceptos relacionados con la mejora del rendimiento en aplicaciones web.
- [WPOstats](https://wpostats.com/): Para conocer casos prácticos y/o experimentos para mejorar el rendimiento web.
- [Google search console](https://search.google.com/search-console/about): Herramienta de Google que se usa para estudiar el posicionamiento web (SEO).
- [WebPageTest](https://www.webpagetest.org/): De las pocas herramientas de medición de rendimiento que por detrás no usan *lighthouse*, es interesante para ver análisis alternativos a los que si usan *lighthouse*.
- [Perffeto UI](https://chromewebstore.google.com/detail/perfetto-ui/lfmkphfpdbjijhpomgecfikhfohaoine), es una extensión de Chrome para medir performence web.
-  [Snippets de performance](https://webperf-snippets.nucliweb.net/): Conjunto de scripts de JavaScript que podemos ejecutar en las herramientas de desarrollo para estudiar el rendimiento web.
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci): Herramienta que se puede integrar en un proyecto de node.js para automatizar pruebas de rendimiento, por ejemplo para evitar despliegues que hagan cambios que perjudiquen el rendimiento.
