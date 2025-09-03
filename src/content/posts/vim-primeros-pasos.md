---
title: Vim - Primeros pasos
pubDate: 2024-10-22
description: Mis primeros pasos usando Vim
author: JosemiGT
image:
  url: '/imgs/vim-logo.webp'
  alt: 'El logotipo de Vim.'
tags:  ["Vim"]
state: Growing
---

Tras un tiempo leyendo por algunos rincones de internet el argumento de que con el uso de *Vim*, *NeoVim* o editores en modo vim, suponen un  incremento de velocidad a la hora de escribir una vez superada la curva de aprendizaje inicial. Además, sintiéndome atraído por su filosofía de editor minimalista que se puede ejecutar en cualquier sistema, he decidido darle una oportunidad para usarlo y ver si consigo dominar esta herramienta.

En este artículo he sintetizado los primeros comandos que debemos aprender para un uso básico de vim. Obviamente lo primero necesario es instalar vim en nuestro sistema operativo y luego desde una terminal, ejecutar:

``` shell
vim
```

Para dar los primeros pasos y hacer un pequeño tutorial, puedes ejecutar directamente lo siguiente:

``` shell
vimtutor
```

## Moviendo el cursor

Una vez entramos en vim, podemos mover el cursor a través de la pantalla pulsando las teclas `h,j,k,l`
    1. La tecla `h` mueve el cursor a la izquierda.
    2. La tecla `j` mueve el cursor hacia abajo.
    3. La tecla `k` mueve el cursor hacia arriba.
    4. La tecla `l` mueve el cursor a la derecha.

Para familiarizarse con este movimiento, viene bien mover la mano derecha del teclado una posición a la izquierda. En lugar de tener el dedo índice sobre la tecla`<j>` que es lo más común, se debe de tener sobre la tecla `<h>`, de esta forma nos parecerá más natural navegar con este sistema.

> [!Nota]
> Si en algún momento parece que no funcionan el movimiento del cursor, debemos darle a `<esc>` para entrar en el *modo normal*.

## Saliendo de vim

Para salir de vim, debemos estar en el *modo normal* y escribir:

``` vim
:quit
```

O de forma abreviada:

``` vim
:q
```

Si queremos salir sin guardar los cambios, debemos ejecutar:

``` vim
:q!
```

## Escribiendo texto

Para insertar texto en el lugar que se encuentra el cursor en ese momento, desde el **modo normal** pulsamos la tecla `i` o la tecla `a`, esto hace que entremos en el *modo de insertar*, en este modo podemos escribir como queramos, como cualquier otro editor de texto, una vez queramos volver al modo normal,  para seguir navegando por el archivo, presionamos la tecla `esc`.

## Guardando los cambios

Para guardar un fichero, debemos estar en el *modo normal* y escribimos:

``` vim
:write
```

O de forma abreviada:

``` vim
:w
```

También podemos guardar y salir de la siguiente forma:

``` vim
:wq
```

## Operadores y movimientos

En vim, es típico usar comandos que indican una acción u operación y a continuación el *movimiento*, por ejemplo, para borrar usamos la tecla `d` para indicar que vamos a borrar algo y a continuación `w` para indicar la siguiente palabra. Los *movimientos* más usados son los siguientes:

- **`w`** Indica hasta la siguiente palabra, **excluyendo** su primer carácter.
- **`e`** Hasta el final de la palabra actual, **incluyendo** el último carácter.
- **`$`** Hasta el final de la línea, **incluyendo** el último carácter.

A estos movimientos, se les puede añadir contadores, por ejemplo:

- **`2w`** para mover el cursor dos palabras hacia adelante.
- **`3e`** para mover el cursor al final de la tercera palabra hacia adelante.
- **`0`** para colocar el cursor al inicio de la línea.

## Borrando texto

Podemos eliminar texto desde el *modo insertar* como haríamos para cualquier otro editor, pero si se quiere eliminar algún carácter desde el *modo normal*, también se puede.

Si queremos eliminar **un carácter** podemos pulsar la tecla

``` vim
x
```

donde antes de pulsar`x` debemos poner el cursor sobre el carácter que queremos borrar.

Para borrar una palabra completa (no sólo un carácter, sino una palabra entera), podemos hacerlo desde el *modo normal*:

``` vim
dw
```

- d -> Indica *delete*
- w -> Indica *word*

Para borrar una linea completa desde donde esté el cursor, en *modo normal* escribimos lo siguiente:

``` vim
d$
```

Para borrar tres palabras de golpe.

``` vim
d3w
```

Donde se usa *3*, se puede usar el número que queramos para borrar *n* palabras.

Si queremos borrar una linea completa.

``` vim
dd
```

## Deshacer y rehacer

Si queremos deshacer los últimos cambios, similar a lo que se hace en otros editores con `ctrl-Z` , desde el *modo normal* pulsamos la tecla:

``` vim
u
```

Si queremos deshacer los cambios en una línea entera, desde el *modo normal* pulsamos la tecla:

``` vim
U
```

Nota que ahora es una `U` mayúscula en lugar de una `u` minúscula como en el caso anterior

Si queremos rehacer lo último que hemos deshecho, desde el *modo normal*, pulsamos:

``` vim
Ctrl-R
```

## Modificando textos

Desde el **modo normal** si hemos borrado un carácter o una linea, podemos pegarla escribiendo:

``` vim
p
```

Desde el **modo normal** para reemplazar un único carácter ubicado donde se encuentre en ese momento el selector:

``` vim
r
```

