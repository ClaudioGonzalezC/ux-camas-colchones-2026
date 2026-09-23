# Pruebas de usabilidad automatizadas — prototipo

Pruebas de navegación ejecutadas por un agente actuando como usuario real, sin conocimiento previo del prototipo ni acceso al código.

---

## Método

**Entorno**: `http://localhost:8743` (servidor local, mismo código que el commit desplegado).
**Viewport**: escritorio 1440 × 900.

**Reglas impuestas al agente**:
1. No leer HTML, CSS ni JavaScript. Solo lo que se ve en pantalla.
2. No editar la URL a mano ni agregar parámetros — solo navegar haciendo clic.
3. No usar el buscador ni el menú del header salvo como último recurso (y anotarlo).
4. Empezar siempre en `index-guia.html`.
5. Declarar callejón sin salida tras 3 intentos fallidos.
6. Máximo 25 clics.

**Protocolo por paso**: antes de cada clic el agente declara *Veo / Espero / Hago clic en*; después del clic, *Pasó / ¿Coincidió? / Nivel de duda (1-5)*.

**Validación posterior**: todos los hallazgos se contrastan contra el código antes de darlos por válidos. Los que no se sostienen quedan registrados como falsos positivos, no se descartan en silencio.

---

## Escenario A — Usuario que sabe lo que quiere (perfil P1)

> *"Necesitas un colchón de 2 plazas (150 x 200 cm), firmeza firme, y tu presupuesto ronda los $250.000. Llega hasta tener ese producto agregado al carro."*

Ejecutado el 10-09-2026.

### Resultado: NO completó la tarea

| Métrica | Valor |
|---|---|
| Objetivo cumplido | **NO** — nunca llegó a una ficha de producto ni al carro |
| Clics totales | 22 |
| Cambios de página | 2 |
| Veces que retrocedió | 5 (+1 vez que tuvo que reescribir la URL de inicio) |
| Estado final del carro | "Mi compra 0 · Subtotal $0" |

### Recorrido

1. Llega a Guía. El hero promete recomendación según firmeza, tamaño y presupuesto → clic en "Comenzar recomendación" (no pasa nada)
2. Repite el clic → recién ahí abre el cuestionario
3. Paso 1: **Colchón** → 4. Paso 2: **Firme** → 5. Paso 3: "Nada, necesito cambiar mi cama o colchón" → 6. Paso 4: **2 Plazas** → 7. Paso 5: **Menos de $500.000**
8. Muro de captura de datos (nombre, correo, teléfono) antes del resultado → usa el enlace "Omitir"
9. Resultado: 3 **camas** Premium de $419.990 a $489.990, dos de ellas firmeza *intermedio*
10. Baja al comparador "Compara por tamaño", encuentra "Línea Esencial · firme · Desde $249.990" → activa "Colchones" → "Ver modelos Esencial"
11. Cae en "Descubre nuestras líneas" y abajo lee: *"Modelos Línea Esencial — Todavía no hay modelos cargados para esta combinación en este prototipo"*
12. Prueba "Ver línea Premium" → el título sigue diciendo Esencial
13. El botón "atrás" lo deja rebotando entre anclas; reescribe la URL de inicio
14. Prueba la tarjeta "Colchones" del carrusel → no responde
15. Vuelve al comparador, activa "Colchones" en Premium → "Ver modelos Premium"
16. Carga 1 modelo: "Colchón Swag, 150×200cm, firmeza **suave**, $259.990" — el encabezado revela "firmeza suave", que nunca eligió
17. "Ver producto" (×2) → solo salta al tope de la misma página. **Fin del camino.**

### Hallazgos confirmados en código

**A1 · El callejón que mata la tarea**
"Ver producto" solo funciona para un producto. En [index-lineas.html:3141](index-lineas.html:3141) el enlace es `esNewStyle6Colchon ? 'index-pdp.html' : '#'` — **solo New Style 6 Colchón tiene ficha; el resto es `href="#"`**. Es una limitación conocida del prototipo, pero el efecto medido es que la tarea resulta imposible salvo que el usuario acierte exactamente ese producto.

**A2 · El filtro de firmeza arranca en "suave" sin avisar** ⭐
`selectPill(pills[0])` en [index-guia.html:2949](index-guia.html:2949), y `pills[0]` es la pastilla "suave" ([index-guia.html:2412](index-guia.html:2412)).

