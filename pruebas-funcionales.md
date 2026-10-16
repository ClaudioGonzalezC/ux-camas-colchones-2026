# Pruebas funcionales del prototipo

Ejecutadas el 16-10-2026 sobre `localhost:8743` (servidor estático de la carpeta del proyecto), con scripts que cargan cada página en el navegador, accionan los controles y comparan con el catálogo (`data/modelos.js`). Las pruebas de ancho de pantalla emulan 360, 390, 700, 768, 900, 1024, 1200, 1280 y 1440 px; no se probó en teléfonos reales.

## Resumen

**92 casos de prueba, 92 aprobados.** 4 casos fallaron en la primera ejecución por defectos reales del prototipo (3 defectos distintos: dos casos detectaron el mismo precio) y se corrigieron (🛠️); 8 fallaron por un error de la propia prueba o una expectativa mal planteada y se corrigieron en la prueba (✅*); 80 pasaron a la primera (✅).

Las pruebas se ejecutaron con scripts del navegador que no forman parte del repositorio; los pasos de cada caso permiten repetirlas a mano. Para volver a ejecutarlas basta servir la carpeta con `python3 -m http.server 8743`.

| Área | Casos | Aprobados |
|---|---|---|
| Guía (index-guia.html) | 24 | 24 |
| Líneas (index-lineas.html) | 19 | 19 |
| Ficha de producto (index-pdp.html + data/pdp.js) | 16 | 16 |
| Datos y catálogo (data/modelos.js, imágenes) | 10 | 10 |
| Responsive y móvil | 5 | 5 |
| Accesibilidad | 3 | 3 |
| Rendimiento | 3 | 3 |
| Flujos de punta a punta | 5 | 5 |
| Robustez y casos límite | 4 | 4 |
| Documentación | 3 | 3 |
| **Total** | **92** | **92** |

## Defectos encontrados y corregidos al ejecutar las pruebas

| # | Dónde | Qué pasaba | Corrección |
|---|---|---|---|
| 1 | Guía · card Premium 2 Plazas (D06) | El colchón intermedio mostraba "Desde $249.990" (y $239.990 en 190), pero el catálogo tiene el colchón Upline a $219.990 (y $209.990). | Se actualizaron los dos precios de la card. |
| 2 | Ficha · filas de características (R01) | Entre 701 y ~1.300 px la página se desbordaba de lado (1009 px en 768, 1137 en 1024) porque la fila medía 1.250 px fijos. | Entre esos anchos las columnas se reparten el espacio. |
| 3 | Ficha en móvil · barra fija (R04) | El botón "Agregar al carro" de la barra fija medía 34 px. | Sube a 44 px. |

## Observaciones que no son defectos

- **5 variantes del catálogo sin precio normal** (D02): la ficha no muestra descuento en ellas y no genera valores inválidos.
- **Aviso en consola** (X03): el único es el CORS del video de Vimeo de la ficha del colchón, propio de abrir el archivo desde localhost; no aparece en Guía, Líneas ni en las fichas sin video.
- **Controles de 34 a 38 px** (R05): cumplen el mínimo de 32 px usado en la prueba, pero quedan bajo los 40–44 px recomendados: selector de firmeza de Guía (34), botones de tamaño (38), base y tamaño de la ficha (36).
- **Base y colchón de tamaños distintos en la ficha** (P08): la base "Base Black 2 Plazas 150 x 200 cm" se puede sumar a un colchón de 150 x 190 cm; el catálogo no relaciona las medidas.
- **Las pruebas no cubren** teléfonos reales, lectores de pantalla, navegadores distintos de Chrome, ni el contenido que no existe en el prototipo (galería y textos de los modelos sin ficha completa).

## Cómo leer los resultados

✅ pasó a la primera · 🛠️ falló por un defecto real, se corrigió y pasó · ✅* la primera ejecución falló por un error de la prueba (se explica en la fila) y pasó al corregirla.

## Guía (index-guia.html)

### G01 · Carga y estructura de la Guía ✅

**Pasos**

1. Abrir index-guia.html.
2. Contar los botones de tamaño, las grillas de cards y las cards de línea.
3. Revisar que existan el carrusel de categorías y el recomendador.

**Resultado esperado:** 7 botones de tamaño y 7 grillas (una por tamaño, solo 2 Plazas visible); 20 cards de línea en total; carrusel de categorías (≥ 8) y recomendador presentes.

**Resultado obtenido:** 7 botones, 7 grillas, 20 cards, solo 2 Plazas visible, 10 categorías.

### G02 · Botones de tamaño muestran su grilla ✅

**Pasos**

1. Abrir index-guia.html.
2. Pulsar cada uno de los 7 botones de tamaño, uno a uno.
3. Después de cada clic, ver qué grilla está visible.

**Resultado esperado:** Solo la grilla del tamaño elegido es visible; solo ese botón queda activo.

**Resultado obtenido:** Los 7 tamaños muestran solo su grilla y marcan solo su botón.

### G03 · Aviso cuando un tamaño no tiene alguna línea ✅

**Pasos**

1. Abrir index-guia.html.
2. Pulsar 1 Plaza, 1,5 Plaza, Full, Queen, Super King, 2 Plazas y King.
3. Leer el aviso bajo los botones.

**Resultado esperado:** 1 Plaza, 1,5 Plaza y Full: "no tenemos Línea Advantage ni Selección Excelsior" y sugieren 2 Plazas, King y Super King. Queen: "solo tenemos Selección Excelsior". Super King: "no tenemos Línea Esencial". 2 Plazas y King: sin aviso.

**Resultado obtenido:** Textos correctos en los 7 tamaños (1 Plaza/1,5/Full: sin Advantage ni Excelsior; Queen: solo Excelsior; Super King: sin Esencial; 2 Plazas y King: sin aviso).

### G04 · El aviso no mueve las cards ✅

**Pasos**

1. Abrir index-guia.html en escritorio y repetir en 390 px de ancho.
2. Recorrer los 7 tamaños.
3. Medir la posición vertical de la grilla de cards en cada uno.