Desde el **modo normal** podemos cambiar una o *n* palabras completas, es decir, borrar y sobre la marcha insertar texto, usando:

``` vim
ce
c3e
```

Desde el **modo normal** para cambiar hasta el final de una linea desde donde esté el cursor:

``` vim
c$
```

## Navegando por el fichero

Para ver el estado actual del fichero, usamos:

``` vim
Ctrl-G
```

Este comando nos da información del fichero actual en la barra de estado (en la parte inferior de la ventana), entre otras cosas nos dice por ejemplo la linea actual en la que está el cursor.

Si queremos navegar al final del fichero, sólo tenemos que ejecutar:

``` vim
G
```

Si por el contrario queremos navegar al inicio del fichero:

``` vim
gg
```

Si queremos ir a una línea en específico, podemos indicarlo con el siguiente comando:

``` vim
518G
```

Con este comando iríamos a la línea 518 del documento. Sustituir 518 por la línea a la que se quiere ir.

## Buscando en un fichero

- Podemos buscar una frase en un fichero escribiendo el carácter `</>`, así por ejemplo si escribimos:

``` vim
/errroor
```

Se busca en todo el documento ese texto.

Podemos también encontrar la pareja de algún carácter tipo `(, [, {`, y navegar a su pareja pulsando el comando:

``` vim
%
```

## El comando sustituir

Para reemplazar en una linea dada, un texto por otro, podemos usar el siguiente comando desde el *modo normal*.

``` vim
:s/textoViejo/textoNuevo/g
```

Si queremos sólo reemplazar la primera coincidencia, podemos hacerlo omitiendo la `g`:

``` vim
:s/textoViejo/textoNuevo/
```

Para reemplazar un texto por otro en todo el documento abierto, usamos lo siguiente:

``` vim
:%s/textoViejo/textoNuevo/g
```

- Si queremos reemplazar un texto por otro en todo el documento pero queremos que nos pida confirmación de cada coincidencia antes de reemplazar, podemos usar el siguiente comando:

``` vim
:%s/textoViejo/textoNuevo/gc
```

- Si queremos reemplazar un texto entre dos líneas del documento concreta, podemos usarlo con el siguiente comando:

``` vim
:#,#s/textoViejo/textoNuevo/g
```

donde **#** son los números de línea desde el que queremos sustituir hasta el que queremos sustituir.

## Ejecutando cualquier comando desde vim

Si queremos ejecutar cualquier comando que admita nuestra terminal estando en *Vim*, podemos hacerlo simplemente escribiendo lo siguiente desde el *modo normal*.

``` vim
:!<Comando deseado>
```

Por ejemplo, para ver el listado del directorio actual:

``` vim
:!ls
```

Tras escribirlo, pulsamos enter y veremos un resultado por consola con la lista de directorios y ficheros del directorio actual.

## Copiando y pegando

Para copiar un texto desde vim tenemos que usar el *modo visual*, a este modo accedemos pulsando la tecla `v` desde el *modo normal*. Una vez se le da a esta tecla, si nos movemos con `h,j,k,l` vemos que va resaltando el texto por el que pasamos.

Una vez que tenemos el texto resaltado que queremos copiar, pulsamos la tecla `y` y para pegar este texto donde queremos, pulsamos la tecla `p`.

Se le pueden añadir al operador `y` el carácter `w` para copiar una palabra o emplear `yy` para copiar una línea completa.

## Usando la ayuda y saltando entre ventanas

Además de `vimtutor` tenemos una extensa ayuda que podemos consultar en cualquier momento escribiendo:

``` cim
:help
```

Cuando hemos escrito el comando `:help` **vim** nos ha abierto una nueva ventana, podemos cambiar el cursor de una ventana a otra pulsando:

``` vim
Ctrl-W Ctrl-W
```

También podemos buscar ayuda sobre un comando concreto para no tener que navegar por toda la wiki de ayuda, añadiendo al comando el texto sobre el que queramos ayuda:

``` vim
.help <comando>
```

Por ejemplo, para consultar la documentación de `cmd`:

``` vim
:help cmd
```

## Conclusiones

Hasta aquí llega mas o menos el recurso de **vimtutor**. Mi primera impresión en general es buena, aunque no estoy acostumbrado a usar el teclado para navegar. Creo que si consigo hacerme con todos estos comandos, el hecho de no tener que usar apenas el ratón puede mejorar los tiempos de escritura y sentir una mejor experiencia de desarrollo. Me gusta también que sólo haga falta una terminal para usarlo, libre de toda distracción posible.

Pero como estoy acostumbrado a temas de colores, autocompletados y funciones añadidas, necesito probarlo añadiendo estas funcionalidades durante un tiempo para ver si esta herramienta es para mi. En próximos post, aprenderé a configurar plugins y a modificar el fichero ".vimrc" para poner el editor un poco más a mi gusto.

## Referencia y recursos

1. **Vim tutor**: El primer recurso que he usado, este  recurso viene ya con vim cuando se instala y únicamente hay que ejecutar `vimtutor` en la terminal para abrir la guía que además está traducida al castellano. Vienen algunos ejercicios con los que te enseñan un manejo básico de vim.
2. [Aprende Vim de voctorhck](https://victorhck.gitbook.io/aprende-vim) : Recurso en castellano, es una traducción del recurso original en inglés [Learn-Vim de Igor Irianto](https://github.com/iggredible/Learn-Vim). Es una guía muy completa sobre el uso de vim, te cuenta como empezar, dar tus primeros pasos y va avanzando hasta un uso más completo donde se añaden plugins a vim.
