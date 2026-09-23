# Journey propuesto — análisis del prototipo

Revisión de la navegación entre `index-guia.html`, `index-lineas.html` e `index-pdp.html`, contrastada contra los datos medidos del sitio actual.

Los datos de comportamiento citados aquí están documentados en [journey-actual.md](journey-actual.md) (sección 5). Todo lo verificado en el prototipo fue probado en el navegador el **10-09-2026**.

---

## 1. Cómo navega hoy el prototipo

| Salto | Mecanismo | Estado |
|---|---|---|
| Guía → Líneas | CTA "Compara por tamaño": `index-lineas.html?tamano=&linea=&firmeza=&tipo=&medida=` ([index-guia.html:2879](index-guia.html:2879)) | Arrastra 5 parámetros de contexto |
| Guía → Líneas | `<a href="index-lineas.html">Ir a líneas camas y colchones</a>` ([index-guia.html:2630](index-guia.html:2630)) | Link plano, **sin contexto** |
| Líneas → PDP | Grid `#modelosResultado` → "Ver producto" ([index-lineas.html:3164](index-lineas.html:3164)) | Solo si llegan `tamano`+`linea`. Y solo New Style 6 Colchón tiene link real; el resto es `href="#"` |
| Líneas → Guía | Breadcrumb | — |
| PDP → atrás | Breadcrumb + link "Comparar" → Líneas | — |

Adicional: el comparador persiste en `localStorage` (`rosenCompareItems`) y sobrevive la navegación entre Guía y Líneas.

---

## 2. Los tres estados de `index-lineas.html`

El grid de productos solo se renderiza si la URL trae `tamano` y `linea`; si no, el código hace `return` antes de dibujar nada ([index-lineas.html:3058](index-lineas.html:3058)).

Verificado en navegador:

| Cómo llega el usuario | Grid de productos |
|---|---|
| Sin parámetros (`index-lineas.html`) | `display:none` — **0 px, 0 productos** |
| Con parámetros que no calzan con el dataset | Mensaje "Todavía no hay modelos cargados para esta combinación en este prototipo" — 108 px |
| Con parámetros correctos | **1.457 px, 5 productos** con precio, firmeza y CTA |

En el estado sin parámetros la página queda así: 4 banners de línea (551 px) → "Ten en cuenta" (434 px) → tabla de medidas (277 px) → FAQ (462 px). **Ni un producto ni un precio.**

---

## 3. Lo que los datos validan de la propuesta

**Tratar Líneas como paso intermedio con contexto, no como landing autónoma.** El 83% del tráfico de Líneas (4.702 de 5.639 sesiones) llega navegando desde dentro del sitio. La gran mayoría *podría* llegar con parámetros — que es justamente la apuesta del `?tamano=&linea=`.

**El diagnóstico de fondo está bien leído.** Rebote de 6,54%, 56,3 s de interacción, scroll de 60–89% y conversión de 0,32%. La página no tiene un problema de atención sino de conversión de esa atención en decisión. El grid filtrado y el comparador atacan exactamente eso.

---

## 4. Lo que los datos ponen en riesgo

### 4.1 Las 937 sesiones que caen en la página mutilada

De las 5.639 sesiones, **937 tienen Líneas como página de destino**: es la primera página de su sesión, no vienen de Guía. Son 794 usuarios activos y **462 usuarios nuevos**.

En el prototipo, esas sesiones caen en el estado sin parámetros: 0 productos. Un usuario recurrente quizás sepa cómo llegar al catálogo; alguien que entra por primera vez a una página llamada "Líneas Camas y Colchones" espera ver camas y colchones.

> Es como una tienda donde los estantes solo aparecen si entraste por la puerta lateral.

### 4.2 Las dos puertas desde Guía producen páginas distintas

```
① CTA "Compara por tamaño"        → index-lineas.html?tamano=…&linea=…&firmeza=…&tipo=…&medida=…
② "Ir a líneas camas y colchones" → index-lineas.html                    (sin nada)
```