**Resultado esperado:** La posición de la grilla es idéntica en los 7 tamaños, con y sin aviso, en ambos anchos.

**Resultado obtenido:** La grilla queda en la misma posición en los 7 tamaños: 2060 px a 1200 px de ancho y 1210 px a 390 px.

### G05 · Los tamaños sugeridos del aviso son enlaces ✅

**Pasos**

1. Pulsar 1 Plaza.
2. Pulsar el primer tamaño sugerido del aviso (2 Plazas).

**Resultado esperado:** Se activa el botón y la grilla de ese tamaño, y el aviso se recalcula (2 Plazas queda sin aviso).

**Resultado obtenido:** Pulsar el tamaño sugerido activa 2 Plazas y el aviso desaparece.

### G06 · Cada card arranca en firmeza "intermedio" ✅

**Pasos**

1. Abrir index-guia.html y recorrer los 7 tamaños.
2. En cada card, revisar qué firmeza está elegida.

**Resultado esperado:** En toda card que tiene firmeza intermedia, esa es la elegida; el resto arranca en su primera firmeza disponible. Siempre hay exactamente una elegida.

**Resultado obtenido:** Las 20 cards tienen exactamente una firmeza elegida y arrancan en intermedio donde existe.

### G07 · La firmeza cambia el precio "Desde" ✅

**Pasos**

1. En 2 Plazas, ubicar la card Línea Premium.
2. Pulsar suave, intermedio y firme.
3. Leer el precio después de cada clic.

**Resultado esperado:** suave $599.990, intermedio $359.990, firme $439.990.

**Resultado obtenido:** suave $599.990, intermedio $359.990, firme $439.990.

### G08 · Selector de firmeza con teclado ✅

**Pasos**

1. En la card Premium de 2 Plazas, enfocar "intermedio" con Tab.
2. Pulsar flecha derecha dos veces, luego flecha izquierda.
3. Pulsar Enter y Espacio sobre una firmeza.

**Resultado esperado:** Las flechas cambian la firmeza elegida (y el precio) y dan la vuelta al llegar al final; Enter y Espacio la eligen; solo la firmeza elegida entra en el orden de Tab.

**Resultado obtenido:** Secuencia firme › suave › firme › intermedio › firme; tabindex −1,−1,0.

### G09 · Cambio de tipo: Camas, Box Spring y Colchones ✅

**Pasos**

1. En 2 Plazas Premium pulsar "Box Spring", luego "Colchones", luego "Camas Europeas".
2. Observar firmezas visibles, tamaño y precio.

**Resultado esperado:** Box Spring muestra solo intermedio y firme (intermedio $469.990). Colchones muestra las tres firmezas y las medidas 150 x 190 y 150 x 200. Camas Europeas solo 150 x 200. Cada cambio actualiza el precio.

**Resultado obtenido:** Box Spring: intermedio/firme ($469.990); Colchones: 3 firmezas y medidas 190/200; Camas: solo 150 x 200cm.

### G10 · Precio del colchón según la medida 🛠️

**Pasos**

1. En 2 Plazas Premium pulsar "Colchones" y firmeza intermedio.
2. Alternar 150 x 190cm y 150 x 200cm.

**Resultado esperado:** 150 x 190cm $209.990 y 150 x 200cm $219.990 (el mínimo real de colchón Premium intermedio es Upline).

**Resultado obtenido:** Primera ejecución: $239.990/$249.990 era el valor anterior; la prueba D06 detectó que el catálogo tiene Upline a $219.990/$209.990. Se corrigió la card y ahora da $209.990 y $219.990.

### G11 · Botón "Ver modelos X" lleva a una lista con modelos ✅

**Pasos**

1. Para cada una de las 20 cards, leer el enlace de "Ver modelos X".
2. Abrir ese enlace en Líneas.

**Resultado esperado:** El enlace trae tamaño, línea, firmeza, tipo y medida; en las 20 la lista de Líneas muestra al menos 1 modelo.

**Resultado obtenido:** Los 20 enlaces traen sus parámetros y los 20 abren una lista con al menos 1 modelo.

### G12 · Enlace "Ir a líneas camas y colchones" ✅*

**Pasos**

1. Para cada tamaño, pulsar (o leer) "Ir a líneas camas y colchones".

**Resultado esperado:** Lleva a la card de Línea Premium del tamaño activo (o la primera si no hay Premium) con sus mismos parámetros y al ancla #modelosResultado.

**Resultado obtenido:** La primera ejecución falló por la propia prueba (un clic simulado en el enlace navega y dejaba la página vieja); con la navegación bloqueada, los 7 tamaños apuntan a la card Premium (o la primera).

### G13 · Cantidad de modelos y distintivo "Más modelos" ✅*

**Pasos**

1. En 2 Plazas con Camas Europeas, leer la cantidad bajo el nombre de cada línea.
2. Cambiar a Colchones y leer de nuevo.
3. Mirar qué card lleva el distintivo.

**Resultado esperado:** Camas: Esencial 5, Premium 13, Advantage 4, Excelsior 2. Colchones: 5, 14, 7, 3. "Más modelos" solo en Premium. Con empate (1 Plaza: 5 y 5) no hay distintivo.

**Resultado obtenido:** Mismo problema de prueba que G12. Repetida: cama 5/13★/4/2, colchón 5/14★/7/3, 1 Plaza 5 y 5 sin distintivo.

### G14 · Recomendador: secuencia de pasos ✅

**Pasos**

1. Pulsar "Comenzar recomendación".
2. Avanzar con "Siguiente" respondiendo cada paso.

**Resultado esperado:** Pasos en orden: Tipo, Firmeza, Cómo duermes, Qué te impide dormir, Tamaño, Presupuesto; cada uno con "Paso n de 6"; luego "Tu recomendación personalizada".

**Resultado obtenido:** Pasos 1›2›duermes›problema›tamaño›presupuesto con "Paso n de 6" y resultado "Tu recomendación personalizada".

