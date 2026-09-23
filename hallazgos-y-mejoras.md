# Hallazgos y mejoras — consolidado

Lista única de problemas de navegación y mejoras detectadas, cruzando las tres fuentes:

- [journey-actual.md](journey-actual.md) — datos medidos del sitio en producción (BigQuery / GA4 / Clarity / GTmetrix)
- [journey-propuesta.md](journey-propuesta.md) — análisis de la navegación del prototipo
- [pruebas-usabilidad.md](pruebas-usabilidad.md) — 3 pruebas de usabilidad automatizadas

Consolidado el 10-09-2026.

---

## Cómo leer esta lista

| Marca | Significado |
|---|---|
| 🔴 **P1** | Bloquea la tarea o afecta a todo el tráfico. Arreglar primero. |
| 🟠 **P2** | Fricción alta: no bloquea, pero hace abandonar. |
| 🟡 **P3** | Calidad, rendimiento y detalle. |
| 🧪 | Limitación del prototipo, no problema de diseño. No se replicaría en producción. |

---

# Parte 1 · Problemas de navegación

## 1.1 Del sitio actual (los que el rediseño debe resolver)

| # | Problema | Evidencia |
|---|---|---|
| 🔴 1 | **Líneas no permite calibrar precio.** 34 modelos en una sola página, ninguno con precio individual — solo el rango de la línea. Para saber cuánto vale un modelo hay que salir de la página. | 56,3 s de interacción y scroll de 60–89% contra 0,32% de conversión. Perfil P4: 87,3%/82,1% no elige línea |
| 🔴 2 | **El clic en "Ver más" no resuelve la decisión, la reabre.** Lleva a una PLP con 16 SKUs del mismo modelo mezclando tipo (Colchón ×8, Cama Europea ×5, Boxet ×3) y tamaño. El usuario ya eligió modelo y aún debe resolver tipo + tamaño. | Estructura verificada en producción |
| 🔴 3 | **Comparar tipo de producto obliga a volver atrás.** "Colchón New Style 6" y "Cama Europea New Style 6" son PDPs distintas sin puente entre ellas. | Recirculación medida: 158 eventos desde la variante King, 114 desde 1,5 plazas |
| 🟠 4 | **Destinos inconsistentes desde la misma grilla.** La mayoría de los "Ver más" va a `/camas-y-colchones.html?modelo=X`, pero Pionero y Successor van a `/rosen/linea/seleccion-excelsior.html` y J. Rosenberg a `/rosen/coleccion-j-rosenberg.html`. Tres destinos desde una misma grilla. | Verificado en producción |
| 🟠 5 | **Premium está tercero pero concentra el catálogo.** El orden es Excélsior (6) → Advantage (8) → Premium (15) → Esencial (5). La línea con más modelos queda después de 14 más caros. | Verificado en producción |
| 🟠 6 | **Líneas cierra sesiones más de las que abre.** 101 grabaciones como página de salida vs 44 como entrada (2,3×). | Clarity |
| 🟠 7 | **El clic se va al header, no al contenido.** Los 310 clics registrados en Líneas se concentran en la navegación superior. | Clarity |
| 🟡 8 | **El embudo se vuelve más lento hacia la compra.** Guía 6,8–11,4 s → Líneas 9,0–13,7 s → PDP **14,0–16,4 s**, con TTFB de hasta 2.700 ms en la PDP. | GTmetrix |

## 1.2 Del prototipo — problemas de diseño reales

> **Nota de alcance (agregada 23-09-2026):** el prototipo no necesita tener la carga completa de todos los SKUs — basta con que demuestre el patrón de navegación propuesto, asumiendo que en desarrollo se muestra el catálogo completo. Por eso los ítems de esta sección están filtrados para que **sobrevivan aunque el catálogo estuviera 100% cargado**: son bugs de ruteo, defaults, contenido o layout, no de datos faltantes. Los que sí dependen de tener más SKUs cargados están en **1.3**.

Estos se replicarían tal cual en producción.