El usuario pidió *firme*, el comparador filtraba por *suave*, y como Esencial no tiene modelos suaves cargados apareció "Todavía no hay modelos cargados para esta combinación". **Durante todo el recorrido creyó que la línea de su presupuesto no tenía productos.**

Diagnóstico del agente, textual: las pastillas *"se leen como ficha técnica (Firmeza: suave · intermedio · firme), pero son un filtro con suave preseleccionado en silencio"*. Solo lo descubrió cuando la página de resultados escribió "firmeza suave" en el subtítulo.

Es el hallazgo más valioso de la prueba: **no es una limitación del prototipo, es un problema de diseño real**.

**A3 · Contradicción de tamaños entre páginas**
En Guía, "2 Plazas" = 150 × 200 cm. En Líneas, la tabla "Elige por tamaño" dice "2 Plazas = 1,40 × 1,90" y "Queen = 1,50 × 2,00". El agente lo detectó solo: *"ya no sé si respondí bien el cuestionario ni qué estoy comprando"*.

**A4 · "Ver modelos [Línea]" no lleva a los modelos**
Esperaba una grilla de colchones Esencial 150×200 firmes; quedó en la portada de 4 líneas, teniendo que elegir línea otra vez y perdiendo lo ya seleccionado.

### Falsos positivos descartados

| Reportado | Verificación |
|---|---|
| "La foto del Colchón Swag no es un colchón, se ven botellas/difusor" | **Falso.** `16017817-1.jpg` es una cama con colchón naranja y gris. Capturó una imagen a medio cargar. |
| "El contador miente: Paso 4 de 4 → Paso 5 de 5" | **Falso.** El marcado dice correctamente "Paso 1 de 5" … "Paso 5 de 5" ([index-guia.html:2037-2111](index-guia.html:2037)). Lectura errónea. |

> Ambos falsos positivos vienen del mismo origen: capturas tomadas antes de que la página terminara de dibujarse. En las pruebas siguientes se agregó una regla explícita de esperar 2 s y verificar dos veces antes de reportar.

### Hallazgos reportados sin verificar

- El tramo de presupuesto "Menos de $500.000" es demasiado ancho para distinguir una compra de $250.000 de una de $499.000
- El botón "atrás" del navegador no saca de la página (queda rebotando entre anclas)
- La tarjeta "Colchones" del carrusel superior no responde al clic

**Resueltos después, en el escenario B** (ver B1, B4, B7): el resultado del quiz, las incoherencias de precio y el muro de datos quedaron confirmados. El doble clic en "Comenzar recomendación" quedó **descartado como no confirmable**.

### Veredicto del agente

> *"La navegación no me llevó sola: me llevó por un camino largo y después me dejó tirado. El cuestionario, que es lo más visible y lo que la página vende como atajo, me cobró cinco preguntas y mis datos personales para devolverme tres camas caras cuando yo había pedido un colchón barato y firme. El punto más confuso fue el comparador: las firmezas parecen etiquetas de ficha técnica pero son un filtro con 'suave' activado sin avisar, y eso me hizo creer durante todo el recorrido que la línea de mi presupuesto simplemente no tenía productos."*

---

## Escenario B — Usuario sin claridad (perfil P2)

> *"Duermes de lado y te duele la espalda al despertar. No sabes nada de tamaños ni de líneas. Quieres que el sitio te ayude a elegir un colchón que te sirva, y llegar a verlo con su precio."*

Ejecutado el 10-09-2026.

### Resultado: PARCIAL

| Métrica | Valor |
|---|---|
| Objetivo cumplido | **PARCIAL** — vio un precio ($489.990) en la tarjeta de resultados, pero nunca pudo abrir una ficha de producto |
| Clics totales | 23 de 25 |
| Cambios de página | 1 real (todo el recomendador ocurre en la misma página) |
| Veces que retrocedió | 1 |

> ⚠️ **Limitación metodológica**: la prueba del escenario C, corriendo en paralelo, se quedó con el foco del panel del navegador, así que este agente **no pudo tomar capturas de pantalla** y trabajó solo con el texto de la página. Por lo tanto **no reporta ningún hallazgo visual** (imágenes, colores, alineación). El aislamiento por pestañas no funcionó como esperaba: en la próxima tanda hay que correr las pruebas de a una.