### G15 · Recomendador: atrás conserva la respuesta ✅

**Pasos**

1. Responder el paso 1 y avanzar.
2. Pulsar "Atrás".

**Resultado esperado:** La opción elegida sigue marcada.

**Resultado obtenido:** Al volver con "Atrás" la opción elegida sigue marcada.

### G16 · Resumen editable y reinicio ✅*

**Pasos**

1. Terminar el recomendador.
2. Pulsar un chip del resumen (por ejemplo "Firmeza").
3. Terminar de nuevo y pulsar "Volver a empezar".

**Resultado esperado:** El chip lleva al paso correspondiente; "Volver a empezar" borra las respuestas y vuelve a la intro.

**Resultado obtenido:** La primera ejecución respondió solo 4 pasos y esperaba 6 chips; con las 6 respuestas hay 6 chips, el chip lleva al paso con su respuesta y "Volver a empezar" borra todo.

### G17 · Resultado: las 42 combinaciones de tipo × firmeza × tamaño ✅

**Pasos**

1. Responder el recomendador con cada una de las 42 combinaciones (2 tipos × 3 firmezas × 7 tamaños).
2. Contar las cards del resultado.
3. Abrir el enlace "Ver todos los modelos con mi selección".

**Resultado esperado:** Todas devuelven al menos 1 card y el enlace lleva a una lista con modelos. Las combinaciones inexistentes muestran un aviso de relajo.

**Resultado obtenido:** 42 combinaciones con resultado (1 a 3 cards); 10 con aviso de relajo; los 32 enlaces distintos del botón principal abren listas con modelos.

### G18 · Resultado respeta el presupuesto ✅*

**Pasos**

1. Responder Cama, Intermedio, 2 Plazas y "Menos de $500.000".
2. Repetir con King, Colchón, Firme y "Más de $2.000.000".

**Resultado esperado:** El primero devuelve 3 cards de precio ≤ $500.000, de las líneas que tengan modelos dentro del presupuesto (solo Esencial y Premium: Advantage parte en $799.990). El segundo devuelve el Colchón Pionero primero.

**Resultado obtenido:** La expectativa inicial pedía 3 líneas distintas, pero dentro del presupuesto solo Esencial y Premium tienen modelos: devuelve Wave, Indie y Ergo-T New (2 líneas, todos ≤ $500.000). Segundo caso: Colchón Pionero primero.

### G19 · Resultado avisa cuando relaja la combinación ✅

**Pasos**

1. Responder Cama, Suave, Queen.
2. Responder Cama, Firme, 1 Plaza.

**Resultado esperado:** Queen: aviso y 1 card Box Spring J. Rosenberg Founder. 1 Plaza firme: aviso "no tenemos … de firmeza firme" y cards de firmeza intermedio.

**Resultado obtenido:** Queen suave: Box Spring J. Rosenberg Founder con aviso; 1 Plaza firme: 3 cards de firmeza intermedio con aviso.

### G20 · Botón "Ver todos los modelos con mi selección" ✅

**Pasos**

1. Responder Cama, Intermedio, 2 Plazas.
2. Leer y abrir el botón.

**Resultado esperado:** Lleva a index-lineas.html con tamano=2-plazas, linea=Línea Premium, firmeza=intermedio, tipo=cama-europea y medida=150 x 200cm.

**Resultado obtenido:** Enlace con tamano=2-plazas, linea=Línea Premium, firmeza=intermedio, tipo=cama-europea y medida=150 x 200cm.

### G21 · "Guarda tu recomendación" plegado ✅

**Pasos**

1. Llegar al resultado.
2. Medir el alto de la fila "¿Quieres guardar tu selección?".
3. Pulsar "Enviármela por correo", luego "Enviar".
4. Pulsar "Volver a empezar".

**Resultado esperado:** La fila plegada ocupa ≈ 49 px; al pulsar se abre el formulario con foco en "Nombre"; "Enviar" muestra la confirmación; al reiniciar vuelve plegada.

**Resultado obtenido:** Plegado 49 px; abierto 211 px con foco en "Nombre"; confirmación al enviar; al reiniciar vuelve plegado.

### G22 · Recomendador accesible con teclado ✅

**Pasos**

1. Iniciar el recomendador.
2. Revisar los roles de las opciones.
3. Con teclado: Tab, flechas, Enter.

**Resultado esperado:** Cada paso es un grupo de opciones (radiogroup); las flechas cambian y eligen; Enter elige; al avanzar el foco pasa a la pregunta.

**Resultado obtenido:** Grupo de opciones etiquetado, flecha cambia y marca la opción, el foco pasa a la pregunta al abrir y al avanzar.

### G23 · Comparar desde el resultado del recomendador ✅

**Pasos**

1. Llegar al resultado y marcar "Comparar" en 2 cards.
2. Pulsar "Ver comparación".
3. Quitar un producto con ×.

**Resultado esperado:** Aparece la barra con los 2 nombres; el cajón muestra la franja "Iguales en los 2" y cada producto con su diferencia de precio; al quitar uno queda 1.

**Resultado obtenido:** Barra con 2 productos, franja de iguales, 2 cards con 1 etiqueta de diferencia; al quitar uno queda 1.

### G24 · Carrusel de categorías ✅

**Pasos**

1. Abrir index-guia.html.
2. Contar las categorías.

**Resultado esperado:** 8 o más categorías con imagen y nombre.

**Resultado obtenido:** 10 categorías.

## Líneas (index-lineas.html)

### L01 · Carga sin parámetros ✅

**Pasos**

1. Abrir index-lineas.html sin parámetros.

**Resultado esperado:** Muestra la lista por defecto: Línea Premium, 2 Plazas, intermedio, Camas Europeas (7 modelos); 4 banners de línea; nunca 0 productos.

**Resultado obtenido:** 7 modelos, Línea Premium, 2 Plazas, intermedio, Camas Europeas y 4 banners.

### L02 · Matriz de parámetros: 252 combinaciones ✅

**Pasos**

