# Camas y Colchones — Guía y Líneas (Rosen)

Wireframe interactivo de alta fidelidad para el rediseño de las secciones **Guía** y **Líneas** de Camas y Colchones de [rosen.cl](https://www.rosen.cl). No es solo un mockup estático: incluye interacciones reales (quiz, filtros, comparador) y capas de anotaciones superpuestas que documentan el razonamiento detrás de cada decisión de diseño.

**Análisis de datos y propuesta UX por Claudio González.**

## Archivos

```
index-guia.html      Página "Guía" — punto de entrada, recomendador y comparador por tamaño
index-lineas.html     Página "Líneas" — detalle de las 4 líneas y listado de modelos filtrados
index-pdp.html        Página de producto de ejemplo (New Style 6 Colchón)
data/modelos.js       Catálogo real de modelos (precio, imagen, firmeza, base) y construcción de las cards, compartido por Guía y Líneas
images/                Capturas de referencia, screenshots de secciones estáticas, imágenes de productos y assets del quiz
hallazgos-y-mejoras.md  Lista consolidada de problemas y su estado
plan-medicion.md      Cómo medir si el rediseño funciona (indicadores, eventos, línea base y prueba A/B)
```

Las páginas no tienen dependencias ni build step: CSS y JS van inline, salvo `data/modelos.js`, que se carga con un `<script src>`. Para abrirlas basta servir la carpeta con cualquier servidor estático (por ejemplo `python3 -m http.server`).

## Cómo leer el wireframe

El panel flotante de la derecha alterna entre capas de información superpuestas al wireframe. Cada capa responde una pregunta distinta sobre el diseño:

| Vista | Qué muestra |
|---|---|
| **Wireframe** | El diseño limpio, sin anotaciones. |
| **Cognición** | Marca en qué parte de la página se resuelve cada una de las 5 etapas cognitivas del journey (ver más abajo). |
| **Decisiones del usuario** | Las decisiones (D1–D7) que el usuario debe tomar para avanzar, y por qué el diseño las resuelve donde las resuelve. |
| **Datos desde fuente** | Métricas reales (clics, tasas de interacción, rankings) que justifican una decisión de diseño puntual. |
| **Anotaciones** | Comentarios y recomendaciones personales del autor, incluyendo hallazgos de Baymard y sitios de referencia. |
| **Referencias** | Capturas de sitios (Saatva, Casper, Leesa, Nectar, etc.) que inspiraron un patrón específico. |
| **Navegación** | Explica por qué cada sección ocupa el lugar que ocupa dentro de la arquitectura de la página. |

Los círculos numerados dentro de cada capa se abren con un clic para ver el detalle.

## Las 5 etapas cognitivas

El journey de compra se modeló como 5 decisiones secuenciales (no páginas) que el usuario atraviesa, más un factor transversal:

1. **Reconocer la necesidad** — ¿Qué tipo de producto necesito? (resuelto en Guía)
2. **Orientarse por categoría** — ¿Cuál es mi nivel de calidad/precio? (Guía → Líneas)
3. **Comparar candidatos concretos** — ¿Cuál de estos productos me sirve? (mayoritariamente PDP↔PDP hoy, no en Líneas como esperaba el diseño original — la brecha más grande detectada)
4. **Confirmar la elección específica** — ¿Qué variante/medida exacta compro? (PDP, selector de variante)
5. **Decidir el momento de compra** — ¿Qué incluye, cuánto cuesta, estoy listo? (PDP → Carrito → Compra)

*Factor transversal (no una 6ª etapa):* justificar el gasto / confiar en la marca corre en paralelo a las etapas 2–5.

*Nota metodológica:* BigQuery/GA4/Clarity miden comportamiento (clics, tiempo, transiciones), no cognición — la etiqueta "cognitiva" es una interpretación sobre un patrón de comportamiento medido, no una medición directa de qué piensa el usuario.

## Funcionalidades interactivas

- **Recomendador (quiz)** — 5 preguntas (tipo de producto, firmeza, problemas de sueño, tamaño, presupuesto) que terminan en una recomendación personalizada.
- **Compara por tamaño** (Guía) — filtro por tamaño que muestra las 4 líneas disponibles con firmeza y precio en paralelo. Cada CTA "Ver modelos [Línea]" lleva a Líneas con la selección codificada en la URL (`?tamano=&linea=&firmeza=&tipo=`).
- **Modelos filtrados** (Líneas) — recibe los parámetros de la URL y renderiza los modelos reales de esa línea/tamaño/firmeza, con precio distinto según se elija cama o colchón.
- **Comparador de productos** — checkbox "Comparar" en las tarjetas de producto (hasta 3), con una barra fija que resume la selección. Persiste en `localStorage` (`rosenCompareItems`) y se mantiene al navegar entre Guía y Líneas.

## Perfiles de navegación (evidencia de comportamiento real)

Seis perfiles identificados a partir de datos de búsqueda y navegación medidos (BigQuery/GA4/Clarity), usados para priorizar qué resuelve el diseño y qué queda fuera de alcance:

- **P1 — Orientado por producto**: busca nombres exactos de modelo.
- **P2 — Orientado por solución**: busca por necesidad funcional.
- **P3 — Validador de categoría**: vuelve del PDP a Guía a validar la categoría.
- **P4 — Comparador sin estructura** ⚠️: compara líneas manualmente, sin convertir.
- **P5 — Verificador de viabilidad** ⚠️ bajo volumen: revisa medidas antes de comprar.
- **P6 — Comprador de otra categoría Rosen** ⏳ fuera de alcance (fase 2): busca otras verticales del sitio.

## Stack técnico

HTML + CSS + JavaScript vanilla. Sin frameworks, sin dependencias externas de build. El único estado persistente es `localStorage` para el comparador — todo lo demás vive en el DOM.

---

Repositorio privado de trabajo.