### Recorrido

1. Llega a Guía, ve "Encuentra la cama ideal para ti · Solo te tomará 2 minutos"
2. Clic "Comenzar recomendación" (sin efecto visible) → 3. Segundo clic → abre el wizard en la misma página
4. Paso 1: **Colchón** → 5. Paso 2: **"No lo tengo claro"** (no sabe de firmezas)
6. Paso 3: "Noto que al acostarme me hundo y siento molestias en mi espalda"
7. Paso 4: **2 Plazas** (duda 4: elige a ciegas, sin medidas en cm y sin opción "Queen")
8. Paso 5: **$500.000 – $1.000.000** → 9. Aparece el muro de datos → usa "Omitir"
10. Resultado: 3 tarjetas, todas **camas** Premium, con precio
11-13. "Ver producto" ×2 y clic en el nombre del producto → nada. **Duda 5**
14. "Ver modelos Premium" → llega a Líneas, que anuncia "firmeza **suave**" y muestra 1 modelo
15. "Ver producto" (Swag) → nada → 16. "Ver línea Premium" → solo salta a un ancla. **CALLEJÓN SIN SALIDA**

### Hallazgos confirmados en código

**B1 · El recomendador no recomienda: el resultado está escrito a mano** ⭐
Las tres tarjetas de resultado son **HTML estático** en [index-guia.html:2147](index-guia.html:2147) (`<div class="product-grid quiz-results-grid">` con las tarjetas fijas dentro). No hay lógica que lea las respuestas: **siempre devuelve los mismos tres productos**, se conteste lo que se conteste.

Esto resuelve el hallazgo que en el escenario A había quedado sin verificar, y con un matiz importante: no es que el recomendador "ignore" las respuestas por un bug, es que **no existe lógica de recomendación**. Como atajo de prototipo es legítimo; el problema es el efecto que produce, que los dos agentes describieron igual sin conocerse:

| Respondió | Recibió | ¿Coincide? |
|---|---|---|
| Tipo: **Colchón** | 3 **camas europeas** con base dividida | **NO** |
| Presupuesto: **$500.000–$1.000.000** | $489.990 / $449.990 / $419.990 | **NO** — los tres por debajo del rango |
| Firmeza: "No lo tengo claro" | firme / intermedio / intermedio | Aceptable |
| Tamaño: 2 Plazas | 150 × 200 cm | Formalmente sí (pero ver B3) |

*Matiz honesto del agente*: no pudo distinguir si el recomendador ignora la respuesta o si su clic en "Colchón" no se registró y el wizard avanzó con "Cama" por defecto. Con el código a la vista sabemos que es lo primero.

**B2 · "Ver producto" está muerto por las cuatro rutas**
Confirma A1 y lo amplía. En las tarjetas del recomendador son `<button>` sin destino; en Líneas es `<a href="#">`. El agente agotó las cuatro rutas visibles antes de rendirse.

**B3 · Falta "Queen" en el paso de tamaño del quiz**
El wizard ofrece 1 Plaza / 1,5 Plazas / 2 Plazas / Full / King / Super King ([index-guia.html:2091-2110](index-guia.html:2091)). El comparador de la misma página **sí** ofrece Queen. Y como la tabla de Líneas define Queen = 1,50 × 2,00, el usuario que elige "2 Plazas" recibe fichas de 150 × 200 cm — la medida que el propio sitio llama Queen.

**B4 · Los precios por línea son tres conjuntos de datos distintos**
- Comparador de Guía: valores tipo $189.990 … $1.699.990
- Banners de Líneas: números redondos $250.000 / $450.000 / $650.000 / $850.000
- Producción real: $259.990 / $499.990 / $849.990 / $1.999.990

Además, en el comparador de Guía **Advantage aparece más barata que Premium**, y en Líneas es al revés. Ya estaba anotado en `journey-actual.md` §10; ahora está confirmado también desde la experiencia de uso.

**B5 · El "Omitir" del muro de datos no es un control accesible**
Es `<span class="quiz-skip" data-action="skip">Omitir</span>` ([index-guia.html:2142](index-guia.html:2142)): un `<span>` sin `role`, sin `tabindex` y sin ser botón. No es alcanzable por teclado y los lectores de pantalla no lo anuncian como acción. Al lado, "Ver recomendación" sí es `<button>`.