1. Abrir Líneas con cada combinación de 7 tamaños × 4 líneas × 3 firmezas × 3 tipos.
2. Comparar la cantidad de cards con el catálogo.

**Resultado esperado:** Cada combinación muestra exactamente las cards que indica el catálogo, o un aviso de "sin modelos" con alternativas si no hay ninguna. Sin errores.

**Resultado obtenido:** 252 combinaciones: 77 con la cantidad exacta de modelos del catálogo y 175 vacías con aviso y alternativas. 0 fallas.

### L03 · Banners conservan el contexto ✅

**Pasos**

1. Abrir 2 Plazas, Premium, intermedio, cama.
2. Leer el enlace de cada banner.

**Resultado esperado:** Cada banner cambia solo la línea y conserva tamaño, firmeza, tipo, medida y orden.

**Resultado obtenido:** Los 4 banners conservan tamaño, firmeza, tipo, medida y orden, y cambian solo la línea.

### L04 · Banners deshabilitados cuando no hay modelos ✅

**Pasos**

1. Abrir Queen con Selección Excelsior y box spring.
2. Leer los 4 banners.

**Resultado esperado:** Esencial, Premium y Advantage: "No disponible en Queen" y botón desactivado. Excelsior: activo con su precio.

**Resultado obtenido:** Esencial, Premium y Advantage desactivados ("No disponible en Queen"); Excelsior activo desde $7.699.990.

### L05 · "Desde" calculado según el contexto ✅

**Pasos**

1. Abrir 2 Plazas cama y leer los 4 "Desde".
2. Abrir King colchón y leer de nuevo.

**Resultado esperado:** 2 Plazas cama: $249.990, $359.990, $799.990, $1.679.989. King colchón: $189.990, $249.990, $749.990, $1.499.990. Con nota "Precio mínimo de … en …".

**Resultado obtenido:** 2 Plazas cama $249.990 / $359.990 / $799.990 / $1.679.989; King colchón $189.990 / $249.990 / $749.990 / $1.499.990, con su nota.

### L06 · Cantidad de modelos y "Más modelos" en los banners ✅

**Pasos**

1. Abrir 2 Plazas cama, 2 Plazas colchón, King cama y 1 Plaza cama.

**Resultado esperado:** Premium muestra 13 / 14 / 12 modelos con "Más modelos"; en 1 Plaza (5 y 5) no hay distintivo.

**Resultado obtenido:** Premium 13, 14 y 12 modelos con "Más modelos"; 1 Plaza (5 y 5) sin distintivo.

### L07 · Selector de tipo ✅

**Pasos**

1. Abrir 2 Plazas Premium intermedio cama.
2. Pulsar Colchones y luego Box Spring.
3. Abrir Queen Excelsior box spring.

**Resultado esperado:** Pestañas con cantidad: Camas (7), Box Spring (2), Colchones (8). Al pulsar cambia el tipo y se conservan línea, tamaño, firmeza y orden. Con un solo tipo disponible el selector se oculta.

**Resultado obtenido:** Camas (7), Box Spring (2), Colchones (8); conserva orden y línea; en Queen el selector se oculta.

### L08 · Ordenar por: 7 criterios ✅

**Pasos**

1. Abrir 2 Plazas Premium intermedio colchón.
2. Elegir cada criterio del selector "Ordenar por".

**Resultado esperado:** Relevancia (orden del catálogo), A–Z, Z–A, menor precio, mayor precio, mayor descuento y más vendidos ordenan correctamente; el orden se guarda en la URL (?orden=) salvo Relevancia.

**Resultado obtenido:** Los 7 criterios ordenan bien (A–Z, Z–A, menor, mayor, descuento, más vendidos, relevancia).

### L09 · Orden por URL ✅

**Pasos**

1. Abrir la lista con ?orden=menor.
2. Abrir con ?orden=cualquiera.
3. Cambiar el orden con el selector y recargar.

**Resultado esperado:** Con orden=menor carga ordenada y el selector lo muestra; un valor inválido se ignora (Relevancia); al recargar se conserva el orden.

**Resultado obtenido:** orden=menor carga ordenado; un valor inválido se ignora; mayor queda en la URL y sobrevive a la recarga.

### L10 · Etiquetas de diferencia de precio ✅

**Pasos**

1. Abrir 2 Plazas Premium intermedio cama.
2. Leer las etiquetas bajo cada precio.

**Resultado esperado:** La card más barata lleva el distintivo "Más económico"; las demás "+$X vs. el más económico". Con menos de 3 modelos no hay etiquetas.

**Resultado obtenido:** Mínimo $359.990 con "Más económico"; las otras 6 con su "+$X"; Queen (1 modelo) sin etiquetas.

### L11 · "También como…" y resaltado del modelo ✅

**Pasos**

1. En la lista de camas pulsar "También como: Colchón $X" de una card.
2. Observar la lista y la posición.

**Resultado esperado:** La lista pasa al tipo elegido, se desplaza hasta el mismo modelo y lo resalta unos segundos.

**Resultado obtenido:** "También como: Colchón $249.990" → pestaña Colchones, Indie resaltado y visible; el resaltado se apaga.

### L12 · Base completa/dividida en la card ✅

**Pasos**

1. Abrir 2 Plazas Premium intermedio cama.
2. En New style 6 pulsar "dividida" y luego "completa".

**Resultado esperado:** El precio cambia ($389.990 / $369.990), el descuento y la imagen se actualizan, y el enlace "Ver producto" lleva base= a la ficha.

**Resultado obtenido:** completa $369.990 y dividida $389.990 (26%), imagen cambia, el enlace lleva base=dividida.

### L13 · Almohada en colchones New style 6 ✅

**Pasos**

1. Abrir 2 Plazas Premium intermedio colchón.
2. Marcar y desmarcar "+ Almohada Fibra Light" en New style 6.

**Resultado esperado:** La imagen cambia con la almohada y vuelve al desmarcar; el precio se mantiene coherente con el catálogo.

