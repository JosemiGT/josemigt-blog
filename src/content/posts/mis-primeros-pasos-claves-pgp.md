---
title: Primeros pasos con claves PGP
pubDate: 2024-09-30
description: ¿Qué es una clave PGP? ¿Para que sirve? ¿Cómo puedo utilizarla?
author: JosemiGT
image:
  url: /imgs/key-password.svg
  alt: El logotipo de GnuPG
tags:
  - Herramientas de Linux
state: Sprouting
---

En este artículo voy a indagar acerca de que es, para que sirve y como se puede utilizar una clave PGP para encriptar y firmar información.

## ¿Qué es  *PGP*?

PGP son las siglas de "*Pretty Good Privacy*", se trata de un software de encriptación, firma y autentificación. Este software fue desarrollado, patentado y comercializado  por "Phil Zimmermann".  Posteriormente debido al éxito de este software, se usó como base para desarrollar la "OpenPGP" como estándar de internet, esta vez si como software libre y no propietario.

La particularidad del software **PGP** es que se trata de un software de cifrado asimétrico. Esto quiere decir que se usa una clave para cifrar y otra clave para descifrar.

Como estas claves son diferentes, puedes de forma segura compartir la clave que se encarga de encriptar a otra persona, esta es a la que llamamos **clave pública**. Luego, nos guardamos de forma privada la clave que se encarga de descifrar, esta no se comparte con nadie y por ello se llama *clave privada*. Es fundamental que nadie tenga acceso a esta clave para mantener la privacidad de nuestra información.

Así, si dos personas que se quieren comunicar de forma privada de forma garantista, es decir asegurándose de que no habrá ninguna tercera persona que intercepte los mensajes, este sistema es ideal para ello. Estas dos personas comparten sus respectivas  claves públicas, cuando la otra persona quiere enviar un mensaje, usa la clave pública de su destinatario para cifrar su mensaje, se la envía y sólo el destinatario original podrá descifrar el mensaje.

## Casos de uso

Esta tecnología se usa para una serie de propósitos que requieran de garantizar privacidad y seguridad de alguna información

- Un caso típico son las **firmas digitales**, donde se requiere un método de garantizar que una información o software pertenecen íntegramente a la persona que dice ser y que este contenido no ha sido adulterado.
- Este método de comprobación de identidad se usa también para desarrollar **certificados webs**.
- **Cifrado de ficheros o correos electrónicos** que necesiten mantener una confidencialidad entre el remitentes y el destinatario.

## GnuPG

**GNU Privacy Guard (GnuPG)** es una herramienta libre y de código abierto (FOSS) que implementa *OpenPGP* para crear pares de claves público privadas para usarlas como queramos. En este artículo usaremos esta herramienta de terminal para trabajar con PGP.

Normalmente, viene ya instalado en las diferentes distribuciones de GNU/Linux, pero se puede instalar fácilmente con cualquier gestor de paquetes e incluso tiene una versión para sitemas Windows.

## Generando un par de claves

Como primer paso, para generar un nuevo par de claves, tenemos que usar el siguiente comando:

``` bash
gpg --full-gen-key
```

Esta instrucción nos abrirá un dialogo en el que nos preguntará por una serie de opciones de configuración para generar nuestro par de claves.

Primero nos preguntará por el tipo de clave deseada, existen varias opciones del algoritmo que se utiliza para crear las claves. Estas opciones serán suficientes para un uso doméstico, aunque se le puede pasar el flag `--expert` para contar con más opciones de algoritmos para generar las claves.

El segundo paso será especificar el tamaño de nuestra clave en bits de longitud, a mayor longitud, mayor seguridad. En la actualidad una contraseña de 4096 bits es suficiente para garantizar la privacidad de tus claves.

Luego, preguntará por un periodo de validez de las claves, podemos elegir que nunca caduque o que caduque en un tiempo dado si nos interesa que sólo funcione un tiempo concreto.

Por último nos preguntará por un usuario y un email que no tiene más validez que para identificar nuestra clave. Adicionalmente preguntará si queremos poner una contraseña a nuestra clave privada, para darle una capa de seguridad adicional.

## Exportando una clave pública

Una vez generado nuestro par de claves pública - privada, si la queremos usar con fines de comunicación con otra persona, tenemos que enviar la clave pública a la persona con la que queremos transmitir información de forma privada. Para ello tenemos que hacer lo siguiente:

- Consultamos las claves guardadas en nuestro sistema con:

``` bash
gpg --list-keys
```

- Una vez vemos la que queremos exportar, escribimos lo siguiente:

``` bash
gpg --export --armor --output public-key.asc <email/uid>
```

