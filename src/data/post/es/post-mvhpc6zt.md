---
title: "Guia Definitiva de Prompts en Midjourney V6: Rostros Consistentes en 20 Escenas"
description: "Aprende a mantener la consistencia de personajes en Midjourney V6 para tus proyectos de diseño y marketing sin perder la cabeza."
publishDate: 2026-10-22T03:00:00.000Z
image: 'https://picsum.photos/seed/prompt-mvhpdg2y-5-c/1200/675.jpg'
category: 'Prompt Engineering'
tags: ["Prompt Engineering", "Midjourney", "IA", "Diseno Creativo"]
theme: "Sunset Horizon Coral"
---


Eran las siete de la tarde en nuestra oficina en Madrid. El café de la maquina ya no hacia efecto y el cliente clave para el que estabamos preparando la campaña de generacion de codigo y analisis de mercado con IA nos acaba de mandar un mensaje por Slack que nos dejo helados: "Las 20 escenas del storyboard estan bien, pero en cada imagen sale una persona totalmente distinta. Necesitamos que sea el mismo protagonista en todas, o el contrato se cae".

El problema era evidente. Midjourney V6 es una bestia creando imagenes hiperrealistas, pero por defecto, cada generacion es una loteria genetica. Si le pides un programador en un despacho, te da uno. Si en la siguiente escena le pides al mismo programador tomando cafe, te devuelve un gemelo perdido con otro corte de pelo y facciones diferentes. Estabamos a pocas horas de la entrega y el caos reinaba en el estudio.

<div style="border-left: 4px solid #f97316; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>Alerta de Emergencia Creativa:</strong> Olvidate de confiar al azar la identidad de tu personaje. Sin la tecnica de parametros cruzados que veremos a continuacion, quemaras tus horas de GPU intentando replicar un rostro mediante pura suerte.
</div>

## ¿Por que fallan los prompts simples al buscar consistencia?

El error tipico de cualquier profesional es sobrecargar el texto descriptivo: *"Hombre hispano de 30 anos, pelo castaño corto, ojos marrones, barba de tres dias, usando una sudadera naranja..."*. En la escena uno funciona medianamente bien. Pero cuando cambias el contexto a *"El mismo hombre corriendo por la Gran Via de noche"*, Midjourney prioriza la accion y el entorno, alterando la estructura osea, la edad o los rasgos clave del personaje.

Para solucionar esto de raiz en V6, no dependemos solo de la descripcion textual. Combinamos tres elementos criticos de ingenieria de prompts:

1. El parametro de referencia de personaje (--cref): La herramienta nativa que ancla los rasgos faciales.
2. El peso del personaje (--cw): Controla cuanta informacion de la imagen base se transfiere (ropa, cabello o solo el rostro).
3. Anclaje semantico estricto: Una estructura de prompt modular que mantiene constantes las palabras clave del sujeto mientras varia la accion.

---

## Master Prompt Template: El Secreto de las 20 Escenas

Copia esta estructura base en tu herramienta favorita (puedes usar ChatGPT o Claude para generar las variaciones de entorno manteniendo fijo el bloque del personaje).

```text
[Accion o Escenario Especifico], [Iluminacion y Estilo Visual], --cref [URL_DE_IMAGEN_BASE] --cw 0 --v 6.0 --ar 16:9
```

### Guia rapida de variables:
- [Accion o Escenario Especifico]: Lo que esta haciendo el personaje y donde esta (ej: *writing clean Python code on a dual monitor setup in a modern Madrid office*).
- [Iluminacion y Estilo Visual]: El tono fotografico (ej: *cinematic lighting, professional photography, shot on 35mm lens*).
- --cref [URL]: La URL de la imagen original de tu personaje aprobado.
- --cw 0: Truco clave. Al poner el peso del personaje en 0, Midjourney solo clona la cara y el rostro, ignorando la ropa y el peinado. Esto te permite cambiarle de atuendo (traje, sudadera, camisa) en cada una de las 20 escenas manteniendo exactamente la misma persona.

---

## Comparativa: Metodo Tradicional vs. Metodo Prompt Engineering V6

<div style="border-left: 4px solid #f97316; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<ul>
  <li><strong>Prompt Tradicional:</strong> Rostro diferente en cada escena, perdida de identidad de marca, horas de retoque en Photoshop y cliente insatisfecho.</li>
  <li><strong>Metodo Prompt Engineering V6 (--cref + --cw 0):</strong> 100 por ciento de consistencia facial, cambio de ropa dinamico segun la escena, entrega a tiempo y cliente impresionado.</li>
</ul>
</div>

---

## Preguntas Frecuentes (FAQ)

### 1. ¿Puedo usar una imagen generada por IA como base para el parametro --cref?
Si, totalmente. De hecho, es el flujo recomendado. Generas tu personaje ideal en la primera escena, copias el enlace de esa imagen en Discord y lo usas como `--cref` para las siguientes 19 escenas de tu storyboard.



![Midjourney V6 Prompt Guide to Maintain Consistent Character Faces Across 20 Scenes Prompt Guide](https://picsum.photos/seed/prompt-mvhpdg2y-5-b/1000/550.jpg)

### 2. ¿Que diferencia hay entre usar --cw 100 y --cw 0?
Si usas `--cw 100`, Midjourney intentara copiar la cara, el peinado y la ropa exacta de la imagen original en todas las escenas. Si usas `--cw 0`, el sistema se centra exclusivamente en las facciones de la cara, dandote la libertad creativa de cambiarle la ropa y el peinado segun lo requiera la narrativa de cada escena.

### 3. ¿Funciona este metodo para personajes ilustrados o solo para fotografia realista?
Funciona para ambos estilos. Si trabajas en formato 3D o estilo anime, simplemente debes anadir el descriptor de estilo al final de tu prompt (ej: `--style raw` o especificando el estilo de ilustracion) junto con tu enlace de referencia `--cref`.