**Resultado obtenido:** La imagen cambia con la almohada y vuelve; el precio se mantiene en $249.990 (el catálogo no cobra extra).

### L14 · Estado vacío con alternativas ✅

**Pasos**

1. Abrir 1 Plaza, Línea Premium, firme, cama europea.
2. Pulsar una de las alternativas.

**Resultado esperado:** Mensaje claro "No hay … de firmeza firme en …" y enlaces "Lo que sí hay"; cada alternativa lleva a una lista con modelos.

**Resultado obtenido:** Mensaje "No hay camas europeas de firmeza firme…" y 2 alternativas que abren listas con modelos.

### L15 · Comparador en Líneas ✅

**Pasos**

1. Marcar "Comparar" en 3 productos.
2. Intentar marcar un cuarto.
3. Pulsar "Ver comparación".

**Resultado esperado:** El cuarto no se marca (límite 3); la barra lista los 3; el cajón muestra la franja de iguales, solo lo que difiere y los distintivos.

**Resultado obtenido:** Cuarto producto no se marca; 3 en la barra; franja de iguales, 2 etiquetas de diferencia, "Más económico" y "Mejor evaluado", enlaces a la ficha.

### L16 · Persistencia del comparador ✅

**Pasos**

1. Marcar 2 productos en Líneas.
2. Abrir Guía en la misma pestaña.
3. Volver a Líneas.

**Resultado esperado:** La barra de comparación mantiene los 2 productos en ambas páginas.

**Resultado obtenido:** 2 productos en Líneas, 2 en Guía (barra visible) y 2 al volver a Líneas con las casillas marcadas.

### L17 · "Ver producto" desde cada card ✅

**Pasos**

1. Abrir una lista y leer el enlace de "Ver producto" de cada card.

**Resultado esperado:** Cada enlace apunta a index-pdp.html con modelo, tipo, tamaño, línea, firmeza y medida; la ficha encuentra el modelo.

**Resultado obtenido:** 248 enlaces "Ver producto" de las 77 listas apuntan a modelos que existen.

### L18 · Guía de tamaños ✅

**Pasos**

1. Abrir Líneas y bajar a "Elige por tamaño".

**Resultado esperado:** 1 Plaza 90×190/200, 1,5 Plazas 105×190/200, Full 135×200, 2 Plazas 150×190/200, Queen 160×200, King 180×200, Super King 200×200.

**Resultado obtenido:** Las 7 medidas son las de la tabla real.

### L19 · Preguntas frecuentes ✅

**Pasos**

1. Pulsar una pregunta del acordeón y volver a pulsarla.

**Resultado esperado:** La respuesta se abre y se cierra.

**Resultado obtenido:** 7 preguntas; cerrada › abierta › cerrada.

## Ficha de producto (index-pdp.html + data/pdp.js)

### P01 · Ficha sin parámetros: Colchón New style 6 ✅

**Pasos**

1. Abrir index-pdp.html sin parámetros.

**Resultado esperado:** "Colchón New style 6", Línea Premium, $249.990 / $339.990 (26%), medidas 150 x 190 y 150 x 200, 6 miniaturas, video, almohada y el "Ver este modelo como" con Cama europea y Colchón.

**Resultado obtenido:** Colchón New style 6, $249.990 / $339.990 (26%), 6 miniaturas, video, almohada, medidas 190/200 y chips Cama europea / Colchón.

### P02 · Medida del colchón cambia el precio ✅

**Pasos**

1. Abrir la ficha sin parámetros.
2. Pulsar 150 x 190cm y luego 150 x 200cm.

**Resultado esperado:** $239.990 con 150 x 190 y $249.990 con 150 x 200; la barra fija y las cuotas se actualizan.

**Resultado obtenido:** 150 x 190cm $239.990 (cuotas $19.999) y 150 x 200cm $249.990 (cuotas $20.833); la barra fija sigue el precio.

### P03 · Cama New style 6: base y galería ✅

**Pasos**

1. Abrir ?modelo=New style 6&tipo=cama-europea&tamano=2-plazas&linea=Línea Premium&firmeza=intermedio.
2. Pulsar "dividida", luego "completa".
3. Pulsar una miniatura.

**Resultado esperado:** Completa $369.990 / $499.990, dividida $389.990 / $529.990; la galería (7 fotos) cambia de base; la miniatura cambia la imagen principal.

**Resultado obtenido:** Completa $369.990 / $499.990, dividida $389.990 / $529.990; 7 fotos que cambian con la base; la miniatura cambia la imagen principal.

### P04 · Las 248 combinaciones de modelo y tipo ✅

**Pasos**

1. Abrir la ficha para cada modelo y cada tipo del catálogo (248 combinaciones).
2. Revisar nombre, línea, precio, imagen y medida.

**Resultado esperado:** Todas completan: nombre "Tipo + modelo", línea correcta, precio sin NaN, imagen cargada, al menos una medida y el script termina.

**Resultado obtenido:** 248 de 248 combinaciones completan sin errores (nombre, línea, título, precio, imagen y medida).

### P05 · Precio inicial de la ficha coincide con el catálogo ✅

**Pasos**

1. Para cada combinación leer el precio de la ficha.
2. Compararlo con el catálogo (precio de la variante o de la base por defecto).

**Resultado esperado:** Coinciden en todas las combinaciones.

**Resultado obtenido:** 248 de 248 precios de la ficha y de la barra fija coinciden con el catálogo.

### P06 · Cantidad ✅

**Pasos**

1. Pulsar "−" con cantidad 1.
2. Pulsar "+" tres veces.

**Resultado esperado:** El mínimo es 1 y la cantidad sube de a uno.

**Resultado obtenido:** El mínimo es 1; "+" sube de a uno.

### P07 · Agregar al carro ✅

**Pasos**

1. Pulsar "Agregar al carro" con cantidad 2.
2. En el carro subir y bajar la cantidad de un producto.
3. Quitar el producto.

**Resultado esperado:** Se abre el carro con el producto, nombre con medida, precio y cantidad 2; el subtotal se recalcula; al quitar queda vacío.