El agente lo describió como *"un patrón oscuro suave"*: el titular dice "Un último paso **antes de continuar**", lo que se lee como obligatorio, y la única salida no parece un control.

**B6 · Se aplica "firmeza suave" sin haberla pedido** — confirma A2 desde otra ruta de entrada.

### Descartado por el propio agente

- **El doble clic en "Comenzar recomendación"**: al reintentar tras recargar, el botón se comportó como un *toggle* (abre/cierra), así que el agente no pudo confirmar que el primer clic falle. Lo marcó como **no confirmado** en vez de reportarlo. La regla anti-falso-positivo funcionó.

### Hallazgos de diseño sin equivalente en código

Cosas que no son bugs sino decisiones, y que el escenario B expone bien:

- **Nunca se pregunta cómo duerme el usuario.** El caso de uso era "duermo de lado y me duele la espalda". El paso 3 pregunta por síntomas, pero no hay pregunta de posición ni de peso, que es lo que determina la firmeza recomendada.
- **El paso de tamaño no ayuda a decidir**: sin medidas en cm junto a cada opción, sin "no lo sé", sin referencia de para cuántas personas.
- **El resultado no se explica ni se puede corregir**: no hay un "porque dijiste X te recomendamos Y", ni botón para editar respuestas o rehacer el quiz.
- **El muro de datos está en el peor momento posible**: después de invertir cinco pasos y antes de entregar nada de valor.

### Veredicto del agente

> *"El recomendador me llevó de la mano hasta el final, pero traicionó mi respuesta más importante: pedí un colchón y me ofreció camas, y me cobró un peaje de datos personales justo antes de enseñarme el resultado. El punto más confuso fue el paso de tamaño, donde tuve que adivinar sin medidas ni referencia y sin la opción Queen que el mismo sitio usa dos secciones más abajo; el más frustrante, descubrir que 'Ver producto' no funciona por ninguna ruta. Si esto estuviera en producción, yo habría abandonado en el muro de datos o, si lo hubiera pasado, al tercer clic muerto en 'Ver producto'."*

---

## Escenario C — Comparador sin estructura (perfil P4)

> *"Estás decidiendo entre dos o tres colchones de distinta línea para una cama de 2 plazas. Quieres compararlos entre sí antes de elegir: precio, firmeza y qué los diferencia."*

Ejecutado el 10-09-2026.

### Resultado: PARCIAL

| Métrica | Valor |
|---|---|
| Objetivo cumplido | **PARCIAL** — encontró un comparador funcional, pero nunca pudo poner dos colchones lado a lado |
| Clics totales | ~25 |
| Cambios de página | 4 (guía ↔ líneas) |
| Veces que retrocedió | 5 |

> ⚠️ **Limitación metodológica**: durante la primera mitad de la prueba ningún clic surtía efecto y las capturas salían en blanco, porque la pestaña quedaba en segundo plano por la prueba paralela. El agente lo detectó, verificó que era del entorno y **excluyó esa fase del informe**. Confirma que el aislamiento por pestañas no funciona: **las pruebas hay que correrlas de a una**.

### Recorrido

1. Llega a Guía, ve el quiz y más abajo "Compara por tamaño"
2. El comparador ya viene con **2 Plazas** preseleccionado y muestra las 4 líneas lado a lado — justo lo que buscaba, salvo que compara **líneas, no modelos**
3. Prueba "King": el listado pasa a 3 tarjetas, **Premium desaparece sin aviso**
4. Vuelve a 2 Plazas: Esencial $249.990 · Premium $599.990 · Advantage $579.990 · Excelsior $1.279.990
5. "Ver modelos Premium" → llega a Líneas, a otra portada de líneas
6. Encuentra "Modelos Línea Premium … firmeza suave": **un solo producto**, con una casilla pequeña "Comparar" sobre la foto
7. Marca "Comparar" → aparece la barra "Compara hasta tres productos". Funciona
8. "Expandir comparación" → se abre un cajón con **la misma ficha duplicada** más un panel de tips
9. Para sumar un segundo candidato, "Ver línea Advantage" → **solo hace scroll**; el listado sigue en Premium
10-11. Vuelve a la guía y entra por "Ver modelos Advantage" y "Ver modelos Esencial" → *"Todavía no hay modelos cargados para esta combinación"*. Se queda con un solo producto comparable

