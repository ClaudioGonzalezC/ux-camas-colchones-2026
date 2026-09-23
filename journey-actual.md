# Journey actual — Camas y Colchones (sitio en producción)

Levantamiento del flujo real en rosen.cl, hecho para contrastar contra el rediseño del wireframe.
Todo lo que está en "Estructura observada" fue verificado directamente en el sitio en producción el **10-09-2026**. Lo que es interpretación o hipótesis está marcado como tal.

---

## 1. El journey tiene 4 pasos, no 3

La hipótesis inicial era `Guía → Líneas → PDP`. El sitio real intercala una PLP filtrada:

```
Guía                          Líneas                         PLP                        PDP
/guia-camas-y-colchones  →  /lineas-camas-y-colchones  →  /camas-y-colchones.html  →  /colchon-new-style6-
-rosen                       -rosen                        ?modelo=New+Style+6         de-2-plazas-150-x-200cm.html
```

El paso extra importa: cuando el usuario hace clic en "Ver más" de un modelo en Líneas, **no llega al producto**, llega a una grilla con todas las variantes de ese modelo.

---

## 2. Estructura observada por página

### 2.1 Guía — `/guia-camas-y-colchones-rosen`

Orden real de la página:

1. Carrusel de categorías (Bases, Camarotes, Camas, Colchones, Camas Nido o Divanes, Camas Guarda Objetos, Camas con Muebles, Sofás Cama y Futones, Camas Adaptables Eléctricas)
2. CTA "Ver todo Camas y Colchones"
3. Sidebar de filtros por plazaje/tipo — los 23 filtros: Camas (1, 1.5, 2 Plazas, King, Super King), Colchones (1, 1.5, 2 Plazas, King, Super King, Cuna), Tipos de cama (Europeas y Box Spring, Nido y Divanes, Guarda Objetos, Sofás Cama y Futones, Adaptables Eléctricas, Camarotes, Marquesas, Bases), Camas con muebles (1, 1.5, 2 Plazas, King)
4. "Conoce nuestras Líneas Rosen y elige tu modelo favorito" — 4 banners de línea con rango de precio
5. "¡Te ayudamos!" — Guía de compra / Recomendador / Venta telefónica
6. "Nuestros productos cuentan con" — 4 atributos de marca
7. Colección J. Rosenberg
8. "Disfruta nuestras novedades" — 6 espacios (Nuevo Bock, Camas Technogel, Smartbeds, Joy, Auping, Reciclaje de colchones)
9. Blog Rosen
10. "Todo lo que necesitas para una mejor experiencia de compra" — 6 servicios
11. Texto SEO + FAQ

### 2.2 Líneas — `/lineas-camas-y-colchones-rosen`

Estructura en 3 pasos numerados:

1. **"Para empezar la elección de tu cama y colchón"** — contenido educativo sobre Firmeza (Suave / Intermedio / Firme) y Adaptación
2. **"Descubre nuestras líneas"** — 4 banners con rango de precio:
   | Línea | Rango (precio referencial) |
   |---|---|
   | Selección Excélsior | Sobre $1.999.990 (*cama king) |
   | Advantage | $849.990 – $1.999.990 (*cama 2 plazas) |
   | Premium | $499.990 – $849.990 (*cama 2 plazas) |
   | Esencial | $259.990 – $499.990 (*cama 2 plazas) |

   Debajo, un bloque expandido por cada línea con **todos sus modelos**:
   | Línea | N° modelos | Modelos |
   |---|---|---|
   | Selección Excélsior | 6 | Pearl, Orbix, Astrum, Pionero, J. Rosenberg Sucessor, J. Rosenberg Founder |
   | Advantage | 8 | Bock, Seaqual, Forward, New Cero, Âme, Somnus, Novus, New Sollievo |
   | Premium | 15 | New Style 6 Plus, **New Style 6**, Indie, Classique +, Tempo, Tempo Plus, Autonomy, Art 4, Neo Plus, Swag, Play, Upline, Driven, Joy, Nest |
   | Esencial | 5 | Wave, Ergo T, Pratta, New Style 2 Plus, New Style 4 Plus |
   | **Total** | **34** | |
