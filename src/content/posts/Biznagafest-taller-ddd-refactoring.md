---
title: Biznagafest - Taller - DDD + Refactoring
pubDate: 2024-10-22
description: Taller donde se introducen técnicas de refactorización para encaminar un código a DDD.
author: JosemiGT
image:
  url: '/imgs/ddd.webp'
  alt: 'Esquema de Disna.'
tags:  ["Arquitectura de Software"]
---

Ayer, 26 de octubre de  octubre, acudí al evento  [BiznagaFest](https://www.biznagafest.com/) de desarrollo de software celebrado en Málaga. En este evento tuve la suerte de acudir a un taller sobre Domain Driven Design (DDD) y refactorización del código, impartido  por [Pedro Pardal](https://www.youtube.com/@ppardalj). En este artículo intentaré sintetizar algunos de los conceptos que he aprendido durante la realización de este taller.

## Espacio de solución y espacio de problema

Lo primero de lo que se habló, fue definir que es *el espacio de solución* y  *el espacio del problema*.

- **Espacio del problema:** Hace referencia al problema en si que queremos resolver, lo que también se llama popularmente  en el mundo del desarrollo *el negocio* de nuestra aplicación.
- **Espacio de la solución:** Aquí se hace más referencia a el cómo solucionamos el problema, los patrones que aplicamos. las técnicas, las metodologías...

El foco en DDD debería ser intentar simplificar al máximo el espacio de la solución para centrarnos en *el problema*. Por lo que a ese espacio del problema es a lo que se denomina **dominio**.

## Definición formal de DDD

La definición más formal de **Domain Driven Design (DDD )**, sería algo como:

> "DDD es un enfoque para el desarrollo de software de necesidades complejas que consiste en conectar la implementación con un modelo evolutivo de los conceptos de negocio"

Hay que hacer hincapié en que es una estrategia para necesidades más complejas, en algunas soluciones de software no hacen falta este tipo de enfoques.

Continuando, de esta definición, podemos emanar tres aspectos claves:

- **Colaboración**: Es necesario trabajar en equipo para tener una metodología compartida y clara.
- **Modelado**: La estructura del código debe modelar 1 a 1 la estructura del dominio.
- **Incremental**: Vamos poco a poco refinando el modelo de dominio (y su código) conforme vamos descubriendo nueva información. Es imprescindible la refactorización del código, en pequeñas iteraciones.

Para llevar a cabo estos aspectos, es necesario dominar estos principios en software:

1. **Desarrollo iterativo** e incremental del código.
2. Principios de diseño y **orientación a objetos**, ya que es imprescindible para modelar el dominio.
3. **Testing y refactoring**, es obligatorio tener una batería de test que nos cubran las espaldas.  Con cada cambio, aseguramos que todos los tests están en verde y no se rompe nada.

## Inmutabilidad, encapsulación y pureza

Los principios hasta ahora vistos nos da una idea de la filosofía que debe de perseguir nuestro código y nuestra forma de trabajar pero ¿qué tiene que cumplir un código que está orientado al dominio?

Para orientar nuestro código a una arquitectura basada en *DDD*, tenemos que cumplir lo siguiente:

- Inmutabilidad.
- Encapsulación.
- Pureza

Estos tres elementos nos permiten proteger la integridad de los datos, es decir, evitar que los clientes de una clase concreta manipulen directamente su estado interno, lo cual podría llevar a inconsistencias de los datos.

La integridad de los datos se expresa mediante **invariantes**, predicados que son ciertos **siempre**.

Es nuestra responsabilidad como desarrolladores preservar esos invariantes en todo momento.

Un posible ejemplo de invariante, en un cuadrado:

1. Tiene 4 lados.
2. Todos sus lados miden lo mismo.
3. Los ángulos formados por los 4 lados 90 grados.

**¿Por qué es importante preservar los invariantes?**

Porque un código que mantiene sus datos consistentes durante cualquier punto del programa que haga uso de estos datos, se traduce en muchos menos bugs y por lo tanto en menos trabajo correctivo. Además ayuda a tener mejoras en el rendimiento ya que tenemos un código más escalable y mantenible.

## Encapsulación

En ocasiones, el problema de la falta de consistencia en nuestros datos es un problema de una falta de encapsulación de nuestras clases de dominio.

Podemos ver si hay síntomas de falta de encapsulación, si:

- Las clases con datos, si sus métodos *getters* y *setters* son públicos.
- Si tenemos clases de servicios con lógica de negocio.

Las consecuencias de un modelo con falta de encapsulación son:

- Descubribilidad, cuesta encontrar donde se hace cada cosa.
- Duplicidad,  es muy fácil duplicar código y lógica al no tener claro donde se hace cada cosa y por lo tanto aumentamos la complejidad y la probabilidad de fallo.

> Debería ser responsabilidad de cada clase mantener la integridad de sus datos a través de sus operaciones públicas.

### Tell, don't ask

Otro principio que se usa para asegurar una buena encapsulación, sería de que en lugar de que la lógica y el modelo pregunte a los datos por separado, la lógica está en el modelo y un cliente pregunta directamente al modelo.

## Inmutabilidad

Para ser inmutable, un objeto no puede cambiar su estado mediante sus propiedades. Además un objeto inmutable, como no puede ser modificado, no hace falta ser encapsulado.

Para asegurarnos de que nuestro código es lo más inmutable posible, debemos usar *value object* siempre que podamos.

> Los *value object* son un objeto pequeño y simple que representa un valor o un concepto en el dominio, normalmente se valida únicamente en el constructor, por lo que se hace inmutable.

Un ejemplo de *value object*:

```c#
public class DateRange {
    public DateTime Start { get; }    
    public DateTime End { get; }
    
    public DateRange(DateTime start, DateTime end) {        
	    if (end < start)            
		    throw new ArgumentException("End date cannot be before start date");            
		    Start = start;
		    End = end;
    }
}
```

## Pureza

El concepto de pureza, viene del mundo del paradigma funcional, pero tiene algunos conceptos interesantes que nos ayudan para el *DDD*, básicamente, una función pura no tiene efectos colaterales, mantiene el principio de responsabilidad única.

Por lo tanto, es deseable que el modelo de dominio de la aplicación sea puro. Por ejemplo, evitado dependencias con terceros.

## Recursos

Por último, estuvimos practicando a refactorizar para encaminar un código *legacy* a un modelo DDD con [este repositiorio](https://github.com/exeal-es/tell-dont-ask-kata)