| # | Problema | Fuente |
|---|---|---|
| 🔴 9 | **El filtro de firmeza arranca en "suave" sin avisar.** `selectPill(pills[0])` y `pills[0]` es "suave". Las píldoras se leen como ficha técnica, no como filtro. Efecto medido: el usuario concluye *"esta línea no tiene productos"* cuando sí los tiene. | A2 · [index-guia.html:2949](index-guia.html:2949) |
| 🟡 10 | **En 2 Plazas la firmeza no diferencia nada — confirmado que NO se resuelve solo con más data** (ver nota del 23-09-2026). Las 4 tarjetas muestran los mismos 3 pills `suave · intermedio · firme`, y esto se replica en el sitio real: las 34 fichas de Líneas en producción muestran textualmente "Firmeza SUAVE INTERMEDIO FIRME" idéntico en todas. El componente está modelado como *variantes que vende la línea*, no como *firmeza característica de la línea* — cargar el catálogo completo no cambia eso. Necesita una decisión de diseño (ej. resaltar la firmeza predominante en vez de las 3 variantes). 2 Plazas es el filtro #1 del sitio (1.558 clics), así que el arreglo importa igual. | C1 |
| 🔴 11 | **El estado sin parámetros de Líneas muestra 0 productos.** Sin `?tamano=&linea=` el grid no se renderiza (`display:none`, 0 px). Afecta a 937 sesiones (17%), de las cuales 462 son usuarios nuevos. | [journey-propuesta.md](journey-propuesta.md) §4.1 · [index-lineas.html:3058](index-lineas.html:3058) |
| 🔴 12 | **Los cuatro botones "Ver línea …" hacen lo mismo:** `href="#shopBySize"`, bajan a la tabla de medidas sin filtrar por línea. | C2, A4 |
| 🔴 13 | **Los precios por línea no coinciden entre pantallas, y se invierte el orden.** Guía: Premium $599.990 / Advantage $579.990. Líneas: Premium $450.000 / Advantage $650.000. Producción: otro conjunto distinto. | B4, C3 |
| 🔴 14 | **La nomenclatura de tamaños se contradice a sí misma.** Guía: 2 Plazas = 150 × 200 cm. Líneas: 2 Plazas = 1,40 × 1,90 y **Queen = 1,50 × 2,00**. Se vende como "2 plazas" la medida que el propio sitio llama Queen. | A3, B3, C5 — encontrado por los tres agentes por separado |
| 🟠 15 | **Dos puertas desde Guía producen páginas distintas.** El CTA "Compara por tamaño" arrastra 5 parámetros; el link "Ir a líneas camas y colchones" no arrastra nada y cae en el estado sin productos. | [journey-propuesta.md](journey-propuesta.md) §4.2 |
| 🟠 16 | **El comparador está escondido.** Un checkbox chico y gris sobre la esquina de la foto, compitiendo con el badge de descuento y las estrellas. El texto que lo explica ("Compara hasta tres productos") aparece **después** de marcarlo. | C |
| 🟠 17 | **El comparador duplica la ficha en vez de contrastar atributos.** El cajón expandido repite la misma tarjeta del listado; nada señala en qué se diferencian los productos. | C |
| 🟠 18 | **El "Omitir" del muro de datos no es un control accesible.** Es `<span>` sin `role` ni `tabindex`, no alcanzable por teclado ni anunciado por lectores de pantalla; al lado, "Ver recomendación" sí es `<button>`. | B5 · [index-guia.html:2142](index-guia.html:2142) |
| 🟠 19 | **El muro de datos está en el peor momento**: después de 5 pasos y antes de entregar nada de valor. El titular "Un último paso **antes de continuar**" se lee como obligatorio. | A, B |
| 🟠 20 | **Falta "Queen" en el paso de tamaño del quiz**, pero sí existe en el comparador de la misma página. | B3 |
| 🟠 21 | **El quiz nunca pregunta cómo duerme el usuario.** Pregunta síntomas, pero no posición (lado/espalda/boca abajo) ni peso, que es lo que determina la firmeza. | B |
| 🟠 22 | **El paso de tamaño no ayuda a decidir**: sin medidas en cm junto a cada opción, sin "no lo sé", sin referencia de para cuántas personas. | B |
| 🟠 23 | **El resultado del quiz no se explica ni se puede corregir.** No hay "porque dijiste X te recomendamos Y", ni botón para editar respuestas o rehacer. | B |
| 🧪 24 | ~~Al cambiar a King, Premium desaparece sin mensaje~~ — **reclasificado, ver nota del 23-09-2026 abajo: se resuelve con más data, no es un problema de diseño.** | C |
| 🟡 25 | **"Compara por tamaño" promete modelos y entrega líneas.** El subtítulo lo aclara; el título genera otra expectativa. | C |
| 🟡 26 | **No hay filtro de línea dentro del listado.** Para cambiar de línea hay que volver a la portada y entrar de nuevo. | C |
| 🟡 27 | **El cajón de comparación expandido tapa el catálogo** y se colapsa con un botón circular sin etiqueta. | C |
| ✅ 28 | ~~El panel `.view-toggle` tapa la cuarta tarjeta a 1440 px~~ — **resuelto 23-09-2026**: se agregó un botón para colapsar/expandir el panel (persiste con `localStorage`), en Guía y Líneas. Mismo bloque listo para reusar cuando se agregue a PDP. | C4 |
| 🟡 29 | **Las imágenes no están optimizadas.** Miniaturas de 40–70 px servidas a 1000–1200 px (hasta 15× de exceso). En Líneas, 12 de 15 imágenes cargadas están sobredimensionadas. | [journey-propuesta.md](journey-propuesta.md) §5 |