Mismo archivo, resultados opuestos: 1.457 px de producto vs 0 px. El usuario no puede saber qué puerta tomó — desde su punto de vista la página "a veces tiene productos". Y si llegó por la puerta ② y comparte esa URL, la guarda en favoritos o recarga, siempre verá la versión vacía.

### 4.3 El clic se va al header y el prototipo no lo disputa

Clarity registró **310 clics**, concentrados en el header y las columnas principales, mayormente en móvil. La lectura: buena parte del clic en esta página se va al menú superior — la gente usa Líneas como trampolín para volver a navegar, no para avanzar hacia un producto. Coherente con el resto: 56 s leyendo, scroll hasta 89%, 0,32% de conversión.

El prototipo mantiene el mismo header sin cambios; nada compite por ese clic. (El `.view-toggle` que aparece arriba es solo del wireframe para presentar el análisis, no iría a producción, pero en la demo ocupa ese espacio visual.)

### 4.4 Líneas sigue pudiendo ser final de sesión

En las grabaciones de Clarity, Líneas aparece **101 veces como página de salida** y **44 como página de entrada** (2,3×). Es un punto donde las sesiones mueren.

En el prototipo, si el usuario llegó sin parámetros el único camino hacia adelante son los 4 banners de línea, cuyo CTA es `href="#shopBySize"`: un ancla que hace scroll a una tabla estática de medidas. No filtra por línea, no muestra modelos, no lleva a ningún producto — y los 4 botones hacen exactamente lo mismo. Es el mismo callejón sin salida que el sitio actual.

---

## 5. El peso: no es el diseño, son los assets sin optimizar

### 5.1 El punto de partida

El sitio actual carga en **9–14 s** en Líneas (7,1–8,2 MB, ~485 solicitudes) y **6,8–11,4 s** en Guía (4,2–4,7 MB, ~418 solicitudes).

Peso del prototipo contando solo imágenes:

| Página | Imágenes | Peso actual (sin optimizar) |
|---|---|---|
| `index-guia.html` | 33 | 7,6 MB |
| `index-lineas.html` | 43 | 6,7 MB |
| `index-pdp.html` | 28 | 3,2 MB |

**Importante: ninguna imagen del prototipo está optimizada.** Estas cifras son de los archivos fuente tal como se subieron, así que no son el costo real del diseño — son el costo de no haber pasado los assets por un pipeline.

### 5.2 Cuánto de ese peso es recuperable (medido)

El problema dominante no es la cantidad de imágenes sino que **se sirven a un tamaño enormemente mayor al que se muestran**. Medido en el navegador (DPR 2):

| Imagen | Se muestra a | Se sirve a | Exceso |
|---|---|---|---|
| `14012528-1new.jpg` (miniatura almohada) | 40 px | 1200 px | 15× |
| `base.jpg`, `base-2.jpg`, `base-muebles.jpg` | 64 px | 1200 px | 9,4× |
| `protector-colchon.jpg`, `cojin.webp`, `sabanas.jpg` | 64 px | 1200 px | 9,4× |
| `14017393-3/4/5.jpg` (thumbs galería) | 70 px | 1000–1200 px | 7–9× |

En `index-lineas.html`, **12 de 15 imágenes cargadas (80%)** están sobredimensionadas más de 1,5×. Los 4 banners de línea se muestran a 143 px y se sirven a 700 px.

### 5.3 Prueba de optimización

Redimensioné las 22 imágenes principales de la PDP al doble de su tamaño de despliegue, exportando a **JPEG q72** (codec conservador — WebP daría ~25–30% menos todavía):

| | Antes | Después | Ahorro |
|---|---|---|---|
| **Total PDP** | 3.148 KB | **1.708 KB** | **−45%** |

Y el detalle muestra dónde está la plata:

| Archivo | Antes | Después | Ahorro |
|---|---|---|---|
| `14017393-4.jpg` | 192 KB | 4 KB | −97% |
| `14017393-5.jpg` | 180 KB | 4 KB | −97% |
| `cojin.webp` | 136 KB | 4 KB | −97% |
| `protector-colchon.jpg` | 180 KB | 4 KB | −97% |
| `base-2.jpg` | 128 KB | 4 KB | −96% |
| `sabanas.jpg` | 84 KB | 4 KB | −95% |
| `carrusel.png` | 192 KB | 80 KB | −58% |
| `valoraciones.jpg` | 300 KB | 212 KB | −29% |

Casi todo el ahorro viene de **una decena de miniaturas** que pasan de 48–192 KB a 4 KB cada una, solo por servirse al tamaño en que se ven.

> Nota metodológica: los archivos que ya eran WebP (`imagen-2`, `imagen-3`, `imagen-firmeza`, `fondo-porque-elegirla1`) **empeoraron** en esta prueba al convertirlos a JPEG, lo cual es esperable. Redimensionados manteniendo WebP también bajarían, así que el −45% medido es un piso, no un techo. Con WebP en todo, la PDP debería quedar en torno a **1,2 MB**.

### 5.4 Qué significa esto

El peso **no es un argumento en contra del diseño propuesto**. Es una tarea de assets pendiente. Con las imágenes servidas al tamaño correcto y en WebP, la PDP baja de 3,2 MB a ~1,2 MB (−60%) sin sacar una sola sección, y Guía y Líneas —que concentran aún más miniaturas de producto— deberían mejorar proporcionalmente más.

Lo que sí sigue en pie es la necesidad de fijar un techo explícito, porque hoy nada impide que la próxima sección vuelva a sumar 400 KB sin que nadie lo note.

---

## 6. Recomendaciones

### A. Definir el estado sin parámetros de Líneas

Hoy el estado por defecto es el peor estado posible. Dos caminos:

| Opción | A favor | En contra |
|---|---|---|
| Mostrar el catálogo completo por defecto | Cumple la expectativa ("vine a ver líneas, veo líneas") | Pesado: 34 modelos con imagen, y ya tenemos problema de carga |
| Pre-seleccionar el filtro más probable | Siempre hay producto en pantalla; el usuario solo cambia si no le sirve | Arbitrario para quien busca otro tamaño |

Si se va por la segunda, el dato respalda usar **"Camas: 2 Plazas"**: es el filtro #1 de los 23 del sidebar, con 1.558 clics.

> Lo importante no es cuál se elija, sino que **la página nunca tenga un estado con cero productos**.

### B. Unificar las dos puertas de entrada

Que el link plano "Ir a líneas camas y colchones" también arrastre parámetros — los mismos que se definan como default en A. Es un cambio de una línea y garantiza que todo el que llegue desde Guía vea lo mismo.

### C. Optimizar los assets y fijar un techo

Dos cosas distintas, en este orden:

**1. Optimizar lo que ya existe.** Es la tarea de mayor retorno del proyecto: −45% medido en la PDP solo redimensionando (y ~−60% pasando todo a WebP), sin tocar el diseño. Las reglas mínimas:
- Servir cada imagen a **2× su tamaño de despliegue**, no al tamaño del archivo original
- WebP en todo (ya hay varios; falta el resto)
- Las miniaturas de 40–70 px no necesitan más de 140 px de ancho

**2. Fijar un techo por página** una vez optimizado (ej. "la PDP no supera 1,5 MB"), y tratarlo como restricción de diseño, igual que un ancho máximo. Sin eso, la próxima sección vuelve a sumar 400 KB sin que nadie lo note.

Prioridad: la PDP, porque cada segundo de carga ahí se paga en ventas.

---

## 7. Pendiente

- Agregar el botón **Cognición** al `.view-toggle` de `index-lineas.html` (hoy no existe, ver [journey-actual.md](journey-actual.md)). Con los datos actuales ya se puede escribir **C2** con números reales (5.639 sesiones, 56,3 s, scroll 60–89%, 0,32% de conversión).
- Para **C3** falta la pregunta B2 de [journey-actual.md](journey-actual.md): cuántas sesiones hacen clic en "Ver más" — el único puente medible entre Líneas y el producto.