**Resultado obtenido:** Carro con "Colchón New style 6 — 150 x 190cm" ×3 = $719.970; con +1 queda $959.960; al quitar, $0.

### P08 · Base de complemento (colchón) ✅

**Pasos**

1. En la ficha del colchón elegir una base en "Complementa con".
2. Agregar al carro.

**Resultado esperado:** La barra fija suma el precio de la base; el carro incluye el colchón y la base como líneas separadas.

**Resultado obtenido:** Base +$140.000 en la barra fija; el carro tiene 2 líneas (colchón y base).

### P09 · Productos "También te puede interesar" ✅

**Pasos**

1. Marcar un producto adicional.
2. Mirar la barra fija y agregar al carro.

**Resultado esperado:** La barra fija suma su precio al total; el carro lo incluye.

**Resultado obtenido:** Cubrecolchón +$46.990 en la barra; el carro lo incluye.

### P10 · Barra fija de compra ✅

**Pasos**

1. Abrir la ficha en el tope.
2. Bajar más de 40 px.
3. Cambiar de medida.

**Resultado esperado:** En el tope no se ve; al bajar aparece con nombre, precio, ahorro y cuotas; se actualiza con la medida.

**Resultado obtenido:** Oculta en el tope; aparece al bajar con nombre, precio, ahorro y cuotas; se actualiza con la medida.

### P11 · Puente "Ver este modelo como" ✅

**Pasos**

1. Abrir la ficha de Cama Europea Bock.
2. Pulsar el chip de otro tipo.

**Resultado esperado:** Muestra los tipos disponibles del modelo con su precio; el actual aparece activo (sin enlace) y los demás llevan a la ficha de ese tipo.

**Resultado obtenido:** Cama europea $799.990 (activo) · Box spring $879.990 · Colchón $649.990; el chip lleva a la ficha del Colchón Bock.

### P12 · Enlaces de regreso a la lista ✅

**Pasos**

1. Abrir una ficha desde Líneas.
2. Pulsar "Líneas Camas y Colchones" del breadcrumb y "Comparar".

**Resultado esperado:** Vuelven a la lista del mismo contexto (tamaño, línea, firmeza, tipo) con el modelo resaltado.

**Resultado obtenido:** Breadcrumb y "Comparar" llevan a la lista del mismo contexto y resaltan a Indie.

### P13 · Producto inexistente ✅

**Pasos**

1. Abrir ?modelo=Inexistente&tipo=colchon&tamano=king.
2. Abrir ?modelo=Wave&tipo=box-spring&tamano=2-plazas.

**Resultado esperado:** Aviso "No encontramos este producto" sin la ficha; en el segundo caso ofrece los tipos en que sí existe Wave; siempre hay un enlace a Líneas.

**Resultado obtenido:** Los 3 casos muestran el aviso sin ficha y con enlace a Líneas; Wave en box spring ofrece Cama europea y Colchón.

### P14 · Secciones según el producto ✅*

**Pasos**

1. Abrir la ficha de un modelo genérico, de New style 6 cama y del colchón.

**Resultado esperado:** Genérico: sin capas, "¿Por qué elegirlo?", características, reseñas ni video (1 foto); New style 6 cama: conserva capas y características, sin reseñas ni video (7 fotos); colchón: todo (6 fotos).

**Resultado obtenido:** La primera ejecución contó 4 miniaturas en el colchón porque no incluía las 2 de bajo la imagen (total 6); el resto de las condiciones coinciden.

### P15 · Escala de firmeza y adaptación ✅

**Pasos**

1. Abrir una ficha y comparar las barras y las escalas con el catálogo.

**Resultado esperado:** Los segmentos llenos y el punto activo corresponden a la firmeza y adaptación del catálogo.

**Resultado obtenido:** 24 combinaciones de muestra: barras y punto de la escala coinciden con el catálogo.

### P16 · Popovers y preguntas frecuentes ✅

**Pasos**

1. Pulsar "Cómo medir tu colchón" y una pregunta frecuente.

**Resultado esperado:** El popover se abre y se cierra al pulsar fuera; la pregunta se despliega.

**Resultado obtenido:** Popover de medir y de base abren y cierran; la pregunta se despliega.

## Datos y catálogo (data/modelos.js, imágenes)

### D01 · Estructura del catálogo ✅

**Pasos**

1. Cargar data/modelos.js y contar bloques y modelos.

**Resultado esperado:** 18 bloques tamaño × línea y 112 modelos; sin nombres repetidos dentro de un bloque.

**Resultado obtenido:** 18 bloques y 112 modelos, sin nombres repetidos por bloque.

### D02 · Consistencia de precios ✅

**Pasos**

1. Revisar cada variante del catálogo.

**Resultado esperado:** Precio > 0 y precio normal ≥ precio; descuento ≤ 80%; cada modelo tiene al menos un tipo.

**Resultado obtenido:** Precios coherentes; 5 variantes sin precio normal (la ficha no muestra descuento en ellas y no genera NaN).

### D03 · Firmeza coherente con su grupo ✅

**Pasos**

1. Revisar el valor de firmeza de cada modelo frente al grupo en que está.

**Resultado esperado:** suave: 1–2, intermedio: 3–4, firme: 5; adaptación entre 1 y 5.

**Resultado obtenido:** Firmeza coherente con su grupo y adaptación entre 1 y 5 en los 112 modelos.

### D04 · Todas las imágenes existen ✅

**Pasos**

1. Reunir todas las rutas de imagen de las 3 páginas y del catálogo.
2. Pedir cada una.

**Resultado esperado:** Todas responden 200; ninguna es JPG o PNG pesado sin convertir.

**Resultado obtenido:** 285 rutas de imagen, ninguna rota, ninguna mayor de 400 KB y ninguna JPG/PNG sin convertir.

### D05 · Sin imágenes de rosen.cl enlazadas ✅

**Pasos**

1. Buscar "rosen.cl/media" en los archivos del prototipo.

