# Plan de medición — cómo saber si el rediseño funciona

Escrito el 15-10-2026. Complementa [hallazgos-y-mejoras.md](hallazgos-y-mejoras.md) (#6, #7 y #8) y usa como base los datos de [journey-actual.md](journey-actual.md).

Un wireframe no tiene usuarios ni salidas, así que no puede demostrar que baje la salida de Líneas ni que los clics lleguen al contenido. Lo que sí puede hacer es dejar definido **qué medir, con qué línea base y cómo comprobarlo** una vez que el diseño esté en el sitio real. Este documento es eso.

---

## 1. Qué dicen los datos hoy y sus límites

Datos del sitio actual (90 días, [journey-actual.md §5](journey-actual.md)):

| Dato | Valor | Límite al interpretarlo |
|---|---|---|
| Sesiones en Líneas | 5.639 (≈ 63 por día) | Es el universo real; las grabaciones de Clarity son solo una muestra. |
| Vistas de Líneas | 8.406 | Es el denominador correcto para una tasa de salida. |
| Sesiones que entran directo (landing) | 937 (≈ 17%) | El resto (≈ 83%) llega desde otra página del sitio. |
| Grabaciones con Líneas como salida / entrada | 101 / 44 (2,3×) | **No es una tasa de salida.** Una página intermedia siempre tiene más salidas que entradas. Además es una muestra. |
| Tiempo de interacción medio | 56,3 s | Alto: se detienen a leer y comparar. |
| Rebote | 6,54% | Bajo: casi nadie se va sin hacer nada. |
| Tasa de evento clave como landing | 0,32% (3 de 937) | No es comparable con otras páginas hasta aclarar qué cuenta como evento clave (pregunta abierta nº 1 de [hallazgos](hallazgos-y-mejoras.md)). |
| Clics registrados en Clarity | 310, concentrados en el header | Mayormente móvil; son filas agregadas, no sesiones. |
| Carga (GTmetrix) | 9,0–13,7 s, 7–8 MB | Restricción de diseño: lo que se agregue no debe empeorarla. |

**Conclusión sobre el #6:** "2,3× más salidas que entradas" es una señal de alerta, no una medida. Para saber si Líneas realmente pierde gente hay que calcular la tasa de salida (salidas ÷ vistas) y la de avance a la PDP, que hoy no están calculadas.

---

## 2. Hipótesis: qué pieza del prototipo debería mover qué indicador

| Problema (hallazgo) | Pieza del prototipo | Hipótesis | Indicador que debería moverse |
|---|---|---|---|
| #1 No se puede calibrar el precio | Precio real por modelo, orden por precio, "+$X vs. el más económico" | Con el precio a la vista, el usuario decide sin salir de la página. | Avance a PDP desde Líneas ↑; tiempo hasta la primera interacción útil ↓ |
| #2 "Ver más" reabre la decisión | Guía arrastra tamaño, tipo y firmeza; Líneas lista solo esa combinación | Menos pasos de re-decisión. | Avance a PDP ↑; vuelta de PDP a la lista ↓ |
| #5 Premium concentra el catálogo | Cantidad de modelos por línea y "Más modelos" | El usuario encuentra antes dónde hay más opciones. | Reparto de clics entre líneas; scroll hasta Premium |
| #3 Comparar tipo obliga a volver atrás | Selector de tipo y "También como…" en cada card | Se cambia de tipo sin salir de la lista. | Clics en `tipo_tab_click` y `tambien_como_click`; vuelta a Guía desde Líneas ↓ |
| #6 Líneas cierra más de lo que abre | Todo lo anterior | Si las causas se resuelven, la tasa de salida baja. | Tasa de salida de Líneas ↓ |
| #7 El clic va al header | Banners de línea con contexto, "Ordenar por", comparador, botón del quiz | Más clics dentro del contenido. | % de clics en contenido vs. header ↑ |
| Quiz → PLP | "Ver todos los modelos con mi selección" | El quiz termina en una lista filtrada, no en un callejón. | Clics en el botón del resultado; avance a PDP desde el quiz |

---

## 3. Indicadores

Todos se calculan por sesión y se segmentan por **dispositivo** (el tráfico de Líneas es mayormente móvil) y por **origen** (entra directo o viene de Guía).

| Indicador | Definición | Fuente | Línea base |
|---|---|---|---|
| **Tasa de salida de Líneas** | Sesiones cuya última página es Líneas ÷ vistas de Líneas | GA4 (`ga4_paginas_pantallas` + página de salida) | **Por calcular.** Hoy solo hay 101 grabaciones de salida (muestra). |
| **Tasa de avance a PDP** | Sesiones con vista de Líneas que llegan a una PDP después, en la misma sesión ÷ sesiones con vista de Líneas | GA4 (rutas) | **Por calcular** (preguntas 2–4 de [journey-actual §9](journey-actual.md)). |
| **Avance a PDP por modelo** | Lo anterior, pero con la PDP del mismo modelo que se vio en la lista | GA4 + parámetros de URL | Por calcular. |
| **Vuelta de PDP a la lista** | Sesiones que van de PDP a Líneas o a la PLP en el mismo recorrido ÷ sesiones con PDP | GA4 | Por calcular (pregunta 11). |
| **Interacción útil** | % de sesiones en Líneas con al menos un cambio de línea, de orden, un "Comparar" o un clic en "Ver producto" | Eventos nuevos (sección 4) | No existe: son eventos nuevos. |
| **Tiempo hasta la primera interacción útil** | Segundos desde la carga hasta el primer evento de la fila anterior | Eventos nuevos | No existe. |
| **Clics en contenido vs. header** | Clics en el cuerpo de la página ÷ clics totales | Clarity (mapa de clics) | Hoy: concentrados en el header (310 filas). Por cuantificar. |
| **Rebote** | Rebote de GA4 en Líneas | GA4 | 6,54% |
| **Tiempo de interacción** | Medio por sesión en Líneas | GA4 | 56,3 s |
| **Carga y peso** (control, #8) | Onload y peso total de Líneas | GTmetrix | 9,0–13,7 s · 7,1–8,2 MB |

**Importante:** el tiempo de interacción alto no es necesariamente malo. Hoy la gente "lee mucho y decide poco"; el objetivo no es bajar el tiempo sino que el tiempo termine en avance a la PDP.

---

## 4. Eventos a registrar en el sitio real

Uno por cada interacción relevante del prototipo. Nombres sugeridos (en minúsculas con guion bajo, siguiendo la convención de GA4); todos llevan `pagina` (guia, lineas, pdp), `tamano`, `tipo` y `linea` cuando aplica.

| Evento | Cuándo se dispara | Parámetros útiles |
|---|---|---|
| `linea_banner_click` | Clic en "Ver línea X" de los banners de Líneas | `linea_destino`, `habia_modelos` (si el botón estaba activo) |
| `orden_cambio` | Cambio en "Ordenar por" | `orden` (menor, mayor, descuento, vendidos, az, za), `cantidad_modelos` |
| `comparar_marcar` | Se marca "Comparar" en una card | `modelo`, `linea`, `n_seleccionados` |
| `comparar_ver` | Se abre el cajón de comparación | `n_seleccionados`, `n_atributos_distintos` |
| `tipo_tab_click` | Clic en una pestaña de tipo (cama europea, box spring, colchón) de la lista | `desde_tipo`, `hacia_tipo`, `cantidad_modelos` |
| `tambien_como_click` | Clic en "También como…" de una card | `modelo`, `desde_tipo`, `hacia_tipo` |
| `base_cambio` | Se cambia entre base completa y dividida | `modelo`, `base` |
| `ver_producto_click` | Clic en "Ver producto" de una card | `modelo`, `linea`, `tipo`, `posicion_en_lista`, `orden_activo` |
| `combinacion_sin_modelos` | Se muestra el aviso de que no existe esa combinación | `tamano`, `tipo`, `firmeza`, `linea` |
| `aviso_tamano_click` | Clic en un tamaño sugerido del aviso de Guía | `desde_tamano`, `hacia_tamano` |
| `quiz_paso` | Se responde cada paso del quiz | `paso`, `respuesta` |
| `quiz_resultado` | Se muestra el resultado | `n_resultados`, `relajo_filtro` (si se mostró un aviso) |
| `quiz_ver_modelos_click` | Clic en "Ver todos los modelos con mi selección" | `tamano`, `tipo`, `firmeza` |
| `quiz_ver_producto_click` | Clic en "Ver producto" desde el resultado | `modelo`, `posicion` |
| `quiz_guardar_enviar` | Se envía "Enviármela por correo" | `acepta_contacto` (sin datos personales en el evento) |

No registrar datos personales (nombre, correo, teléfono) en ningún evento. El formulario del quiz se mide solo con el conteo.

---

## 5. Línea base: qué hay que calcular antes de lanzar

Sin esto no se puede decir si el rediseño mejoró algo. Son consultas sobre el sitio actual, en el mismo período de 90 días:

1. **Tasa de salida de Líneas** y **tasa de avance a PDP** (vistas y sesiones, no grabaciones).
2. Del tráfico de Líneas: % que continúa a una PLP con `?modelo=` en la URL (el único puente medible hoy) y % que de ahí llega a la PDP del mismo modelo (preguntas 2 y 3 de [journey-actual §9](journey-actual.md)).
3. Ranking de clics en "Ver más" por modelo: ¿se reparten entre los 34 o se concentran en pocos? (pregunta 5).
4. Clics en los banners de línea frente a los de "Ver todo Línea X" (pregunta 6).
5. Profundidad de scroll hasta Premium, que hoy es el tercer bloque (pregunta 7).
6. Uso de "Filtrar" y "Ordenar por" en la PLP actual antes de un clic a producto (pregunta 9).
7. **Qué cuenta como evento clave en cada página.** Hoy una conversión en PDP vale ≈ $422.641 y en Guía ≈ $4.506, lo que indica definiciones distintas. Hasta aclararlo, no comparar tasas de conversión entre páginas.

---

## 6. Cómo comprobarlo: prueba A/B

**Qué se compara:** la PLP actual de Líneas (control) contra la nueva (precios por modelo, orden, comparador, conteo de modelos, banners con contexto). Si el cambio se hace por etapas, conviene probar primero lo que más pesa: precio por modelo y listado filtrado desde Guía.

**Cómo:**
- Asignación aleatoria por usuario (no por sesión) y estable durante toda la prueba.
- Separar móvil y escritorio en el análisis: la mayoría del tráfico es móvil y los clics del header también.
- No mezclar con campañas pagadas que cambien el origen del tráfico a mitad de la prueba.

**Indicador principal:** tasa de avance a PDP desde Líneas.
**Indicadores secundarios:** tasa de salida, interacción útil, vuelta de PDP a la lista, clics en contenido vs. header.
**Control (no deben empeorar):** carga y peso, rebote, avance a carrito desde la PDP.

**Tamaño de muestra, a modo de ejemplo.** Líneas recibe ≈ 63 sesiones por día. Si el avance a PDP de base fuera 40% (valor supuesto, hay que calcular el real) y se quiere detectar una mejora de 5 puntos con 80% de potencia y 5% de significancia, hacen falta ≈ 1.500 sesiones por variante: unos 3.000 en total, es decir, **cerca de 48 días con todo el tráfico de Líneas**. Con una línea base distinta o un efecto menor, el plazo cambia; hay que recalcularlo con el dato real. Si el plazo resulta demasiado largo, conviene medir también en Guía y en la PLP, que tienen más volumen.

**Criterio de éxito sugerido** (a confirmar con la línea base): mejora del indicador principal que sea estadísticamente distinguible, sin deterioro de los indicadores de control.

**Criterio de alarma:** si la carga de Líneas supera los 13,7 s (el peor valor medido hoy) o el rebote sube, detener y revisar antes de seguir.

---

## 7. Presupuesto de rendimiento (#8)

La lentitud crece hacia la compra: Guía 6,8–11,4 s, Líneas 9,0–13,7 s y PDP 14,0–16,4 s, con TTFB de hasta 2.700 ms en la PDP ([journey-actual.md](journey-actual.md)). Una maqueta no puede mejorar el TTFB (servidor, caché, base de datos), pero sí fija **lo que el diseño puede costar**. Estos límites son restricciones de diseño y a la vez indicadores de control de la prueba A/B.

| Métrica | Hoy (sitio actual) | Techo propuesto | Quién la mueve |
|---|---|---|---|
| TTFB de la PDP | hasta 2.700 ms | ≤ 800 ms (umbral "bueno" de Google) | Infraestructura: caché de página, CDN, consultas de la ficha |
| Carga (onload) de Líneas | 9,0–13,7 s | ≤ 4 s | Peso de imágenes y número de solicitudes |
| Carga (onload) de la PDP | 14,0–16,4 s | ≤ 4 s | Ídem + TTFB |
| Peso de Líneas | 7,1–8,2 MB | ≤ 2 MB en la primera carga | Imágenes (WebP, tamaño de uso, carga diferida) |
| Solicitudes de Líneas | 480–489 | ≤ 100 | Scripts y terceros, imágenes diferidas |
| LCP (imagen principal) | sin medir | ≤ 2,5 s | Imagen principal liviana y sin carga diferida |

Los techos son una propuesta a validar con quien implemente el sitio; los valores de hoy son los medidos con GTmetrix.

**Lo que ya hizo el prototipo (16-10-2026, ver #29).** Las imágenes pasaron a WebP, a su tamaño de uso y con carga diferida. Pesos medidos antes y después (se mide el archivo de cada imagen pedida; "primera carga" es lo que baja sin hacer scroll, "recorrido completo" es lo que baja al ver toda la página):

| Página | Antes | Después, primera carga | Después, recorrido completo |
|---|---|---|---|
| Guía | 7,34 MB (31 solicitudes) | 0,30 MB (19) | 0,74 MB (31) |
| Líneas, 2 Plazas cama | 3,45 MB (19) | 0,48 MB (17) | 0,51 MB (19) |
| Líneas, 2 Plazas colchón | 4,09 MB (21) | 0,39 MB (16) | 0,51 MB (21) |
| PDP | 1,79 MB (18) | 0,36 MB (13) | 1,13 MB (28) |

Esto no es el rendimiento del sitio real: es una maqueta estática servida en local, con muchas menos solicitudes (≈ 20–30, contra ≈ 485). Sirve como referencia de qué peso de imágenes es razonable y para que el diseño no sea la causa de un empeoramiento.

**Cómo se controla en la prueba A/B:** la carga y el peso de Líneas de la variante nueva no deben superar a los del control; si superan los 13,7 s (el peor valor medido hoy) se detiene la prueba.

---

## 8. Qué no concluir

- No usar "entradas ÷ salidas" como si fuera una tasa de salida.
- No generalizar a todo el tráfico con las grabaciones de Clarity (son una muestra).
- No comparar la tasa de evento clave entre páginas mientras la definición no esté aclarada.
- No leer un tiempo de interacción menor como mejora: el objetivo es que el tiempo termine en avance a la PDP.
- No atribuir a la PLP cambios que vengan de campañas, estacionalidad o cambios de precio. Las pruebas A/B existen justamente para separar eso.
- Los datos que muestra el prototipo (estrellas, reseñas, firmeza y adaptación de cada modelo) son sintéticos o estimados. **No se deben llevar tal cual al sitio real**, porque cualquier prueba con usuarios reales estaría midiendo datos inventados.

---

## 9. Siguientes pasos

1. Calcular la línea base de la sección 5 con los datos del sitio actual.
2. Aclarar con el equipo qué cuenta como evento clave en cada página, y validar los techos de rendimiento de la sección 7.
3. Acordar con quien implemente el sitio el plan de eventos de la sección 4.
4. Recalcular el tamaño de muestra con la línea base real y fijar la duración de la prueba.
5. Repetir el plan para la PDP y para el quiz cuando esas piezas tengan datos reales.
