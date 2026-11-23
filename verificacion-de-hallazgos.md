# Verificación de hallazgos — ¿el prototipo soluciona lo que se encontró en el sitio real?

Ejecutada el 16-10-2026 sobre el prototipo servido en local. Responde a una pregunta concreta: **de todo lo que el análisis del sitio real y las pruebas de usabilidad dijeron que había que resolver, ¿qué resuelve hoy el prototipo, qué solo parece resolver y qué sigue abierto?**

Fuentes revisadas: [journey-actual.md](journey-actual.md) (§3, §8, §10), [pruebas-usabilidad.md](pruebas-usabilidad.md) (escenarios A/B/C y pendientes), [hallazgos-y-mejoras.md](hallazgos-y-mejoras.md) (#1–#8 del sitio real).

## Cómo se probó (y qué no demuestra)

- Los tres escenarios de la prueba de usabilidad original se repitieron como **recorridos solo con clics**, contando cada clic, en escritorio (1440 × 900) y móvil (390 × 844). Los hallazgos A1–C5 se comprobaron además con aserciones sobre la página.
- Se recorrieron las **54 combinaciones** línea × tamaño × tipo del catálogo y se abrió una ficha por cada combinación con datos.
- Se comparó el catálogo con los **401 productos del listado público de rosen.cl** (rastreo del 16-10-2026).
- Es automatización sobre una maqueta, no personas. No mide conversión, abandono ni rendimiento real. Para eso está [plan-medicion.md](plan-medicion.md).

## 1. Resultado de los tres escenarios

| Escenario | Antes (prueba original) | Ahora, escritorio | Ahora, móvil |
|---|---|---|---|
| **A** · Sabe lo que quiere: 2 Plazas, 150 × 200, firme, ~$250.000 → carro | ❌ No completó · 22 clics | ✅ **15 clics** | ✅ **15 clics** |
| **B** · Sin claridad: duerme de lado, molestias en la espalda → ficha | 🟡 Parcial · 23 clics | ✅ **14 clics** | ✅ **14 clics** |
| **C** · Comparar 3 colchones de distinta línea | 🟡 Parcial · ~25 clics | ✅ **8 clics** | ✅ **8 clics** |
| **A entrando directo a Líneas** (sin parámetros) | no probado | ❌ **No puede elegir "firme"** | no probado |

Detalle:

- **A.** Llega a la ficha de Colchón Tempo 150 × 200 (**$299.990**) y lo agrega al carro. La premisa "firme a ~$250.000" no tiene coincidencia en el catálogo: el colchón firme más barato en 2 Plazas es Tempo. El flujo funciona; el precio objetivo del escenario no existe.
- **B.** Las tres recomendaciones son **colchones** (Nest $549.990, Bock $649.990, Seaqual $799.990), todas dentro del presupuesto $500.000–$1.000.000 y coherentes con lo respondido. En la prueba original recibía 3 camas europeas por debajo del rango. Las respuestas aparecen resumidas como chips y la ficha abierta es la de la primera recomendación.
- **C.** Compara 3 colchones de 3 líneas distintas (New style 6 Plus, Wave, Seaqual). El cajón muestra la franja "Iguales en los 3", etiquetas de diferencia de precio y los distintivos "Más económico" y "Mejor evaluado". Una primera lectura marcó "incompleto" por un selector mal escrito en el propio test, no por la página; se corrigió y el resultado es el de la tabla.
- **A directo a Líneas** ⚠ **Hallazgo nuevo.** Sin parámetros, Líneas abre en 2 Plazas · Premium · intermedio (el default del #11) y funciona. Pero **no existe ningún control de firmeza**: los 23 enlaces que cambian línea, tamaño o tipo llevan `firmeza=intermedio` fijo. Quien llega por buscador o anuncio y quiere "firme" no puede conseguirlo en Líneas; tiene que volver a Guía. Es justo el caso de las 937 sesiones sin parámetros que la prueba original pedía reproducir.

## 2. Problemas del sitio real (journey-actual §3 y hallazgos #1–#8)

| # | Problema en el sitio real | Estado | Evidencia de esta verificación |
|---|---|---|---|
| 1 | Líneas no permite calibrar precio | ✅ Resuelto y verificado | 175 cards en las 54 combinaciones, cada una con su precio, orden por precio y "+$X vs. el más económico" |
| 2 | "Ver más" reabre la decisión (16 SKUs mezclados) | ✅ Resuelto y verificado | Guía → Líneas arrastra tamaño, tipo, firmeza y medida; en A/B/C nunca hubo que volver a elegirlos |
| 3 | Comparar colchón vs cama obliga a volver atrás | ✅ Resuelto y verificado | Pestañas de tipo con cantidad y "También como…" cambian de tipo conservando línea, tamaño y orden |
| 4 | Destinos inconsistentes desde la misma grilla | ✅ Resuelto y verificado | 0 de 175 enlaces "Ver producto" muertos; todos van a `index-pdp.html`. 43 de 43 fichas muestreadas cargan con título y precio |
| 5 | Premium tercero pese a concentrar el catálogo | ✅ Resuelto por diseño | Premium es la línea por defecto al entrar a Líneas; el orden por precio se mantiene a propósito |
| 6 | Líneas cierra más sesiones de las que abre | 🟡 Solo medible en producción | Las causas probables (#1, #2, #7) están atendidas; confirmarlo exige la prueba A/B del plan de medición |
| 7 | El clic se va al header, no al contenido | 🟡 Diseñado, por medir | Líneas tiene diseño móvil propio y los escenarios pasan en 390 px; el efecto sobre el clic real no se puede mostrar en una maqueta |
| 8 | El embudo se vuelve más lento hacia la compra | 🟠 Parcial | Hay presupuesto de rendimiento y imágenes WebP con carga diferida; el TTFB de la PDP (hasta 2.700 ms) es de infraestructura y no se toca |

### Conclusiones de journey-actual §8

| Conclusión | Estado | Comentario |
|---|---|---|
| 8.1 "Evento clave" significa cosas distintas por página | 🟡 Medición, no diseño | Se resuelve definiendo el evento en [plan-medicion.md](plan-medicion.md), no con el prototipo |
| 8.2 La recirculación entre variantes valida el rediseño | 🟠 Parcial | En Líneas se puede cambiar de tipo; **en la ficha no hay forma de cambiar de tamaño ni de tipo** sin volver al listado |
| 8.3 Más cerca de la compra, más lenta | 🟠 Parcial | Igual que #8 |
| 8.4 Dispositivo (antes: «Se descubre en móvil, se decide en escritorio») | ✅ Verificado en 390 px | Los tres escenarios completan en móvil con los mismos clics que en escritorio; falta probar en dispositivos reales |

## 3. Hallazgos de la prueba de usabilidad (A1–C5)

| Hallazgo | Estado | Evidencia |
|---|---|---|
| A1 / B2 "Ver producto" muerto | ✅ | 0 de 175 enlaces muertos; ficha parametrizada para los 112 modelos |
| A2 / B6 La firmeza arranca en "suave" sin avisar | ✅ | Arranca en "intermedio", visible como selector segmentado con estado |
| A3 / B3 / C5 Tamaños contradictorios | ✅ | Guía, quiz y tabla de Líneas coinciden: 2 Plazas 150 × 190/200, Queen 160 × 200; Queen ya está en el quiz |
| A4 / C2 "Ver modelos / Ver línea" no lleva a los modelos | ✅ | Los 4 botones llevan a Líneas con su propia línea, tamaño, tipo y firmeza |
| B1 El recomendador devuelve siempre lo mismo | ✅ | A y B devuelven resultados distintos y coherentes con tipo, firmeza y presupuesto |
| B4 / C3 Precios por línea incoherentes entre pantallas | ✅ | Guía y Líneas muestran el mismo "Desde" ($249.990 / $359.990 / $799.990 / $1.679.989) y el orden creciente se respeta |
| B5 "Omitir" inaccesible | ✅ | El paso de datos pasó después del resultado y "Omitir" ya no existe |
| C1 La firmeza no diferencia nada en 2 Plazas | ✅ | Cada línea muestra solo sus firmezas reales: Esencial suave/intermedio, Premium las tres, Advantage suave/intermedio, Excelsior intermedio/firme |
| C4 El panel de análisis tapa la cuarta tarjeta | 🧪 Sigue | Es la capa de anotación del wireframe (se puede plegar); no iría a producción |
| Premium desaparece en King sin aviso | ✅ | Hoy Premium existe en King; para combinaciones sin línea, el aviso del #24 reserva su espacio |
| Botón "atrás" rebota entre anclas | ✅ en lo probado | Cambiar de tamaño en Guía no agrega entradas al historial; no se probaron todos los enlaces ancla |
| Tarjeta "Colchones" del carrusel no responde | ❌ Sigue | Las 10 tarjetas de categoría son `div` sin enlace |
| Presupuesto "Menos de $500.000" demasiado ancho | ❌ Sigue | Los tramos del quiz no cambiaron |

## 4. Lo que no está resuelto

1. **Líneas sin control de firmeza** (hallazgo nuevo, el más importante). Quien entra directo no puede pedir "firme" ni "suave".
2. **Precios del catálogo ≠ producción.** Sobre lo que se pudo emparejar por nombre y medida, **51 de 153 precios difieren** (33 de 99 colchones, 18 de 54 camas) y 83 productos no se pudieron emparejar por diferencias de nombre. La mayoría de las diferencias es de $10.000 a $100.000 y en la mayoría el catálogo está por encima. Ejemplos:

   | Producto (2 Plazas) | Catálogo | rosen.cl |
   |---|---|---|
   | Colchón Autonomy Sky 150 × 190 | $309.990 | $239.990 |
   | Colchón Nest 150 × 200 | $549.990 | $499.990 |
   | Cama Nest 150 × 200 | $749.990 | $649.990 |
   | Colchón Âme 150 × 200 | $929.990 | $799.990 |
   | Colchón Somnus 150 × 200 | $1.139.990 | $999.990 |

   Además hay dos valores a revisar: Cama Driven King en **$699.909** (parece un error de tipeo; en rosen.cl cuesta $649.990) y el "Desde" de Excelsior, **$1.679.989**, que no aparece en el listado público. Esto no afecta el patrón de navegación, pero sí cualquier demo que cite precios.
3. **Tarjetas de categoría del carrusel sin enlace** y **tramos de presupuesto anchos** (arriba).
4. **La ficha no permite cambiar de tamaño ni de tipo** (journey-actual §8.2).
5. **Contenido de las fichas.** Solo New style 6 tiene ficha completa; el resto muestra precio, tamaños, base, galería y barras, y oculta lo que no tiene dato.
6. **Pendientes de la prueba original:** pasada en GitHub Pages y pruebas en dispositivos reales o con lector de pantalla.
7. **Límite de la propia verificación.** Cumplir los clics no prueba que la gente compre más. Lo que el rediseño promete en conversión, abandono y recirculación solo se confirma con la prueba A/B del plan de medición.

## 5. Veredicto

- **Se soluciona y se verificó:** los problemas de navegación y de diseño que el prototipo puede resolver (#1–#5 y la gran mayoría de los hallazgos de usabilidad). Los tres escenarios completan con entre 32 % y 68 % menos clics y sin los bloqueos originales.
- **Se soluciona por diseño pero no se puede demostrar aquí:** #6, #7 y parte del #8 (comportamiento y rendimiento reales).
- **Sigue abierto:** el control de firmeza en Líneas, los precios desfasados, las categorías sin enlace, los tramos de presupuesto y el cambio de tamaño en la ficha.