3. **"¡Listo!"** — cierre + repetición del texto hero + utilidades de footer

Cada tarjeta de modelo muestra: nombre, escala de Firmeza (SUAVE / INTERMEDIO / FIRME), escala de Adaptación (– / +) y un CTA "Ver más". **No muestra precio individual ni tipo de producto disponible.**

Al final de cada bloque de línea hay un segundo CTA: "Ver todo [Línea] >".

### 2.3 PLP — `/camas-y-colchones.html?modelo=New+Style+6&incluye=Colchón`

Devuelve **16 SKUs del mismo modelo**, mezclando tipo de producto y tamaño:

| Tipo | Cantidad | Rango de precio oferta |
|---|---|---|
| Colchón | 8 | $159.990 – $289.990 |
| Cama Europea | 5 | $269.990 – $509.990 |
| Boxet | 3 | $379.990 – $459.990 |

Los títulos son casi idénticos entre sí ("Colchón New Style 6 de 2 Plazas 150 x 200 cm" vs "Colchón New Style 6 de 2 Plazas 150 x 190 cm"), y la diferenciación visual entre cards depende del texto y del precio. Las Camas Europeas además arrastran un badge "CUPÓN 10%: CAMAS10" que los colchones no tienen.

Filtros disponibles detrás de un botón "Filtrar" + "Ordenar por" (colapsados por defecto).

### 2.4 PDP — `/colchon-new-style6-de-2-plazas-150-x-200cm.html`

SKU 14017392. Elementos en orden:

- Precio $219.990 / $339.990 tachado — "Ahorra $120.000" — badge 35%
- Selector de cantidad + botón **COMPRAR**
- "Reciclaje de camas y colchones $29.990 · Más Información >"
- "12 cuotas sin interés de $18.333 · Calcula tus cuotas"
- **"Más opciones disponibles:"** — 8 variantes de tamaño (2 Plazas 150x200, 1 Plaza 90x190, 1 Plaza 90x200, 1,5 Plazas 105x190, 1,5 Plazas 105x200, 2 Plazas 150x190, King 180x200, S.King 200x200)
- "Selecciona tu ubicación para ver opciones de entrega"
- "Prueba este producto en tu tienda más cercana"
- Galería de imágenes
- Atributos: Floating System, Topper espuma firme, Revestida en tela Jacquard, One Side, Resortes, Fire retardant, Sanitized
- Ficha técnica
- **"Complementa con:"** — Cubrecolchón Aqua Repelent New, Plumón Pluma Natural, Sábana 180 Hilos, Set 2 Almohadas Viscoelástica
- **"Si te gustó el producto, estos te encantarán"** — carrusel de otros modelos (Bock, Somnus…)

> Nota: la PDP actual **no tiene configurador de base/boxet**. "Colchón", "Cama Europea" y "Boxet" del mismo modelo son SKUs y PDPs distintas. Consolidarlos en una sola PDP configurable es una de las apuestas del rediseño.

---

## 3. Puntos de fricción detectados

1. **Líneas no permite calibrar precio.** 34 modelos en una sola página, ninguno con precio individual — solo el rango de la línea. Para saber cuánto cuesta un modelo hay que salir de la página. Es consistente con el perfil P4 ya medido ("Comparador sin estructura": 16,1s/116,7s de interacción M/D, 87,3%/82,1% no elige línea, 29% ve más de una línea en la misma sesión).
2. **El clic en "Ver más" no resuelve la decisión, la reabre.** El usuario ya eligió modelo, pero cae en una grilla de 16 SKUs donde debe resolver tipo (colchón / cama europea / boxet) **y** tamaño, sin ayuda comparativa.
3. **Destinos inconsistentes desde la misma grilla de Líneas.** La mayoría de los "Ver más" apunta a `/camas-y-colchones.html?modelo=X`, pero:
   - Pionero → `/rosen/linea/seleccion-excelsior.html?modelo=Pionero&categoria[0]=Camas&categoria[1]=Colchones`
   - Successor → `/rosen/linea/seleccion-excelsior.html?modelo=Successor`
   - J. Rosenberg → `/rosen/coleccion-j-rosenberg.html?categoria=Camas&modelo=J.+Rosenberg`