**Resultado esperado:** Ninguna referencia directa a imágenes de rosen.cl (todas son locales).

**Resultado obtenido:** Sin referencias directas a rosen.cl/media.

### D06 · Precios de Guía vs catálogo 🛠️

**Pasos**

1. Para cada card de Guía comparar el precio de cada firmeza con el mínimo del catálogo.

**Resultado esperado:** Los precios mínimos por firmeza (cama, box spring y colchón por medida) coinciden con el catálogo.

**Resultado obtenido:** Hallazgo real: la card Premium 2 Plazas mostraba el colchón intermedio desde $249.990/$239.990 pero el catálogo tiene Upline a $219.990/$209.990. Corregido; ahora coinciden las 36 firmezas de cama/box y los 38 precios de colchón.

### D07 · Disponibilidad de las firmezas de Guía vs catálogo ✅

**Pasos**

1. Para cada pill de firmeza revisar los tipos declarados.
2. Compararlos con los modelos que existen.

**Resultado esperado:** Un tipo aparece como disponible solo si el catálogo tiene modelos en ese tamaño, línea, firmeza y tipo.

**Resultado obtenido:** 108 declaraciones de tipo disponible revisadas; ninguna diferencia con el catálogo.

### D08 · Bases de cama europea ✅

**Pasos**

1. Contar las camas con datos de base.

**Resultado esperado:** 82 de 93 camas con base; las demás sin fila de base.

**Resultado obtenido:** 93 camas, 82 con base.

### D09 · Valoraciones sintéticas estables ✅

**Pasos**

1. Pedir 3 veces la calificación y reseñas de un mismo modelo.

**Resultado esperado:** Siempre el mismo valor; calificación entre 3,0 y 5,0 y reseñas entre 100 y 300.

**Resultado obtenido:** Valor estable en repeticiones; calificaciones de 3,0 a 5,0 y reseñas de 100 a 300 en 300 muestras.

### D10 · Sintaxis de los scripts ✅

**Pasos**

1. Analizar el JavaScript de las 3 páginas, data/modelos.js y data/pdp.js.

**Resultado esperado:** Sin errores de sintaxis.

**Resultado obtenido:** 5 bloques de JavaScript sin errores de sintaxis.

## Responsive y móvil

### R01 · Sin desborde horizontal 🛠️

**Pasos**

1. Abrir Guía, Líneas y la ficha a 360, 390, 768, 1024 y 1440 px.
2. Medir el ancho del documento.

**Resultado esperado:** El ancho del documento nunca supera el de la pantalla.

**Resultado obtenido:** Hallazgo real: la ficha se desbordaba de lado entre 701 y ~1.300 px (las filas de características medían 1.250 px fijos; 1009 px en una pantalla de 768 y 1137 en 1024). Corregido; hoy 36 combinaciones (4 páginas × 9 anchos de 360 a 1440 px) sin desborde.

### R02 · Móvil · Líneas ✅*

**Pasos**

1. Abrir Líneas a 390 px.
2. Medir los banners y la posición de la primera card.

**Resultado esperado:** Las 4 líneas caben en la primera pantalla (terminan antes de 844 px) y la primera card queda a ≤ 1,25 pantallas; "Ordenar por" queda fijo al bajar y toda la fila de cada línea es tocable.

**Resultado obtenido:** La primera ejecución midió la fila tocable después de hacer scroll; ya en orden: 4 líneas terminan a 740 px, primera card a 1,22 pantallas, "Ordenar por" fijo y toda la fila tocable.

### R03 · Móvil · Guía ✅

**Pasos**

1. Abrir la Guía a 390 px.
2. Medir el carrusel, el recomendador y los tamaños.

**Resultado esperado:** Categorías en una fila que se desliza; recomendador a menos de 500 px del tope; tamaños en una sola fila; 3 recomendaciones deslizables.

**Resultado obtenido:** Carrusel de 118 px, recomendador a 379 px, tamaños en una fila, resultado deslizable y sin desborde.

### R04 · Móvil · Ficha 🛠️

**Pasos**

1. Abrir la ficha a 390 px y bajar.

**Resultado esperado:** Sin desborde; la barra fija aparece con el precio y el botón de compra.

**Resultado obtenido:** Hallazgo real: el botón de la barra fija medía 34 px. Corregido a 44 px; sin desborde y barra visible.

### R05 · Zonas de toque ✅

**Pasos**

1. A 390 px medir el alto de los controles principales de las 3 páginas.

**Resultado esperado:** Botones principales de ≥ 40 px; ningún control principal menor de 32 px.

**Resultado obtenido:** 14 controles medidos, ninguno bajo 32 px (mínimo 34 px: firmeza de Guía; 36 px en base, tamaño y chips).

## Accesibilidad

### A01 · Roles de los grupos de opciones ✅

**Pasos**

1. Revisar el recomendador y el selector de firmeza.

**Resultado esperado:** role="radiogroup" con opciones role="radio" y aria-checked.

**Resultado obtenido:** Grupos de firmeza, recomendador y pestañas con roles y estado.

### A02 · Texto alternativo de imágenes ✅

**Pasos**

1. Contar las imágenes de contenido sin atributo alt.

**Resultado esperado:** Todas las imágenes de producto tienen alt.

**Resultado obtenido:** Las 122 imágenes de las 4 vistas tienen alt.

### A03 · Controles con nombre accesible ✅

**Pasos**

1. Revisar botones y enlaces visibles sin texto ni aria-label.

**Resultado esperado:** Ninguno sin nombre accesible.

**Resultado obtenido:** Todos los botones y enlaces visibles tienen nombre.

## Rendimiento

### F01 · Peso de la primera carga ✅

**Pasos**

1. Medir el peso de cada página al cargar (sin scroll).

**Resultado esperado:** Líneas ≤ 2 MB, Guía ≤ 2 MB, ficha ≤ 2 MB.

**Resultado obtenido:** Primera carga: Guía 0,67 MB, Líneas 0,59 MB, ficha 0,76 MB y ficha cama New style 6 1,24 MB.