Con este comando se generará un fichero denominado "*public-key.asc*" con nuestra clave pública. Este fichero se lo podemos mandar a quien queramos para que nos envíe información cifrada.

## Importando una clave pública

Ahora bien, si la otra persona ha hecho el mismo procedimiento, tendremos que importar su clave pública para cifrar nuestros mensajes con ella de forma que podamos comunicarnos bidireccionalmente:

- El emisor importa la clave pública del receptor, cifra un mensaje con la clave pública del receptor y se lo manda. Sólo el receptor podrá descifrar el mensaje con su clave secreta.
- Como el receptor también habrá importado la clave pública del emisor, podrá usar esta para el mensaje de respuesta y así el emisor será el único que puede descifrarla con su clave privada.

De esta forma se consigue una comunicación segura y privada.

Para importar una clave pública, tenemos que ejecutar lo siguiente:

``` bash
gpg --import public-key.asc
```

Así se importará o actualizará la clave pública asociada a una identidad (el correo electrónico que haya elegida la persona que creó la clave pública).

## Encriptando ficheros

Si queremos cifrar un fichero, únicamente tenemos que ejecutar el siguiente comando:

```bash
gpg --output <nombre-fichero-cifrado> --encrypt --recipient <email-receptor> <nombre-fichero>
```

o bien simplificado del siguiente modo:

```bash
gpg -r <email-receptor> -e <nombre-fichero>
```

Con este comando generamos un fichero con extensión *.gpg*, el cual si intentamos abrir con cualquier editor de texto, nos encontraremos con caracteres extraños y será imposible de entender a simple vista.

## Desencriptando ficheros

Una vez tenemos el fichero cifrado que queremos desencriptar, únicamente tenemos que ejecutar el siguiente comando:

```bash
gpg --output <nombre-fichero-salida> --decrypt <nombre-fichero-cifrado>
```

O simplificando:

```bash
gpg --output <nombre-fichero-salida> --decrypt <nombre-fichero-cifrado>
```

## Exportando una clave privada

Si por algún motivo necesitamos pasar una clave privada entre diferentes equipos o guardar una copia de seguridad en algún dispositivo, será necesario exportar la clave privada.

Ahora bien, hay que tener en cuenta que debe estar protegida, ya que si transferimos esta clave por algún canal no seguro, puede ser expuesta y por lo tanto nuestra seguridad comprometida, por lo que idealmente no debería enviarse por Internet o algún otro medio que quede fácilmente expuesto.

Para exportar nuestra clave privada, ejecutamos la siguiente instrucción:

```bash
gpg --export-secret-keys --armor --output private_key.asc <identidad-usuario>
```

Una vez se importe la clave privada en el nuevo sistema, no es necesario importar por separado la clave pública ya que la clave privada tiene toda la información necesaria para generar la  clave pública y lo hará de forma automática.

## Eliminando claves guardadas

Puede que nos interese por algún motivo eliminar alguna de las claves que tenemos almacenadas en GnuPG, para ello seguimos los siguientes pasos:

1. Obtenemos el *uid* de la lista de claves públicas:

```bash
gpg --list-keys
```

2. Usamos el *uid* obtenido para ejecutar el siguiente comando:

```bash
gpg --delete-keys <uid>
```

O si lo que queremos es eliminar una clave privada, tendremos que seguir los siguientes pasos:

1. Obtenemos el *uid* de la lista de claves privadas:

```bash
gpg --list-secret-keys
```

2. usaremos el *uid* obtenido en esta lista para ejecutar el siguiente comando:

```bash
gpg --delete-secret-keys <uid>
```

Con esto eliminaremos las claves seleccionadas,

A diferencia de la importación de claves privadas donde si se autogenera la clave pública, para eliminarla si será necesario hacerlo por separado.

## Conclusiones

Aunque es una tecnología antigua, que se lleva usando desde principio de la década de los 90, es una tecnología muy fiable para cifrar y proteger la información. De hecho que se lleve usando tanto tiempo (aunque se van actualizando los algoritmos que generan las claves y el número de dígitos de información) es una prueba de su fiabilidad y estabilidad.

En el ecosistema GNU-Linux se utiliza muchísimo para verificar identidades de repositorios de paquetes o de códigos, de forma que podamos al menos certificar que lo que estamos instalando es lo que el desarrollador ha querido y no hay intermediarios que hayan manipulado el código para incluir software malicioso, espía, trackers u otros malwares.

Por lo que aprender, aunque sea lo básico de como funciona esta tecnología, es fundamental para asegurar la seguridad y privacidad en nuestros sistemas, no ya solo como usuarios de GNU/Linux si no como usuarios de ordenadores en general.