> **Nota (23-09-2026) — resolución de los dos ítems en zona gris**, tras preguntar si más data de modelos/plazajes/tipos los resolvería:
>
> - **#24 → sí, se resuelve solo con datos.** El comparador "Compara por tamaño" no es un filtro calculado: es HTML estático, un bloque fijo por tamaño (`#products-king`, `#products-2-plazas`, etc.) con tarjetas escritas a mano. El bloque de King nunca tuvo una tarjeta de Premium — no falta calcular nada, falta escribirla. Reclasificado a 🧪 arriba.
> - **#10 → no, necesita una decisión de diseño primero.** Los mismos 3 pills (`suave · intermedio · firme`) se repiten en las 4 líneas a propósito: el componente muestra *qué variantes de firmeza vende cada línea*, no *cuál es la firmeza característica de cada línea*. Y esto no es exclusivo del prototipo: las 34 fichas de Líneas en el sitio real (rosen.cl) muestran el mismo texto "Firmeza SUAVE INTERMEDIO FIRME" idéntico en todas. Cargar más SKUs no cambia esa estructura — hace falta decidir qué debe comunicar el comparador antes de que más datos ayuden.

## 1.3 Limitaciones del prototipo 🧪

No son hallazgos de diseño — son consecuencia directa de que el prototipo no tiene el catálogo completo cargado, algo que **no se le exige a esta etapa**: basta con que demuestre el patrón, asumiendo que en desarrollo se resuelve con todos los SKUs disponibles. Por eso **no cuentan en contra del diseño de navegación**, aunque sí explican por qué las 3 pruebas de usabilidad no llegaron a completar la tarea.

| # | Limitación |
|---|---|
| 🧪 30 | **"Ver producto" solo funciona para New Style 6 Colchón.** El resto es `href="#"` (o `<button>` sin destino en las tarjetas del quiz). Mató los escenarios A y B. Se resuelve solo al cargar fichas para el resto del catálogo. |
| 🧪 31 | **El catálogo tiene una sola combinación cargada** (Premium + Cama Europea + 2 Plazas + suave). Con un solo producto el comparador nunca puede tener dos fichas. Mató el escenario C. Mismo caso: se resuelve con más SKUs cargados, no es un defecto de diseño. |
| 🧪 32 | **El resultado del recomendador es HTML estático**: siempre devuelve los mismos 3 productos, se conteste lo que se conteste. Por el mismo criterio, un wireframe no necesita lógica de matching real — solo necesita demostrar el flujo (quiz → resultado → producto). Lo que sí seguiría siendo un problema de diseño con lógica real conectada: el paso 23 (sin resumen de respuestas, sin poder corregir) y el 19 (muro de datos mal ubicado en la secuencia) — esos sobreviven independiente de si el matching funciona. |

> Para que la próxima ronda de pruebas mida navegación y no límites de catálogo: habilitar "Ver producto" en 2-3 modelos por línea (no todos), y cargar esas mismas combinaciones en el comparador. No hace falta el catálogo completo de 34 modelos — con una muestra que cubra las 4 líneas alcanza para validar el patrón.

---

# Parte 2 · Mejoras que aparecieron del análisis

## 2.1 Validadas por los datos — mantener

| Mejora | Por qué la respaldan los datos |
|---|---|
| **Tratar Líneas como paso intermedio con contexto** (parámetros de URL) | 83% del tráfico de Líneas llega navegando desde dentro del sitio |
| **Resolver tamaño y base dentro de la misma PDP**, en vez de SKUs separados | Recirculación medida entre variantes: 158 + 114 eventos. Es el patrón PDP→PDP (68,5%) con el mecanismo a la vista |
| **Grid filtrado + comparador en Líneas** | El diagnóstico es correcto: rebote 6,54%, 56,3 s de lectura, 0,32% de conversión. No es problema de atención sino de conversión de esa atención |

