---
title: Usando un bare git repo para dotfiles
pubDate: 2025-09-28
description: Como versionar tus ficheros de configuración usando un repo de git pero sin romper tu $HOME.
author: JosemiGT
image:
  url: ""
  alt: ""
tags: ["Herramientas de Linux"]
state: Growing
---

##  Introducción

Últimamente le he estado dando caña a mi portátil con Arch Linux, me decidí a migrar de Gnome a Hyprland (ya contaré esta aventura en otro artículo) y en este camino me di cuenta que si no tienes un buen sistema para guardar tus ficheros de configuración (dotfiles) puedes fácilmente volverte loco -aún más de lo que ya estamos los usuarios habituales de linuxs-. 

La magia de los sistemas GNU-Linux y su ecosistema es la total libertad que da para crear sistemas a tu gusto, eligiendo cada pieza que lo compone. Pero esta libertad viene acompañada de complejidad, ya que cada aplicación que quieras poner a tu gusto tiene su propio fichero de configuración. 

Para mantener a ralla esta complejidad, leyendo en la [arch wiki sobre los dotfiles](https://wiki.archlinux.org/title/Dotfiles) leí una ingeniosa solución que planteaba el usuario [StreakyCobra en el foro de Hacker News](https://www.atlassian.com/git/tutorials/dotfiles). No es más que tener un repositorio git para sincronizar nuestros ficheros de configuración, pero cambiando algunos ajustes para hacerlo más fácil de usar. Especialmente nos interesará no tener que estar copiando y pegando ficheros desde el repositorio al directorio de configuración, crear scripts para ello o crear enlaces simbólicos.

## ¿Qué es un bare git repo?

El primer concepto *poco habitual* es el de "*repositorio bare git*" especialmente si como yo, sólo habías usado git para mantener tus cambios en local con un github/gitlab de turno. 

Tal y como nos dice la traducción del inglés de la palabra "bare", sí, creamos un repositorio "*desnudo*" o "*vacío*", esto quiere decir que:

- No contiene árbol de trabajo. Es decir, por defecto no se puede trabajar en los ficheros de tu repositorio ni hay nada visible en el directorio sobre el que trabajar.
- El historial, en lugar de guardarse en el subdirectorio *.git* típico, se guarda en el directorio principal.

Generalmente este tipo de repositorios son los que se usan en un servidor remoto, al cual diferentes personas cada uno desde su ordenador, van trabajando con un repo git normal y van publicando sus cambios de las ramas en el repositorio central. 

## ¿Por qué usar un repositorio bare?

> *Un repositorio desnudo está muy bien, pero, ¿Para qué necesito yo eso? ¿Qué tiene que ver con los ficheros de configuración?*

Vale, a simple vista, no se observa las ventajas de hacer un repositorio bare para guardar nuestros dotfiles, así que vamos a aterrizar esta idea en ventajas reales:

La primera es que en un repositorio normal en nuestro $HOME, implicaría tener una carpeta .git dentro del directorio, lo cual implica versionar por defecto todos los ficheros que estén aquí. Esto puede ser problemático y un potencial problema de seguridad si se nos cuela alguna clave secreta como por ejemplo el directorio .ssh. También puede causar problemas si nos equivocamos ejecutando comando de git que no debemos en nuestro home.

> *Vale, pero puedes tener el repositorio en otro directorio*.

Sí, pero ya tendrías que estar copiando y pegando ficheros de un lugar a otro, creando scripts que sincronicen los ficheros o crear enlaces simbólicos que luego hay que ir manteniendo en cada sistema. Es menos práctico que esta solución. Esta solución respeta la jerarquía de los ficheros y es fácil replicar en cualquier equipo sin muchos jaleos.

Además, para esta solución no tenemos que darle permisos de lectura y escritura de nuestros ficheros de configuración a ninguna aplicación de terceros ni necesitamos instalar ninguna dependencia adicional ya que git viene por defecto en casi cualquier sistema. Lo único que necesitaremos es un alias.

## Iniciando nuestro repositorio de dotfiles

Vamos manos a la obra, si queremos empezar a aplicar esta solución en nuestro equipo, únicamente tenemos que ejecutar en nuestra terminal favorita lo siguiente: 

``` bash
git init --bare $HOME/.dotfiles
```

Una vez creado el repositorio en el directorio deseado, vamos a nuestro fichero .bashrc, .zshrc o equivalente según la terminal que utilicéis y añadís el siguiente alias: 

``` bash
alias config='/usr/bin/git --git-dir=$HOME/.myconf/ --work-tree=$HOME'
```

Con este alias, estamos creando un árbol de trabo en el home, pero sólo cuando ejecutemos este comando, no de forma permanente.  Así, sólo cuando ejecutamos este alias en nuestra terminal, podremos añadir al repositorio los ficheros que nos interese versionar.

Una vez creado el alias, pero antes de hacer nada más, establecemos la configuración para que cuando se cree el árbol de trabajo del alias, no nos muestre los ficheros a los que no se les esté haciendo seguimiento:

``` bash
config config status.showUntrackedFiles no
```

Y listo, ya hemos creado nuestro sistema versionador de dotfiles.

## Usándolo en el día a día

> *Vale ya he seguido estos pasos, ¿Qué hago ahora? ¿Cómo añado fichero?*

Como en realidad se trata de un repositorio git, la gracia es que con el alias **config** ahora podemos versionar cualquier fichero con los mismos comandos que usariamos en git, pero usando la palabra **config** en lugar de **git**.

Por ejemplo, supongamos que estamos creando un fichero de configuración para nuestra terminal [alacritty](https://alacritty.org/), hemos terminado de toquetear el fichero *alacritty.toml*, como alacritty coloca por defecto su fichero de configuración en `$HOME/.config/alacritty/alacritty.toml` si queremos versionarlo ejecutamos lo siguiente:

``` bash
config add .config/alacritty/alacritty.toml
```

Luego confirmamos el cambio en el repositorio:

``` bash
config commit -m "añadiendo el fichero alacritty.toml"
```

Podemos, igual que si fuese un repositorio normal, ver si tenemos algún cambio pendiente de confirmar en algún ficheros a los que le hacemos seguimiento:

``` bash
config status
```

De igual forma podemos añadir un repositorio remoto (tipo github/gitlub) y luego subir los cambios confirmados con:

``` bash
config push
```

## Ramas por máquina

Si queremos añadir nuestros dotfiles a un nuevo equipo, sólo tenemos que clonarlo desde github/gitlab o equivalente en el directorio que usemos:

```bash
git clone --bare git@github.com:tuusuario/dotfiles.git $HOME/.dotfiles
```

Volvemos a crear el alias en nuestro nuestro fichero .bashrc, .zshrc o equivalente, como cuando lo creamos por primera vez:

```bash
alias config='/usr/bin/git --git-dir=$HOME/.dotfiles/ --work-tree=$HOME'
```
  
Evitamos de nuevo que **git** muestre todos los archivos no rastreados:

```bash
config config --local status.showUntrackedFiles no
```

Por último, hacemos checkout de nuestros archivos versionados, con:

```bash
config checkout
```

**Nota:** *Si $HOME ya tuviese archivos de configuración que puedan causar conflictos, con los versionados, git nos avisará. Si quieres sobreescribirlos puedes ejecutar:*

```bash
config checkout -f
```

## Mis dotfiles

Aún está en construcción mientras voy necesitando versionar o construir mis dotfiles, pero si tienes curiosidad de como está quedando mi repositorio, puedes cotillearlo:

- [Mi repositorio en GitHub de dotfiles](https://github.com/JosemiGT/dotfiles)

## Referencias
- [ArchWiki: Dotfiles](https://wiki.archlinux.org/title/Dotfiles)
- [What is a bare git repository](https://www.saintsjd.com/2011/01/what-is-a-bare-git-repository/)
- [Atlassian: Managing dotfiles with bare Git repo](https://www.atlassian.com/git/tutorials/dotfiles)
- [What do you use to manage your dotfiles - Ask Hacker News](https://news.ycombinator.com/item?id=11071754)