### F02 · Carga diferida ✅*

**Pasos**

1. Contar imágenes con loading="lazy" en las 3 páginas.

**Resultado esperado:** Todas son diferidas, salvo el logo del header y la primera miniatura de la ficha (están en la primera pantalla).

**Resultado obtenido:** Única excepción: la primera miniatura de la ficha (está en la primera pantalla).

### F03 · Sin recursos rotos ✅

**Pasos**

1. Abrir cada página y revisar las solicitudes fallidas.

**Resultado esperado:** Ninguna solicitud propia falla (404).

**Resultado obtenido:** Ninguna solicitud propia falla.

## Flujos de punta a punta

### E01 · Del recomendador a la compra ✅

**Pasos**

1. En Guía responder Cama, Intermedio, 2 Plazas, presupuesto < $500.000.
2. Pulsar "Ver producto" de la primera recomendación.
3. Agregar al carro.

**Resultado esperado:** La ficha muestra el mismo modelo, tipo y precio que la card; al agregar, el carro lo lista con ese precio.

**Resultado obtenido:** Wave $249.990 en el recomendador › misma ficha y precio › carro con $249.990.

### E02 · De una card de Guía a la comparación ✅

**Pasos**

1. En Guía, 2 Plazas, pulsar "Ver modelos Premium".
2. Marcar 2 modelos "Comparar" y abrir la comparación.
3. Pulsar "Ver producto" desde el cajón.

**Resultado esperado:** Llega a la lista Premium filtrada, compara y el enlace abre la ficha del modelo elegido.

**Resultado obtenido:** Guía › Premium (7 modelos) › comparar 2 › ficha de Indie.

### E03 · Del colchón a la cama del mismo modelo ✅

**Pasos**

1. En Líneas abrir colchones Premium y pulsar "También como: Cama europea" de New style 6.
2. Abrir su ficha y pulsar "Colchón" en "Ver este modelo como".

**Resultado esperado:** Cada paso lleva a la versión correcta del mismo modelo y vuelve sin perder el contexto.

**Resultado obtenido:** Colchón › "También como: Cama europea" › New style 6 resaltado › ficha de la cama › chip Colchón › ficha del colchón.

### E04 · Escenario Queen ✅

**Pasos**

1. En Guía pulsar Queen y leer el aviso.
2. Pulsar "Ver modelos Excelsior".
3. Abrir la ficha del único modelo.

**Resultado esperado:** Aviso "solo tenemos Selección Excelsior"; la lista muestra Box Spring J. Rosenberg Founder; su ficha abre.

**Resultado obtenido:** Aviso de Queen › lista con 1 modelo › ficha de Box Spring J. Rosenberg Founder ($7.699.990).

### E05 · Escenario sin modelos ✅

**Pasos**

1. Abrir Líneas con 1 Plaza, Premium, firme, cama.
2. Pulsar una alternativa y luego un producto.

**Resultado esperado:** Se explica que no existe, la alternativa lleva a una lista con modelos y el producto abre su ficha.

**Resultado obtenido:** 1 Plaza firme › alternativa "Camas Europeas · intermedio (5)" › ficha de la Cama Autonomy Sky.

## Robustez y casos límite

### X01 · Parámetros inválidos en Líneas ✅

**Pasos**

1. Abrir Líneas con tamano=xyz, tipo=foo, firmeza=foo, linea=foo, medida=foo, orden=foo y modelo=foo.

**Resultado esperado:** Sin error de script: tamaño o línea inexistente muestran un aviso claro; tipo inválido usa cama europea; orden y modelo inválidos se ignoran.

**Resultado obtenido:** Los 8 casos cargan sin error: tamaño o línea inválida muestran aviso; tipo, medida, orden y modelo inválidos se ignoran; siempre 4 banners.

### X02 · Comparador con datos dañados ✅

**Pasos**

1. Guardar un valor no válido en localStorage (rosenCompareItems).
2. Abrir Líneas y Guía.

**Resultado esperado:** Las páginas cargan sin romperse.

**Resultado obtenido:** Con datos dañados en localStorage ambas páginas cargan y el comparador vuelve a funcionar.

### X03 · Sin errores en consola ✅

**Pasos**

1. Abrir cada página y leer la consola.

**Resultado esperado:** Sin errores propios (el único aviso admitido es el CORS del video de Vimeo de la ficha del colchón).

**Resultado obtenido:** Sin errores propios en Guía, Líneas y la ficha. Único aviso: el CORS del video de Vimeo en la ficha del colchón, propio de abrir el archivo en localhost.

### X04 · Recarga conserva el estado de la URL ✅

**Pasos**

1. Abrir Líneas con orden y tipo en la URL.
2. Recargar.

**Resultado esperado:** La lista queda igual (mismo tipo y orden).

**Resultado obtenido:** Pestaña Colchones, orden menor y primer modelo (Upline) iguales antes y después de recargar.

## Documentación

### M01 · Enlaces internos de los documentos ✅

**Pasos**

1. Recorrer los enlaces relativos de los .md.

**Resultado esperado:** Todos apuntan a archivos que existen.

**Resultado obtenido:** 6 documentos y 37 enlaces internos; ninguno roto.

### M02 · README coherente con los archivos ✅

**Pasos**

1. Comparar los archivos que lista el README con los que existen.

**Resultado esperado:** Todos los archivos del README existen.

**Resultado obtenido:** Las 8 entradas del README existen.

### M03 · Estado de los hallazgos ✅*

**Pasos**

1. Contar los hallazgos por estado en hallazgos-y-mejoras.md.

**Resultado esperado:** Abiertos y coherentes con su nota: #6 y #7 (se comprueban con datos tras el lanzamiento), #8 (parcial, infraestructura), #35 y #36 (notas de producción y de datos).

**Resultado obtenido:** 38 hallazgos: 33 resueltos y 5 abiertos con nota (#6, #7, #8, #35, #36); la expectativa inicial omitía #6 y #7.