## 2.2 Acciones propuestas

### Prioridad 1 — antes de volver a testear

1. **Definir el estado sin parámetros de Líneas.** Dos caminos: mostrar el catálogo completo, o pre-seleccionar el filtro más probable. Si es lo segundo, el dato respalda "Camas: 2 Plazas" (1.558 clics, #1 de 23). *Lo importante: que la página nunca tenga un estado con cero productos.*
2. **Hacer que las píldoras de firmeza se vean como filtro**, con el estado seleccionado explícito antes del clic — o no preseleccionar ninguna.
3. **Diferenciar la firmeza entre líneas** en la vista de 2 Plazas, o quitar esa fila del comparador si no aporta.
4. **Unificar la nomenclatura de tamaños** en las tres páginas (y contra producción).
5. **Unificar los precios por línea** entre Guía, Líneas y producción, cuidando que no se invierta el orden entre líneas.
6. **Hacer que "Ver línea X" filtre por esa línea** en vez de hacer scroll a la tabla de medidas.
7. **Unificar las dos puertas desde Guía**: que el link plano arrastre los mismos parámetros por defecto.

### Prioridad 2 — antes de presentar

8. **Sacar el comparador del checkbox sobre la foto** y anunciarlo antes de usarlo ("Compara hasta 3 productos").
9. **Convertir el cajón de comparación en una tabla atributo por atributo**, que muestre diferencias en vez de repetir las fichas.
10. **Convertir el "Omitir" en un `<button>`** accesible por teclado, y mover el muro de datos después del resultado.
11. **Agregar "Queen" al paso de tamaño del quiz** y medidas en cm junto a cada opción.
12. **Agregar la pregunta de posición al dormir** al quiz, y un resumen editable de respuestas en el resultado.
13. **Avisar cuando una línea no existe en un tamaño**, en vez de que la tarjeta desaparezca.

### Prioridad 3 — calidad y rendimiento

14. **Optimizar las imágenes**: servirlas a 2× su tamaño de despliegue y pasar todo a WebP. Medido: −45% solo redimensionando, ~−60% con WebP, sin tocar el diseño.
15. **Fijar un techo de peso por página** una vez optimizado (ej. PDP bajo 1,5 MB), como restricción de diseño.
16. **Reposicionar el `.view-toggle`** para que no tape la cuarta tarjeta en las demos.
17. **Agregar un filtro de línea dentro del listado de modelos**, para no obligar a volver a la portada por cada candidato.

### Para poder volver a testear 🧪

18. Habilitar "Ver producto" en más de un producto.
19. Cargar al menos 2–3 combinaciones del catálogo, para que el comparador pueda tener dos fichas.
20. Conectar el resultado del recomendador con las respuestas (o marcarlo explícitamente como maqueta en la demo).

---

# Parte 3 · Preguntas abiertas

1. **¿Qué cuenta como "evento clave" en cada página?** En la PDP un evento ≈ $422.641 (calza con una compra); en Guía ≈ $4.506 (no puede ser compra). Hasta aclararlo, **las tasas de conversión entre páginas no son comparables**.
2. **Reconciliar el paso Guía → Líneas.** Las capas del wireframe dicen 4,08% mobile / 2,46% desktop; los datos nuevos sugieren ~7,6%. Probablemente distintos rangos de fecha.
3. **El perfil P3 es mayor de lo documentado**: las anotaciones hablan de 15 PDPs enviando tráfico a Guía; la consulta muestra **69**.
4. **Faltan las preguntas B2 y siguientes** de [journey-actual.md](journey-actual.md) §9 para poder escribir la capa Cognición de Líneas con datos reales.

---

# Nota de método

- Los 3 agentes de usabilidad trabajaron sin conocimiento del prototipo, sin acceso al código y sin poder editar la URL.
- Todo hallazgo se verificó contra el código antes de darlo por válido: de ~30 reportados, **2 resultaron falsos** y 1 necesitó matizarse.
- **El aislamiento por pestañas no funciona**: las próximas tandas hay que correrlas de a una.
- Pendiente: los 3 escenarios en móvil (76% de los clics de Guía), el escenario A entrando directo a Líneas, y una pasada en GitHub Pages para capturar el efecto de los tiempos de carga reales.