4. **Premium está tercero pero concentra el catálogo.** El orden de los bloques es Excélsior (6) → Advantage (8) → Premium (15) → Esencial (5). La línea con más modelos y con el rango de precio más consultado queda después de 14 modelos más caros.
5. **Comparar tipo de producto obliga a volver atrás.** Para contrastar "Colchón New Style 6" vs "Cama Europea New Style 6" hay que volver a la PLP: son dos PDPs distintas sin puente entre ellas.

---

## 4. Datos que ya tenemos (fuente: capas de `index-guia.html`)

Extraídos del análisis previo de BigQuery/GA4/Clarity, ya transcritos en el wireframe:

- **Acceso a Guía**: menú "Camas y Colchones" es el #4 más clickeado del home (1.622 clics); el home es la página #1 que aporta tráfico a Guía (9.238 clics).
- **Guía → Líneas**: solo 4,08% mobile (1.227/30.091) y 2,46% desktop (778/31.661).
- **Recomendador**: 1.757 clics totales (1.076 móvil, 660 desktop, 21 tablet); lo ve 32,3%/30,1% (M/D), interactúa 11,07%/6,93% de los que llegan; solo 2,83% de las sesiones de Guía interactúa.
- **Comparación real**: 68,5% de las sesiones compara saltando de PDP en PDP.
- **PDP → Guía**: 798 sesiones de retorno desde 15 PDPs distintas (perfil P3, validador de categoría).
- **Filtro más usado**: "Camas: 2 Plazas", 1.558 clics totales, el más usado de los 23 del sidebar.
- **Venta telefónica**: 58 clics totales (53 móvil, 5 desktop) vs 1.150 de Guía de compra.
- **Clics top**: buscador #1 desktop (3,67%); carrusel de categorías 13,49% en mobile; CTA "Ver todo" #6 mobile (2.243) / #3 desktop (1.206).

---

## 5. Datos medidos — Líneas (BigQuery `metricas-90-dias.ux_analisis`)

Página `/lineas-camas-y-colchones-rosen`, categoría "Líneas". Recibido el 10-09-2026.

### 5.1 Tráfico y comportamiento — `ga4_paginas_pantallas`

| Métrica | Valor |
|---|---|
| Sesiones | 5.639 |
| Sesiones con interacción | 5.270 |
| Vistas | 8.406 |
| Usuarios activos | 4.899 |
| Tiempo de interacción medio | 56,3 s |
| Duración media de sesión | 123,9 s |
| Tasa de rebote | 6,54% |
| Eventos totales | 177.001 |

### 5.2 Conversión — `ga4_pagina_destino` (como landing)

| Métrica | Valor |
|---|---|
| Sesiones como página de destino | 937 |
| Usuarios activos | 794 (462 nuevos) |
| Eventos clave (conversiones) | 3 |
| Tasa de evento clave | 0,32% |
| Ingresos atribuibles | ≈ $1.130.911 CLP |

### 5.3 Origen del tráfico — `ga4_referrer_guia_destino`

5 filas, **todas** desde `rosen.cl/guia-camas-y-colchones-rosen`, vía campaña pagada de Google (`utm_medium=cpc`, campaña "AON | Brand | Categorías | Search").

### 5.4 Comportamiento UX — Microsoft Clarity

- **Clics**: 310 filas, mayormente móvil, concentrados en el **header** y en las columnas principales de contenido
- **Atención** (`clarity_attention`): 11–30 s promedio por sección, hasta 9,3% de la duración de sesión
- **Scroll** (`clarity_scroll`): profundidad de 60%–89% según tramo, base de 111–396 visitantes por tramo
- **Grabaciones** (`clarity_grabaciones`): 44 como página de entrada, **101 como página de salida**
- **Resúmenes IA**: sin coincidencias para esta URL

### 5.5 Rendimiento — `gtmetrix_historial_paginas` (4 mediciones, 11–12 jul 2026)

