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
| ✅ 1 | **Líneas no permite calibrar precio.** 34 modelos en una sola página, ninguno con precio individual — solo el rango de la línea. Para saber cuánto vale un modelo hay que salir de la página. **Respuesta del prototipo (13-10-2026) — resuelto por diseño:** la PLP de Líneas muestra cada modelo con su precio real (catálogo de 112 modelos en los 7 tamaños), se puede ordenar por menor/mayor precio o mayor descuento, y cada card indica "+$X vs. el más económico". El orden elegido viaja en la URL (`?orden=`), así que se puede compartir un listado ya ordenado. Ya no hace falta salir de la página para calibrar el precio. | 56,3 s de interacción y scroll de 60–89% contra 0,32% de conversión. Perfil P4: 87,3%/82,1% no elige línea |
| ✅ 2 | **El clic en "Ver más" no resuelve la decisión, la reabre.** Lleva a una PLP con 16 SKUs del mismo modelo mezclando tipo (Colchón ×8, Cama Europea ×5, Boxet ×3) y tamaño. El usuario ya eligió modelo y aún debe resolver tipo + tamaño. **Respuesta del prototipo (13-10-2026) — resuelto por diseño:** Guía arrastra tamaño, tipo, firmeza y medida a Líneas, que lista solo esa combinación y evita las que no existen (#15). El usuario no vuelve a resolver tipo ni tamaño. | Estructura verificada en producción |
| 🔴 3 | **Comparar tipo de producto obliga a volver atrás.** "Colchón New Style 6" y "Cama Europea New Style 6" son PDPs distintas sin puente entre ellas. **Respuesta del prototipo (13-10-2026) — parcial:** el comparador conserva las selecciones entre páginas y puede juntar un colchón con una cama europea. Falta un selector "ver este modelo como: colchón / cama europea" en la PLP y la PDP; el de la PDP depende del #30. | Recirculación medida: 158 eventos desde la variante King, 114 desde 1,5 plazas |
| ✅ 4 | **Destinos inconsistentes desde la misma grilla.** La mayoría de los "Ver más" va a `/camas-y-colchones.html?modelo=X`, pero Pionero y Successor van a `/rosen/linea/seleccion-excelsior.html` y J. Rosenberg a `/rosen/coleccion-j-rosenberg.html`. Tres destinos desde una misma grilla. **Respuesta del prototipo (13-10-2026) — resuelto por diseño:** Pionero, Successor y J. Rosenberg viven en el mismo flujo y la misma PLP filtrada que el resto del catálogo, sin destinos aparte. | Verificado en producción |
| ✅ 5 | **Premium está tercero pero concentra el catálogo.** El orden es Excélsior (6) → Advantage (8) → Premium (15) → Esencial (5). La línea con más modelos queda después de 14 más caros. **Respuesta del prototipo (15-10-2026) — resuelto por diseño:** se mantiene el orden por precio (la escalera Esencial → Excelsior permite comparar de menor a mayor) y Premium sigue siendo la línea por defecto, pero ahora cada línea muestra cuántos modelos reales tiene en el tamaño y tipo elegidos ("13 modelos") y la que tiene más lleva el distintivo "Más modelos", en los banners de Líneas y en las cards de Guía. Se calcula del catálogo, así que se mueve solo según el contexto (en 2 Plazas cama Premium tiene 13, Esencial 5, Advantage 4 y Excelsior 2); no se marca si hay empate o una sola línea con modelos. No se afirma popularidad, solo cantidad de opciones. | Verificado en producción |
| 🟠 6 | **Líneas cierra sesiones más de las que abre.** 101 grabaciones como página de salida vs 44 como entrada (2,3×). **Fuera del alcance del prototipo (13-10-2026):** es una métrica de comportamiento, no demostrable en una maqueta. Las causas probables (#1, #2, #7) están atendidas en el diseño. **Plan de medición escrito el 15-10-2026** ([plan-medicion.md](plan-medicion.md)): se corrige además la lectura del dato —2,3× entradas contra salidas no es una tasa de salida y viene de una muestra de grabaciones—, y se define tasa de salida y de avance a PDP sobre vistas y sesiones, con línea base por calcular, eventos a registrar y prueba A/B. | Clarity |
| 🟠 7 | **El clic se va al header, no al contenido.** Los 310 clics registrados en Líneas se concentran en la navegación superior. **Fuera del alcance del prototipo (13-10-2026):** depende del header real y de datos de uso. Validar con prueba A/B y mapas de clic de Clarity tras el rediseño; indicador y eventos definidos en [plan-medicion.md](plan-medicion.md). | Clarity |
| 🟡 8 | **El embudo se vuelve más lento hacia la compra.** Guía 6,8–11,4 s → Líneas 9,0–13,7 s → PDP **14,0–16,4 s**, con TTFB de hasta 2.700 ms en la PDP. **Fuera del alcance del prototipo (13-10-2026):** es rendimiento e infraestructura (TTFB de la PDP, peso de página). Lo único relacionado dentro del prototipo es el #29 (imágenes sobredimensionadas), pendiente. Se usa como indicador de control en [plan-medicion.md](plan-medicion.md) (la carga no debe superar los 13,7 s medidos hoy). Recomendación para producción: optimizar imágenes, caché y servidor de la PDP. | GTmetrix |

## 1.2 Del prototipo — problemas de diseño reales

> **Nota de alcance (agregada 23-09-2026):** el prototipo no necesita tener la carga completa de todos los SKUs — basta con que demuestre el patrón de navegación propuesto, asumiendo que en desarrollo se muestra el catálogo completo. Por eso los ítems de esta sección están filtrados para que **sobrevivan aunque el catálogo estuviera 100% cargado**: son bugs de ruteo, defaults, contenido o layout, no de datos faltantes. Los que sí dependen de tener más SKUs cargados están en **1.3**.

Estos se replicarían tal cual en producción.

| # | Problema | Fuente |
|---|---|---|
| ✅ 9 | ~~El filtro de firmeza arranca en "suave" sin avisar~~ — **resuelto 24-09-2026**: las 20 tarjetas de "Compara nuestras líneas por tamaño" ahora arrancan en el pill "intermedio" (el bucket con más cobertura real en las 4 líneas) en vez del primer pill del DOM, que solía ser "suave" — el bucket más flaco en varias líneas (ej. Advantage a 2 Plazas solo tenía 1 modelo ahí). Se agregó además un hint ("Toca una firmeza para ver el precio.") bajo el pill, para que se lea como filtro interactivo y no como ficha técnica fija. | A2 · [index-guia.html:2949](index-guia.html:2949) |
| ✅ 10 | ~~En 2 Plazas la firmeza no diferencia nada~~ — **parcialmente resuelto 24-09-2026**: con el catálogo completo ya cargado y verificado, las 4 tarjetas de 2 Plazas dejaron de mostrar los mismos 3 pills fijos `suave · intermedio · firme` — ahora cada una muestra solo los pills con modelos reales detrás (Esencial: suave+intermedio; Premium: los 3; Advantage: suave+intermedio; Excélsior: intermedio+firme), con precios de cama/box/colchón reales en vez de estimados por fórmula. Sigue abierta la sugerencia original de "resaltar la firmeza predominante en vez de las 3 variantes" — esa parte sí es una decisión de diseño que no se tomó por iniciativa propia. | C1 |
| ✅ 11 | ~~El estado sin parámetros de Líneas muestra 0 productos~~ — **resuelto 24-09-2026**: `tamano`, `linea` y `firmeza` ahora tienen default (`2-plazas` / `Línea Premium` / `intermedio`) cuando la URL no los trae, en vez de cortar antes de renderizar. Se eligió esa combinación por tener datos reales completos y ser el filtro #1 del sitio real. Las combinaciones explícitas sin datos reales siguen mostrando el mensaje "Todavía no hay modelos cargados" sin cambios. Afectaba a 937 sesiones (17%), de las cuales 462 eran usuarios nuevos. | [journey-propuesta.md](journey-propuesta.md) §4.1 · [index-lineas.html:3058](index-lineas.html:3058) |
| ✅ 12 | ~~Los cuatro botones "Ver línea …" hacen lo mismo~~ — **resuelto 24-09-2026**: cada botón ahora apunta a `index-lineas.html` con `tamano=2-plazas` + su propia `linea` + `firmeza=intermedio` + `tipo=cama-europea` (la combinación con datos reales garantizados en las 4 líneas), y hace scroll automático a los resultados vía `#modelosResultado`. Antes de este fix el botón bajaba a la tabla de medidas sin filtrar nada. | C2, A4 |
| ✅ 13 | ~~Los precios por línea no coinciden entre pantallas~~ — **resuelto 24-09-2026** (dentro del prototipo): los 4 banners "Desde $X" de `.lineas-banners` en Líneas se actualizaron a los mínimos reales de cama europea a 2 Plazas (Esencial $249.990, Premium $359.990, Advantage $799.990, Excélsior $1.679.989) — **actualizado 15-10-2026**: el "Desde" de cada banner ahora se calcula con el precio mínimo real de esa línea en el tamaño y tipo elegidos (con su nota al pie) y avisa cuando no hay modelos, y las 3 tarjetas de resultado del quiz (Tempo Plus, Autonomy Sky, Indie) se corrigieron con su precio, precio tachado y % de descuento reales de `modelosData`. La tarjeta de Guía en 2 Plazas ya había quedado sincronizada al resolver el #10. Sigue existiendo un tercer conjunto de precios en producción (rosen.cl) que no se controla desde este prototipo — eso queda fuera de alcance. | B4, C3 |
| ✅ 14 | ~~La nomenclatura de tamaños se contradice a sí misma~~ — **resuelto 24-09-2026**: el bloque "Elige por tamaño" de Líneas mostraba anchos corridos una posición (ej. "Queen" mostraba el ancho real de "2 Plazas", "King" el de "Queen", etc.), nunca sincronizado con `modelosData` ni con Guía (que ya estaba bien). Se corrigieron las 7 medidas contra la ficha real de rosen.cl: 1 Plaza 90×190/90×200, 1,5 Plazas 105×190/105×200, Full 135×200, 2 Plazas 150×190/150×200, Queen 160×200, King 180×200, Super King 200×200. | A3, B3, C5 — encontrado por los tres agentes por separado |
| ✅ 15 | ~~Dos puertas desde Guía producen páginas distintas~~ — **resuelto 13-10-2026**: el link "Ir a líneas camas y colchones" ahora toma el destino de una tarjeta del tamaño activo (Premium si existe, si no la primera), y tanto ese link como los botones "Ver modelos X" de las tarjetas terminan en `#modelosResultado`, igual que los banners. Al revisarlo aparecieron tres arreglos relacionados: **(1)** los banners de línea en Líneas conservan tamaño, firmeza, tipo y medida de la URL y solo cambian la línea (antes saltaban siempre a 2 Plazas); si la línea no existe para esa selección, el botón queda deshabilitado con aviso; **(2)** las tarjetas de Guía solo ofrecen combinaciones de firmeza y tipo que existen en el catálogo (79 de 90; las 11 inexistentes ya no se pueden elegir y se acabaron los precios calculados por fórmula); **(3)** el estado vacío de Líneas explica qué no existe y ofrece las alternativas reales más cercanas, en vez de culpar al prototipo. También se completó el box spring de King para Advantage y Excélsior (Bock, New Sollievo, Novus, Pearl, Orbix, Astrum). | [journey-propuesta.md](journey-propuesta.md) §4.2 |
| ✅ 16 | ~~El comparador está escondido~~ — **resuelto 23-09-2026**: el checkbox "Comparar" se movió a la esquina superior izquierda (la única libre) con fondo sólido, borde y checkbox más grande. Se agregó un hint ("Marca 'Comparar'...") visible *antes* de usarlo, en vez de que la única explicación viviera en la barra que solo aparece tras el primer clic. Aplicado en Guía y Líneas. | C |
| ✅ 17 | ~~El comparador duplica la ficha en vez de contrastar atributos~~ — **resuelto 13-10-2026**: el cajón expandido mantiene las cards pero ahora (1) una franja "Iguales en los N" agrupa los atributos que no varían (línea, tamaño, firmeza, barras), (2) cada card oculta esos atributos y muestra solo lo que cambia, y (3) una etiqueta ámbar "+$X vs. el más económico" marca la diferencia de precio. Se descartó una tabla comparativa. Aplicado en Guía y Líneas. Además, la PLP de Líneas suma "Ordenar por" (Relevancia, A-Z, Z-A, menor/mayor precio, mayor descuento, más vendidos) y etiquetas de diferencia de precio por card. *Más vendidos* usa reseñas sintéticas como proxy: no hay ventas reales en el prototipo. | C |
| ✅ 18 | ~~El "Omitir" del muro de datos no es un control accesible~~ — **vuelto irrelevante 23-09-2026**: al resolver el #19, el paso "lead" y su "Omitir" dejaron de existir — ya no hay nada que omitir. | B5 |
| ✅ 19 | ~~El muro de datos está en el peor momento~~ — **resuelto 23-09-2026**: se invirtió el orden (Resultado → dato opcional). El quiz ya no pasa por "lead" como paso obligatorio; el formulario quedó como tarjeta opcional "Guarda tu recomendación" dentro del resultado, con copy que ya no implica obligatoriedad. Esto vuelve irrelevante al #18 (el "Omitir" inaccesible), que se eliminó junto con el paso. | A, B |
| ✅ 20 | ~~Falta "Queen" en el paso de tamaño del quiz~~ — **resuelto 23-09-2026**: se agregó en la misma posición que usa el comparador de la página (entre Full y King). | B3 |
| ✅ 21 | ~~El quiz nunca pregunta cómo duerme el usuario~~ — **resuelto 23-09-2026**: se agregó un paso nuevo "¿Cómo duermes habitualmente?" (De lado / De espalda / Boca abajo / Sin una posición fija), entre Firmeza y Problema. El quiz pasó de 5 a 6 pasos; se mantuvo la pregunta de síntomas existente porque varias de sus opciones ya conectan con contenido real de la PDP (aislamiento de movimiento, Sistema Airflow). No se agregó peso, para no pedir un dato sensible sin necesidad clara. | B |
| ✅ 22 | ~~El paso de tamaño no ayuda a decidir~~ — **resuelto 23-09-2026**: se agregó referencia de personas a las 7 opciones y "No lo tengo claro". Las medidas en cm solo se agregaron a 1 Plaza / 2 Plazas / King, los únicos 3 con dato real en el comparador de esta misma página — los otros 4 (1,5 Plazas, Full, Queen, Super King) se dejaron sin cm a propósito, para no fabricar datos ni chocar con la contradicción aún abierta del #14. **Completado 13-10-2026**: resuelto el #14 y con la tabla real de medidas de rosen.cl, las 4 opciones restantes ya muestran sus cm (105 × 190/200, 135 × 200, 160 × 200 y 200 × 200), iguales a las de Guía y Líneas. | B |
| ✅ 23 | ~~El resultado del quiz no se explica ni se puede corregir~~ — **resuelto 23-09-2026**: se agregó una franja de chips con cada respuesta sobre el resultado; cada chip lleva de vuelta a esa pregunta para corregirla, y un link "Volver a empezar" reinicia el quiz. No se agregó un atajo para saltar directo al resultado sin responder — no tendría sentido. | B |
| ✅ 24 | ~~Al cambiar a King, Premium desaparece sin mensaje~~ — **resuelto 13-10-2026** (era un problema de datos, ver nota del 23-09-2026 abajo): King ahora tiene su tarjeta de Premium, construida con datos reales. El matiz que quedaba (en tamaños donde una línea no existe, Guía no avisaba) también está resuelto: bajo los botones de tamaño aparece una línea de aviso (ej. "En Queen solo tenemos Selección Excelsior…") con enlaces a los tamaños donde sí están las líneas faltantes. Se calcula leyendo las cards de cada grilla. | C |
| ✅ 25 | ~~"Compara por tamaño" promete modelos y entrega líneas~~ — **resuelto 23-09-2026**: título renombrado a "Compara nuestras líneas por tamaño", que nombra explícitamente qué se compara sin depender del subtítulo. Actualizado también en las 2 anotaciones (Navegación y Cognición C2) que citaban el nombre anterior. | C |
| ✅ 26 | ~~No hay filtro de línea dentro del listado~~ — **vuelto redundante 24-09-2026**: la sección `.lineas-banners` ya está arriba de esta misma página y ahora sí filtra de verdad (ver #12) — cambiar de línea es scrollear hacia arriba y hacer clic, no "volver a la portada y entrar de nuevo" como decía el hallazgo original. No se agregó un filtro adicional dentro del listado por sería duplicar el control que ya existe. | C |
| ✅ 27 | ~~El cajón de comparación expandido tapa el catálogo y se colapsa con un botón circular sin etiqueta~~ — **resuelto 23-09-2026**: se agregó un backdrop semitransparente que cierra el cajón al hacer clic, y el botón pasó a ser una pastilla con texto ("Ver comparación" / "Cerrar") con `aria-label` sincronizado al estado. Aplicado en Guía y Líneas (mismo componente duplicado). | C |
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
| ✅ 31 | ~~El catálogo tiene una sola combinación cargada~~ — **resuelto 13-10-2026**: `modelosData` ahora tiene 112 modelos reales en 18 combinaciones tamaño × línea (precio, imagen y firmeza) en los 7 tamaños y las 4 líneas, con cama europea, box spring y colchón donde existen en rosen.cl. El comparador ya puede juntar 2–3 fichas reales en casi cualquier combinación (se probó con 3 productos de Premium en 2 Plazas). Mató el escenario C en la ronda anterior; la próxima debería poder completarlo. |
| ✅ 32 | ~~El resultado del recomendador es HTML estático~~ — **resuelto 13-10-2026**: las 3 cards del resultado salen ahora del catálogo real (`data/modelos.js`, compartido con Líneas) con la misma estructura de card, construida por el mismo código que la PLP. Reglas: filtro duro por tamaño, tipo y firmeza ("Cama" incluye cama europea y box spring; si la combinación no existe se relaja primero la firmeza y luego el tipo, y se avisa); preferencia por modelos dentro del presupuesto (si no hay, los más cercanos, con aviso); desempate por cómo duerme y qué le molesta (criterio de la maqueta, no regla del negocio); 3 cards de líneas distintas cuando se puede. Probadas las 42 combinaciones tipo × firmeza × tamaño: todas devuelven resultado (10 con aviso por combinación inexistente) y el botón "Ver todos los modelos con mi selección" lleva a una PLP con modelos en las 42. Firmeza y adaptación del catálogo siguen siendo estimadas y las estrellas, sintéticas. "Ver producto" en las cards sigue como en Líneas (#30). Esto también resuelve la inconsistencia de "Autonomy Sky" (card fija que no existía en el catálogo). |
| ✅ 33 | ~~Las opciones del quiz no son accesibles por teclado~~ — **resuelto 13-10-2026**: eran `<p>` con un clic (el mismo problema que tenía el "Omitir", #18). Ahora cada paso es un grupo de radio ARIA: las opciones se alcanzan con Tab, se eligen con Enter/Espacio y se recorren con las flechas; solo la elegida (o la primera) entra en el orden de Tab, tienen anillo de foco visible y, al cambiar de paso, el foco pasa a la pregunta. El reinicio también limpia el estado. | Revisión del quiz 13-10-2026 |
| ✅ 34 | ~~El resultado del quiz no lleva a ninguna parte con las respuestas~~ — **resuelto 13-10-2026**: el resultado suma el botón "Ver todos los modelos con mi selección", que arma un enlace a Líneas con tipo, firmeza y tamaño respondidos (lo no respondido o "No lo tengo claro" usa los defaults de Líneas). Sin lógica de matching: la PLP filtra igual que desde Guía. Entra por Premium y, si Premium no tiene la combinación, por la primera línea que sí la tiene (leído de las cards de Guía); "Cama" prueba box spring cuando no hay cama europea (Queen). De las 42 combinaciones tipo × firmeza × tamaño, 33 llegan a una lista con modelos; las 9 restantes no existen en el catálogo real (1 Plaza y Full firmes, Queen sin colchón ni cama europea suave/firme) y caen en el aviso de Líneas con alternativas. "Guarda tu recomendación" pasó a una fila plegada ("¿Quieres guardar tu selección?" → "Enviármela por correo") que ahorra ~160 px de alto y promete ahora el enlace a la selección. Las 3 cards fijas siguen siendo estáticas (#30, #32). | Revisión del quiz 13-10-2026 |
| 🟡 35 | **Notas sobre el formulario del quiz, para producción:** (1) el consentimiento mezcla el uso de datos con "campañas publicitarias y automatizaciones de ROSEN y partners"; para enviar la selección solo hace falta el correo, así que conviene separar "enviarme mi selección" (necesario) de "recibir ofertas" (opcional); (2) "Enviar" confirma aunque los campos estén vacíos — en producción debe exigir al menos un correo válido; (3) "Siguiente" avanza sin respuesta en todos los pasos; (4) el paso "¿Qué buscas?" ofrece solo Cama o Colchón aunque el catálogo tiene box spring (hoy el enlace lo cubre dentro de "Cama"); (5) los rangos de presupuesto no dependen del tamaño y podrían dejar sin resultados cuando exista matching real. | Revisión del quiz 13-10-2026 |
| 🟡 36 | **Datos de base (completa/dividida) incompletos en el catálogo.** Revisadas las fichas de rosen.cl (15-10-2026): hoy **82 de las 93 camas europeas** muestran la fila "Base" (antes 13). Se cargaron bases fijas según la ficha técnica (o la descripción del producto, en Tempo Plus) y 5 camas con elección completa/dividida con su precio por opción (Pratta, Wave, Ergo-T New, New Style 2 Plus y New Style 4 Plus en 2 Plazas; el precio se leyó de la configuración propia de cada ficha con sus opciones por defecto, color Grafito, y calza con el catálogo). Al cerrar los "con elección" resultó que la mayoría eran falsos positivos: solo esas 5 ofrecen de verdad elegir base. **Faltan 11 que no declaran el tipo de base**: New Style 4 Plus en 1, 1,5, Full y King; New style 6 Plus en 1, 1,5, King y Super King; Joy en 1,5 y King; y New Sollievo Super King (sin ficha encontrada). No hay dato que cargar sin inventarlo. Observaciones: el producto que el catálogo llamaba "Autonomy" se vende como "Autonomy Sky" (corregido en el catálogo); y Swag 2 Plazas figura con base completa a $599.990, pero las fichas que encontré son New Swag con base dividida a $639.991 y New Swag To Go con base completa a $669.990, que no coinciden: queda sin tocar hasta confirmar cuál es el producto del catálogo. | Revisión de fichas 15-10-2026 |
| ✅ 37 | ~~Precios del catálogo que no coinciden con la ficha de rosen.cl~~ — **revisado y corregido 15-10-2026**: de los 6 sospechosos, 4 eran cambios de precio reales y se corrigieron en el catálogo (y en las cards de Guía que los usan): New Style 2 Plus 2 Plazas $299.990 → $289.990; Indie 1 Plaza $289.990 → $249.990; Indie 1,5 Plazas $299.990 → $269.990; Wave 1 Plaza (90 × 190) $169.990 → $179.990. Los otros 2 eran falsos positivos: Indie King ($439.990 o $479.990 según el color; el catálogo usa Grafito, $479.990) e Indie Super King ($499.990, igual al catálogo). | Revisión de fichas 15-10-2026 |

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