### Hallazgos confirmados en código

**C1 · En la vista de 2 Plazas, la firmeza no diferencia nada** ⭐
Las cuatro tarjetas de línea muestran **exactamente las mismas píldoras**: `suave · intermedio · firme`, y por A2 sabemos que en las cuatro arranca "suave" resaltada. Verificado: en las tarjetas de 150 × 200 cm los cuatro sets de `data-firmeza` son idénticos.

Como uno de los tres criterios del usuario era la firmeza, esa fila **no aporta nada para elegir**. Y 2 Plazas no es un caso cualquiera: es el filtro más usado del sitio (1.558 clics, #1 de 23). En tamaños chicos sí hay diferencia (1 Plaza solo ofrece suave/intermedio), pero justo en el caso más frecuente, no.

**C2 · Los cuatro botones "Ver línea …" hacen lo mismo**
Todos apuntan a `#shopBySize`: bajan a la tabla de medidas sin filtrar por línea. El agente lo describió como *"el punto donde me sentí engañado por la etiqueta"*. Ya estaba detectado en el análisis estático ([journey-propuesta.md](journey-propuesta.md) §4.4); ahora está confirmado desde el uso.

**C3 · Precios contradictorios con inversión de orden** — confirma B4
- Guía: Esencial $249.990 · Premium **$599.990** · Advantage **$579.990** · Excelsior $1.279.990
- Líneas: Esencial $250.000 · Premium **$450.000** · Advantage **$650.000** · Excelsior $850.000

No solo cambian las cifras: **en Guía Advantage es más barata que Premium y en Líneas es al revés**. Para alguien que está ordenando candidatos por precio, es descalificante.

**C4 · El panel de análisis tapa la cuarta tarjeta**
`.view-toggle` es `position: fixed; top: 50%; right: 20px; z-index: 2000`. A 1440 px se superpone a la tarjeta de más a la derecha: el agente vio "Selección Excels…" cortado y sus chips cubiertos. Es la capa de anotación del wireframe, no iría a producción, **pero hace ilegible la línea más cara justo en las demos**.

**C5 · Contradicción de tamaños** — confirma A3 y B3, encontrada de forma independiente por tercera vez.

### Hallazgos de diseño (sin equivalente en código)

- **"Compara por tamaño" promete modelos y entrega líneas.** El subtítulo lo aclara, pero el título genera otra expectativa.
- **Al cambiar a King, Premium desaparece en silencio.** De 4 tarjetas a 3 sin ningún mensaje: *"pensé que se había roto algo antes de deducir que Premium no existe en King"*.
- **El cajón de comparación duplica la ficha en vez de contrastar atributos.** Repite foto, línea, base, tamaño, firmeza, barras y precio — exactamente la misma tarjeta del listado. Aunque hubiera tres productos, habría que cruzarlos con la vista; nada señala *en qué se diferencian*.
- **El cajón expandido tapa el catálogo** y se colapsa con el mismo botón circular sin etiqueta.
- **No hay filtro de línea dentro del listado**: para cambiar de línea hay que volver a la portada y entrar de nuevo, una ida y vuelta por cada candidato.

### Descartado por el propio agente

- Un enlace "Ver modelos Esencial" que apuntaba a `1-plaza/90x190` mientras la tarjeta mostraba 2 Plazas. Tras recargar no volvió a ocurrir → probablemente leyó la página antes de que terminara de inicializarse. **No lo reporta como defecto.**
- Cuál píldora de "Tamaño" queda seleccionada por defecto al elegir tipo "Colchones". **No alcanzó a verificarlo.**

### Sobre la comparación (preguntas dirigidas)

**¿Encontró forma de comparar?** Dos. La sección "Compara por tamaño" de la portada estaba **bien señalizada** — la vio sin buscarla. El comparador real de productos (la casilla "Comparar" en la ficha) lo encontró **casi por casualidad**: *"un checkbox chico, gris, superpuesto sobre la esquina de la foto, compitiendo con el badge de descuento y las estrellas"*.

**¿Era evidente qué hacía?** No del todo. *"La palabra 'Comparar' se entiende, pero no anticipa nada: no dice contra qué, ni cuántos, ni dónde va a aparecer el resultado."* El texto explicativo ("Compara hasta tres productos") **aparece recién después de marcarla**. El feedback al marcar sí fue claro e inmediato.

**¿Le sirvió para decidir?** No. Con un solo producto no hay comparación posible, y el cajón repite la ficha en vez de contrastar. *"Firmeza no la pude comparar en ningún momento."*

### Veredicto del agente

> *"Pude comparar líneas, no colchones: la tabla de la portada me dio precio y tipo de las cuatro líneas de un vistazo, pero la firmeza —uno de mis tres criterios— aparece idéntica en las cuatro, así que ese eje lo perdí por completo. El comparador de productos existe, funciona y persiste entre páginas, pero está escondido en un checkbox sobre la foto y, cuando lo abrí, solo duplicó la ficha en vez de contrastar atributos. El punto más confuso fue descubrir que los cuatro botones 'Ver línea …' solo hacen scroll a la misma sección, sumado a que los precios cambian —y hasta se invierte el orden entre Premium y Advantage— según en qué página los leas."*

---

## Síntesis de los tres escenarios

### Ninguno completó su tarea

| Escenario | Perfil | Resultado | Dónde murió |
|---|---|---|---|
| A — sabe qué quiere | P1 | **NO** | "Ver producto" muerto |
| B — sin claridad | P2 | PARCIAL | "Ver producto" muerto (4 rutas) |
| C — comparar | P4 | PARCIAL | Catálogo con 1 solo modelo |

### Lo que los tres encontraron por separado

Tres agentes sin contacto entre sí reportaron los mismos tres problemas:

1. **"Ver producto" no lleva a ninguna parte** (A, B) — solo New Style 6 Colchón tiene ficha
2. **La contradicción de tamaños** 2 Plazas = 150×200 vs 2 Plazas = 1,40×1,90 / Queen = 1,50×2,00 (A, B, C)
3. **Precios distintos por línea según la página**, con inversión de orden entre Premium y Advantage (A, B, C)

Que tres recorridos distintos tropiecen con lo mismo indica que no son detalles: son los que hay que arreglar primero.

### Limitaciones del prototipo vs. problemas de diseño

Conviene separarlos, porque solo los segundos sobrevivirían a producción:

**Limitaciones del prototipo** (esperables, no son hallazgos de diseño)
- Solo un producto tiene ficha
- Catálogo con una sola combinación cargada
- El resultado del recomendador es HTML estático

**Problemas de diseño reales** (se replicarían tal cual)
- **A2/C1 · La firmeza arranca en "suave" sin avisar y no diferencia entre líneas** — causa que el usuario concluya "esta línea no tiene productos" cuando sí los tiene
- **C2 · Los cuatro "Ver línea …" hacen lo mismo** — etiqueta que no cumple lo que promete
- **B5 · El "Omitir" del muro de datos no es un control accesible** — `<span>` sin rol ni tabindex
- **A3/B3/C5 · La nomenclatura de tamaños se contradice a sí misma**
- **B4/C3 · Los precios por línea no coinciden entre pantallas**
- **C · El comparador está escondido en un checkbox sobre la foto y, al abrirlo, duplica la ficha en vez de contrastar atributos**

### Sobre el método

- La regla anti-falso-positivo funcionó: el escenario A produjo 2 falsos positivos sin ella; B y C, con la regla, **descartaron ellos mismos 3 hallazgos** antes de reportarlos.
- **El aislamiento por pestañas no funciona.** B se quedó sin capturas y C perdió la primera mitad de la prueba. Las siguientes tandas hay que correrlas **de a una**.
- Verificar cada hallazgo contra el código antes de darlo por válido resultó indispensable: de los ~30 reportados, 2 eran falsos y 1 (C1) necesitó matizarse.

---

## Pendientes de prueba

- Los tres escenarios en viewport móvil (375 × 812) — el 76% de los clics en Guía son móviles
- Escenario A entrando directo a `index-lineas.html`, para reproducir las 937 sesiones que aterrizan sin parámetros
- Una pasada final en GitHub Pages, para capturar el efecto de los tiempos de carga reales sobre la percepción