- Onload: **9,0 – 13,7 s**
- Peso total: 7,1 – 8,2 MB · Solicitudes: 480–489 · TTFB: 351–789 ms
- Sin grade de PageSpeed/YSlow (nulos en las 4 mediciones)

### 5.6 Lecturas

1. **~83% del tráfico de Líneas es navegación interna.** 5.639 sesiones totales vs 937 como landing: 4.702 sesiones llegan desde otra página del sitio (principalmente Guía). Solo ~17% entra directo.
2. **Leen mucho, deciden poco.** Rebote de 6,54% + 56,3 s de interacción (45% de la duración de sesión) + scroll de 60–89%, contra una tasa de evento clave de 0,32% (3 conversiones). Es la confirmación cuantitativa del perfil P4 "Comparador sin estructura": la página retiene atención pero no la convierte en decisión.
3. **Líneas cierra sesiones más de lo que las abre.** 101 grabaciones como página de salida vs 44 como entrada (2,3×).
4. **El clic se va al header, no al contenido.** Los 310 clics de Clarity se concentran en la navegación superior — la página no está capturando el avance hacia el producto.
5. **El tráfico es comprado y de marca.** Todo el referrer registrado viene de campaña CPC de marca vía Guía: quien llega ya conoce Rosen y está en modo consideración, no descubrimiento.
6. **9–14 s de carga es una restricción de diseño, no un detalle técnico.** Con 7–8 MB y ~485 solicitudes, cualquier propuesta que agregue peso empeora el problema.

---

## 6. Datos medidos — Guía (BigQuery `metricas-90-dias.ux_analisis`)

Página `/guia-camas-y-colchones-rosen`, categoría "Guías". Recibido el 10-09-2026.

### 6.1 Tráfico y comportamiento — `ga4_paginas_pantallas`

| Métrica | Valor |
|---|---|
| Sesiones | 62.121 |
| Sesiones con interacción | 60.359 |
| Vistas | 85.012 |
| Usuarios activos | 52.799 |
| Tiempo de interacción medio | 19,6 s |
| Duración media de sesión | 49,7 s |
| Tasa de rebote | 2,84% |
| Eventos totales | 1.285.225 |
| Tasa de evento clave | 0% |

### 6.2 Conversión — `ga4_pagina_destino` (como landing)

| Métrica | Valor |
|---|---|
| Sesiones como página de destino | 12.524 |
| Usuarios activos | 11.028 (6.587 nuevos) |
| Eventos clave | 242 |
| Tasa de evento clave | 1,87% |
| Ingresos atribuibles | ≈ $1.090.390 CLP |

### 6.3 Relación con otras páginas — `ga4_referrer_*`

- **69 PDPs distintas** envían tráfico hacia la Guía, entre 20 y 28 eventos cada una. Ejemplos: `cama-europea-pratta-2-plazas-almohadas-light.html`, `colchon-driven-2-plazas-150-x-200-cm.html`, `divan-cama-classique-1-5-plazas-105-x…`
- También recibe tráfico desde sí misma y desde `/lineas-camas-y-colchones-rosen` vía campaña paga de Google (`utm_campaign=AON|Brand|Categorías|Search`) → **cruce bidireccional con Líneas confirmado**.

### 6.4 Comportamiento UX — Microsoft Clarity

- **Clics**: 901 filas → 20.921 en móvil, 6.400 en PC, 264 en tablet (**≈ 27.585 clics totales**, 76% móvil)
- **Grabaciones**: 629 como página de entrada, 621 como salida
- Sesiones que entran por Guía: 351 en móvil (**3,5 páginas vistas** en promedio) y 248 en PC (**4,7 páginas**)
- **Atención** y **scroll**: 60 filas cada una (misma granularidad que Líneas)
- **Resúmenes IA**: sin coincidencias

### 6.5 Rendimiento — `gtmetrix_historial_paginas` (3 mediciones)

| Fecha | Onload | Peso | Solicitudes | TTFB |
|---|---|---|---|---|
| 18 jun 2026 | 8,87 s | 4,73 MB | 424 | 268 ms |
| 10 jul 2026 | 6,77 s | 4,23 MB | 414 | 306 ms |
| 11 jul 2026 | **11,4 s** | 4,20 MB | 416 | **732 ms** |

### 6.6 Lecturas

1. **Guía es el hub del sitio.** 62.121 sesiones: 11× el volumen de Líneas. Rebote de 2,84%, el más bajo de las dos páginas.
2. **Convierte 6× mejor que Líneas como landing.** 1,87% de tasa de evento clave (242 eventos / 12.524 sesiones) vs 0,32% de Líneas (3 / 937).
3. **El retorno PDP → Guía es mayor de lo documentado.** Las capas del wireframe hablan de "798 sesiones desde 15 PDPs distintas"; esta consulta muestra **69 PDPs distintas** enviando tráfico. Hay que reconciliar ambas cifras (¿distinto rango de fechas? ¿distinta métrica?), pero el perfil P3 "Validador de categoría" es más grande de lo que creíamos.
4. **Es una página de paso, no de permanencia.** 19,6 s de interacción sobre 49,7 s de sesión, contra los 56,3 s de Líneas. La gente pasa rápido por Guía y se detiene en Líneas — coherente con que una orienta y la otra hace comparar.
5. **Entradas ≈ salidas (629 / 621).** Guía se comporta como un hub sano, a diferencia de Líneas, que registra 2,3× más salidas que entradas.
6. **Desktop navega más profundo.** 4,7 páginas por sesión en PC vs 3,5 en móvil, aunque el 76% de los clics son móviles.
7. **Mejor rendimiento que Líneas, pero igual lento.** 4,2–4,7 MB y ~418 solicitudes, contra 7–8 MB y ~485 de Líneas. El onload igual llega a 11,4 s en la última medición, con el TTFB disparado a 732 ms (vs 268–306 ms antes) — vigilar.

### 6.7 Guía vs Líneas — comparación directa

> Versión completa de las tres páginas en **7.7**.

| Métrica | Guía | Líneas |
|---|---|---|
| Sesiones | 62.121 | 5.639 |
| Usuarios activos | 52.799 | 4.899 |
| Tiempo de interacción medio | 19,6 s | 56,3 s |
| Duración media de sesión | 49,7 s | 123,9 s |
| Tasa de rebote | 2,84% | 6,54% |
| Sesiones como landing | 12.524 (20%) | 937 (17%) |
| Eventos clave | 242 | 3 |
| Tasa de evento clave (landing) | 1,87% | 0,32% |
| Ingresos atribuibles | ≈ $1.090.390 | ≈ $1.130.911 |
| Clics (Clarity) | ≈ 27.585 | 310 |
| Grabaciones entrada / salida | 629 / 621 (1,01) | 44 / 101 (0,44) |
| Peso | 4,2–4,7 MB | 7,1–8,2 MB |
| Onload | 6,8–11,4 s | 9,0–13,7 s |

> ⚠️ **Ojo con los ingresos.** Guía genera ≈$1.090.390 con 242 eventos clave (≈$4.506 por evento) y Líneas ≈$1.130.911 con solo 3 (≈$376.970 por evento). Ninguna de las dos cifras calza con el ticket de un colchón, así que antes de sacar conclusiones hay que confirmar **qué eventos cuentan como "evento clave"** y cómo se atribuye el ingreso.

---

## 7. Datos medidos — PDP (BigQuery `metricas-90-dias.ux_analisis`)

Página `/cama-autonomy-sky-base-grafito-2-plazas.html`. Recibido el 10-09-2026.

> ⚠️ **Ojo**: "Autonomy" no es una categoría sino el nombre de un modelo. Esta es la ficha de una **cama** (base grafito, 2 plazas, línea Autonomy Sky), mientras que el prototipo `index-pdp.html` modela un **colchón** (New Style 6). Son comparables pero no idénticas: la cama tiene más configuración (base, color) y ticket más alto.

### 7.1 Tráfico y comportamiento — `ga4_paginas_pantallas`

| Métrica | Valor |
|---|---|
| Sesiones | 8.478 |
| Sesiones con interacción | 7.331 |
| Vistas | 10.208 |
| Usuarios activos | 6.362 |
| Tiempo de interacción medio | 59,0 s |
| Duración media de sesión | 121,8 s |
| Tasa de rebote | 13,53% |
| Eventos totales | 56.226 |
| Tasa de evento clave | 0% |

### 7.2 Conversión — `ga4_pagina_destino` (como landing)

| Métrica | Valor |
|---|---|
| Sesiones como página de destino | 2.153 |
| Usuarios activos | 1.632 (983 nuevos) |
| Eventos clave | 21 |
| Tasa de evento clave | 0,98% |
| Ingresos atribuibles | **≈ $8.875.456 CLP** |

### 7.3 Origen del tráfico — `ga4_referrer_pdp_destino` (6 filas)

| Origen | Eventos |
|---|---|
| Recirculación dentro de la misma página | 301 |
| `cama-autonomy-sky-base-grafito-king.html` (variante King) | 158 |
| `cama-autonomy-sky-base-grafito-1-5-plazas.html` (variante 1,5 plazas) | 114 |

Confirma que las variantes de tamaño del mismo modelo se referencian entre sí: el usuario salta de una PDP a otra para cambiar de medida.

### 7.4 Comportamiento UX — Microsoft Clarity

- **Clics**: 557 filas → 2.324 móvil, 1.954 PC, 182 tablet (**≈ 4.460 totales**)
- Reparto móvil/PC: **52% / 44%**, contra 76% / 23% en Guía → se configura y compara desde escritorio
- **Grabaciones**: 608 como entrada, **837 como salida** — la cifra de salida más alta de las tres páginas
- **Atención** y **scroll**: 60 filas cada una

### 7.5 Rendimiento — `gtmetrix_historial_paginas` (4 mediciones, 11–12 jul 2026)

- Onload: **14,0 – 16,4 s** (la más lenta de las tres)
- Peso: **7,7 – 8,7 MB** · Solicitudes: **550–567**
- TTFB: 303 ms – **2.700 ms** (pico preocupante en una medición)

### 7.6 Lecturas

1. **Aquí sí ocurre la venta.** ≈$8.875.456 atribuibles, 8× lo de Guía o Líneas. Con 21 eventos clave son ≈$422.641 por evento — cifra que **sí calza con el precio de una cama 2 plazas**.
2. **Esto resuelve el enigma de los ingresos.** Si en la PDP un evento clave ≈ una compra, entonces los 242 eventos clave de Guía a ≈$4.506 cada uno **no son compras**: son otro tipo de evento clave. Hay que confirmar la definición antes de comparar tasas entre páginas.
3. **La recirculación entre variantes es real y medible.** 158 eventos desde la variante King y 114 desde la de 1,5 plazas. Es el patrón "PDP→PDP" (68,5%) visto en vivo: el usuario cambia de tamaño saltando de ficha en ficha. **Valida directamente la apuesta del prototipo** de resolver tamaño y base dentro de la misma PDP en lugar de repartirlos en SKUs separados.
4. **Se evalúa igual de lento que se compara.** 59,0 s de interacción en la PDP vs 56,3 s en Líneas: la gente dedica prácticamente el mismo tiempo a comparar líneas que a evaluar un producto concreto.
5. **Rebote más alto de las tres** (13,53% vs 6,54% de Líneas y 2,84% de Guía), coherente con recibir tráfico directo de campaña y orgánico.
6. **Es el mayor punto de fuga en volumen absoluto**: 837 salidas. Proporcionalmente Líneas está peor (2,3× salidas/entradas vs 1,38× acá), pero en cantidad de sesiones perdidas la PDP es la que más pesa.
7. **Es la página más pesada y lenta, y es donde se compra.** 14–16,4 s de carga con 7,7–8,7 MB y hasta 567 solicitudes. Cada segundo ahí se paga en ventas.

### 7.7 Las tres páginas comparadas

| Métrica | Guía | Líneas | PDP (Autonomy Sky 2pl) |
|---|---|---|---|
| Sesiones | 62.121 | 5.639 | 8.478 |
| Usuarios activos | 52.799 | 4.899 | 6.362 |
| Tiempo de interacción medio | 19,6 s | 56,3 s | 59,0 s |
| Duración media de sesión | 49,7 s | 123,9 s | 121,8 s |
| Tasa de rebote | 2,84% | 6,54% | 13,53% |
| Sesiones como landing | 12.524 (20%) | 937 (17%) | 2.153 (25%) |
| Eventos clave | 242 | 3 | 21 |
| Tasa de evento clave (landing) | 1,87% | 0,32% | 0,98% |
| Ingresos atribuibles | ≈ $1.090.390 | ≈ $1.130.911 | **≈ $8.875.456** |
| Ingreso por evento clave | ≈ $4.506 | ≈ $376.970 | ≈ $422.641 |
| Clics (Clarity) | ≈ 27.585 | 310 | ≈ 4.460 |
| Reparto móvil / PC | 76% / 23% | mayormente móvil | 52% / 44% |
| Grabaciones entrada / salida | 629 / 621 (1,01) | 44 / 101 (**2,30**) | 608 / 837 (1,38) |
| Peso | 4,2–4,7 MB | 7,1–8,2 MB | **7,7–8,7 MB** |
| Solicitudes | ~418 | ~485 | **550–567** |
| Onload | 6,8–11,4 s | 9,0–13,7 s | **14,0–16,4 s** |
| TTFB | 268–732 ms | 351–789 ms | 303–**2.700 ms** |

Patrón claro: **a medida que el usuario avanza en el embudo, la página se vuelve más pesada y más lenta**, justo donde el costo de perderlo es mayor.

---

## 8. Conclusiones del trío Guía + Líneas + PDP

Cuatro hallazgos que solo aparecen al cruzar los tres datasets.

### 8.1 "Evento clave" no significa lo mismo en cada página

| Página | Eventos clave | Ingresos | Por evento |
|---|---|---|---|
| PDP | 21 | ≈ $8.875.456 | **≈ $422.641** |
| Líneas | 3 | ≈ $1.130.911 | ≈ $376.970 |
| Guía | 242 | ≈ $1.090.390 | **≈ $4.506** |

En la PDP el ingreso por evento calza con el precio real de una cama 2 plazas, así que ahí un evento clave ≈ una compra. Pero entonces los 242 eventos de Guía a $4.506 cada uno **no pueden ser compras** — son otro tipo de evento clave.

> **Consecuencia práctica**: no se pueden comparar las tasas de evento clave entre páginas (1,87% Guía vs 0,32% Líneas vs 0,98% PDP) hasta confirmar la definición de cada una. Cualquier conclusión construida sobre esa comparación queda en suspenso.

### 8.2 La recirculación entre variantes está medida y valida el rediseño

`ga4_referrer_pdp_destino` muestra tráfico entrante desde las otras medidas del mismo modelo:

- 158 eventos desde `cama-autonomy-sky-base-grafito-king.html`
- 114 eventos desde `cama-autonomy-sky-base-grafito-1-5-plazas.html`
- 301 eventos de recirculación dentro de la misma página

Es el patrón "PDP→PDP" (68,5% de las sesiones) con el mecanismo a la vista: **el usuario cambia de tamaño saltando de ficha en ficha, porque cada medida es una PDP distinta**.

Esto respalda directamente dos decisiones del prototipo: resolver el tamaño dentro de la misma PDP, y consolidar colchón / cama europea / boxet en un configurador en vez de SKUs separados.

### 8.3 Mientras más cerca de la compra, más lenta la página

| | Guía | Líneas | PDP |
|---|---|---|---|
| Peso | 4,2–4,7 MB | 7,1–8,2 MB | **7,7–8,7 MB** |
| Solicitudes | ~418 | ~485 | **550–567** |
| Onload | 6,8–11,4 s | 9,0–13,7 s | **14,0–16,4 s** |
| TTFB máx | 732 ms | 789 ms | **2.700 ms** |

El embudo empeora técnicamente a medida que avanza. La PDP tarda hasta 16 segundos en cargar y es la única de las tres donde efectivamente entra dinero.

### 8.4 Se descubre en móvil, se decide en escritorio

| Página | Móvil | PC |
|---|---|---|
| Guía | 76% | 23% |
| Líneas | mayormente móvil | — |
| PDP | 52% | **44%** |

El peso del escritorio casi se duplica al llegar a la ficha de producto. Sumado a que las sesiones desde PC ven 4,7 páginas contra 3,5 en móvil, el patrón es: descubrimiento y navegación en móvil, configuración y decisión en escritorio.

> **Consecuencia práctica**: el esfuerzo de diseño de la PDP (selector de medidas, configurador de base, comparación) tiene proporcionalmente más audiencia en desktop que el resto del journey — al revés de lo que sugeriría mirar solo el tráfico de Guía.

---

## 9. Preguntas pendientes para BigQuery

Todas formuladas sobre el sitio **actual** (lo único que BigQuery puede medir).

### A. Validar el funnel

1. ~~Del total de sesiones en `/lineas-camas-y-colchones-rosen`, ¿cuántas vienen de Guía y cuántas entran directo?~~ **✅ Respondida (ver 5.1–5.3)**: 5.639 sesiones totales, 937 como landing (~17%); el resto es navegación interna, y el referrer registrado es 100% Guía vía CPC de marca. *Falta el desglose de las 4.702 restantes por página de origen — hoy solo sabemos que Guía aparece como referrer, no qué proporción del total representa.*
2. ¿Qué % de las sesiones en Líneas continúa a una PLP con `?modelo=` en la URL? (= clic en "Ver más", único puente medible)
3. ¿Qué % de las sesiones que llegan a una PLP `?modelo=X` termina en una PDP de ese mismo modelo? Y las que no, ¿a dónde van?
4. Tasa de conversión comparada: sesiones que pasaron por Líneas vs. sesiones que llegaron a PDP sin pasar por Líneas.

### B. Comportamiento dentro de Líneas

5. Ranking de clics en "Ver más" por modelo — ¿se reparten entre los 34 o se concentran en pocos?
6. Clics en los 4 banners de línea (paso 2) vs. clics en "Ver todo Línea X >" al cierre de cada bloque.
7. Profundidad de scroll: ¿qué % llega al bloque de Premium (3º, con 15 de los 34 modelos)?
8. ¿Cuántas sesiones hacen clic en "Ver más" de más de un modelo, y de cuántas líneas distintas?

### C. El salto a la PLP

9. En las PLP `?modelo=X`: ¿qué % usa "Filtrar" u "Ordenar por" antes de hacer clic en un producto?
10. ¿Qué tipo se clickea más desde esa PLP: Colchón, Cama Europea o Boxet?
11. ¿Cuántas sesiones vuelven de la PDP a la PLP del mismo modelo? (señal de "me equivoqué de tamaño/tipo")

### D. PDP

12. Del 68,5% que compara PDP→PDP: ¿los saltos son entre modelos de la misma línea o de líneas distintas?
13. ¿Se usa el selector "Más opciones disponibles" (8 tamaños)? ¿Con qué frecuencia lleva a cambiar de PDP?
14. Add-to-cart rate y clics en "Complementa con" / "Si te gustó el producto, estos te encantarán" — línea base para comparar contra el rediseño.

Las respuestas de **A** y **B** son las que desbloquean la capa Cognición de `index-lineas.html` (hoy ni siquiera existe el botón en su `.view-toggle`).

---

## 10. Observaciones sueltas para verificar

- El precio del Colchón New Style 6 de 2 Plazas 150x200 en producción hoy es **$219.990 / $339.990 (35%)**, mientras que el wireframe usa **$249.990 / $339.990 (26%)**. Revisar cuál corresponde al escenario que queremos mostrar.
- Los rangos de precio por línea del wireframe (Esencial $250.000, Premium $450.000, Advantage $650.000, Excelsior $850.000) tampoco coinciden con los de producción (Esencial $259.990–$499.990, Premium $499.990–$849.990, Advantage $849.990–$1.999.990, Excélsior sobre $1.999.990).
- En Guía el nombre es "Selección Excelsior"; en Líneas aparece como "Línea Excélsior" y "Selección Excélsior" (con tilde) en la misma página.
