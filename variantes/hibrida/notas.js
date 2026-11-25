/* Capa "Por qué" de la v2 (opción híbrida): explica cada decisión de la página con datos del sitio actual.
   Se activa con la pestaña lateral "Por qué" o con ?notas=1 en la dirección (?notas=G3 abre esa nota).
   Las cifras salen de ratificacion-bigquery.md y variantes/datos-y-decisiones.md (verificadas el 23 y 24-11-2026).
   Describen el sitio actual: muestran el problema de hoy, no prueban que la propuesta sea mejor. */
(() => {
    const TIPOS = {
        datos: 'Con datos',
        parcial: 'Respaldo parcial',
        sinrespaldo: 'Sin respaldo',
        sindato: 'Sin dato',
        contra: 'Contra el dato'
    };
    const VENTANA = '22-03 al 20-06-2026';
    const SIN_DATO = 'No hay una medición del sitio actual que respalde o descarte esto.';

    // Cada nota: id, sel (selectores en orden de preferencia; se usa el primero visible), tipo, titulo,
    // propone, datos, porque, limite (opcional), solidez, medir, fuente (opcional), pos ('izq' para la esquina izquierda)
    const NOTAS = {
        guia: [
            { id: 'G1', sel: ['#fTipos'], tipo: 'datos', titulo: '"¿Qué buscas?" es el primer paso',
              propone: 'El panel empieza preguntando qué tipo de producto se busca, con tarjetas a la vista en vez de una lista desplegable.',
              datos: 'En móvil, el elemento más clicado de la Guía actual es el carrusel de categorías: 13,49 % de los clics. Elegir el tipo es lo primero que hace la gente.',
              porque: 'Poner el tipo primero y a la vista repite lo que la gente ya hace en la Guía actual, sin esconderlo en un desplegable.',
              limite: 'El archivo de clics de Clarity podría no estar completo (los porcentajes de móvil suman 82,6 %). En escritorio el n.º 1 es el buscador (3,67 %).',
              solidez: 'Media',
              medir: 'Sin línea base. Hay que medir cuántas sesiones eligen un tipo en el panel.',
              fuente: 'Microsoft Clarity, clics de la Guía actual por dispositivo, ' + VENTANA + '.' },
            { id: 'G2', sel: ['#fTipos > :first-child'], tipo: 'datos', titulo: 'Abre en "Todos los tipos"',
              propone: 'La Guía abre sin un tipo elegido. Antes abría en "Colchones".',
              datos: 'En el carrusel de categorías de la Guía actual, camas suma 12.986 clics y colchones 11.107: un reparto de ≈54 % y 46 %.',
              porque: 'Ninguno de los dos domina. Abrir en uno solo dejaría fuera de entrada a casi la mitad de las personas; con "Todos los tipos" cada quien elige.',
              limite: 'Son clics, no personas: alguien puede hacer clic en las dos categorías.',
              solidez: 'Alta',
              medir: 'Qué tipo eligen primero quienes usan el panel.',
              fuente: 'GA4, clics del carrusel de categorías (exportados a BigQuery), ' + VENTANA + '.' },
            { id: 'G3', sel: ['.hyB-otros'], tipo: 'datos', titulo: 'Otros tipos de cama, a un clic',
              propone: 'Una fila con los siete tipos que el prototipo no filtra: camas con muebles, guarda objetos, nido y divanes, bases, camas eléctricas, sofás cama y camarotes. Cada uno lleva a su categoría en rosen.cl.',
              datos: 'De los 31.877 clics en el carrusel de categorías de la Guía actual, el 24 % va a esos siete tipos: camas con muebles 2.683, guarda objetos 1.815, nido y divanes 1.117, bases 1.044, eléctricas 467, sofás cama 439 y camarotes 219. En escritorio es el 31,5 %; en móvil, el 13,5 %.',
              porque: 'Uno de cada cuatro clics busca algo que la Guía propuesta no filtra. Sin esta fila, esas personas no tendrían salida desde el panel.',
              limite: 'Son clics, no personas.',
              solidez: 'Alta',
              medir: 'Clics en "Otros tipos de cama", contra el 24 % actual.',
              fuente: 'GA4, clics del carrusel de categorías (exportados a BigQuery), ' + VENTANA + '.' },
            { id: 'G4', sel: ['.hyB-campo:first-child'], tipo: 'datos', titulo: '2 Plazas por defecto',
              propone: 'El tamaño abre en 2 Plazas · 150 × 200 cm.',
              datos: '"Camas 2 Plazas" es el filtro más usado de la Guía actual: 1.558 clics (584 en móvil y 962 en escritorio). "Colchones 2 Plazas" le sigue con 1.240.',
              porque: 'Es el tamaño que más se busca. Abrir en él muestra resultados útiles desde el primer momento a la mayor cantidad de personas.',
              limite: 'Son clics en filtros, no compras por tamaño.',
              solidez: 'Alta',
              medir: 'Cuántas sesiones cambian el tamaño por defecto.',
              fuente: 'GA4, clics de la Guía (exportados a BigQuery), ' + VENTANA + '.' },
            { id: 'G5', sel: ['.hyB-campo:last-child'], tipo: 'parcial', titulo: 'Buscar con cuatro datos',
              propone: 'Arriba, cuatro datos que arman una frase: tipo, tamaño, firmeza y presupuesto. Los modelos se ajustan a medida que se eligen.',
              datos: 'En escritorio, el elemento más clicado de la Guía actual es el buscador del sitio: 3,67 % de los clics (581). La gente quiere buscar directamente.',
              porque: 'El panel ofrece una búsqueda guiada con los datos que definen la compra, en el lugar donde hoy está la intención de buscar.',
              limite: 'No sabemos qué se escribe en el buscador actual, así que no está probado que estos cuatro datos sean los que la gente busca. En móvil el n.º 1 es el carrusel de categorías, no el buscador.',
              solidez: 'Media',
              medir: 'Uso de cada campo del panel y paso a Modelos desde "Ver los modelos".',
              fuente: 'Microsoft Clarity, clics de la Guía actual por dispositivo, ' + VENTANA + '.' },
            { id: 'G6', sel: ['#fAyuda'], tipo: 'sinrespaldo', titulo: '"Ayúdame a elegir"',
              propone: 'Un cuestionario de seis preguntas que recomienda tres modelos.',
              datos: 'El recomendador de la Guía actual lo usa el 2,5 % de las sesiones (1.539 de 62.121; 1.757 clics).',
              porque: 'Los datos no respaldan darle protagonismo: hoy lo usa muy poca gente. Queda como apoyo secundario, junto a "Ver los modelos", por decisión de diseño.',
              limite: 'No se puede medir cuántas personas lo ven: el sitio no registra cuándo se muestra.',
              solidez: 'Alta (uso)',
              medir: 'Sesiones que abren el cuestionario y cuántas lo terminan, contra el 2,5 % actual.',
              fuente: 'GA4, ' + VENTANA + '.' },
            { id: 'G7', sel: ['.pvA-cab', '#prevRoot'], tipo: 'sindato', titulo: 'Vista previa de modelos',
              propone: 'Un carrusel con los modelos que coinciden con la búsqueda, ordenable por valoración, precio o descuento, para ver resultados sin salir de la Guía.',
              datos: SIN_DATO,
              porque: 'Es una decisión de diseño: mostrar resultados mientras se elige, para que el efecto de cada dato se vea de inmediato.',
              solidez: '—',
              medir: 'Clics en los modelos del carrusel y en "Ver todos".' },
            { id: 'G8', sel: ['#ayudaT'], tipo: 'parcial', pos: 'texto', titulo: 'Guía de compra antes que venta telefónica',
              propone: 'Tres ayudas en este orden: guía de compra, comparar modelos y venta telefónica.',
              datos: 'En la Guía actual, la guía de compra recibe 1.150 clics y la venta telefónica, 58.',
              porque: 'La guía de compra se usa unas 20 veces más que la venta telefónica; por eso va primero.',
              limite: 'El dato ordena esas dos. El lugar de "Compara nuestros modelos" y el orden exacto son decisión de diseño.',
              solidez: 'Alta',
              medir: 'Clics en cada ayuda.',
              fuente: 'GA4, clics de la Guía (exportados a BigQuery), ' + VENTANA + '.' },
            { id: 'G9', sel: ['.v-nav'], tipo: 'datos', titulo: 'Navegación "Guía | Modelos"',
              propone: 'Dos pestañas fijas, Guía y Modelos, en las tres páginas. Las dos llevan la búsqueda actual.',
              datos: 'Como mínimo, el 5,6 % de las sesiones de la Guía pasa a Líneas (6,8 % en móvil y 4,3 % en escritorio). Como página de entrada, la Guía convierte más que Líneas: entre 1,6 % y 2,1 %, contra entre 0,07 % y 0,94 %.',
              porque: 'La Guía es la mejor puerta de entrada, pero hoy pocas personas pasan de ella a ver los modelos. Un acceso visible y permanente a Modelos hace explícito ese paso.',
              limite: 'GA4 agrupa parte de las direcciones de origen en "(other)", así que el 5,6 % es un mínimo. Que el paso sea bajo por falta de un enlace visible es una lectura, no un dato.',
              solidez: 'Media (paso a Líneas) · Alta (la Guía convierte más)',
              medir: 'Paso de la Guía a Modelos, contra al menos el 5,6 % de las sesiones.',
              fuente: 'GA4, ' + VENTANA + '.' },
            { id: 'G10', sel: ['#hyT'], tipo: 'datos', pos: 'texto', titulo: 'Escritorio y móvil pesan distinto',
              propone: 'Las dos versiones se diseñan con el mismo cuidado: el móvil por alcance y el escritorio por compra.',
              datos: 'Visitan la Guía 27.105 usuarios en móvil y 26.068 en escritorio. De ellos compra el 3,1 % en móvil y el 9,5 % en escritorio. En todo el sitio, 10.759 compradores usan móvil y 11.341 escritorio.',
              porque: 'El tráfico se reparte casi en partes iguales, pero en escritorio se compra tres veces más. Ninguna de las dos versiones puede ser secundaria.',
              limite: 'GA4 asigna el dispositivo por usuario y no sigue a quien empieza en el móvil y termina en el computador: muestra dónde ocurre la compra, no dónde se decide. El dataset no documenta cómo se definió el embudo.',
              solidez: 'Media',
              medir: 'Compra de quienes visitan la Guía: 3,1 % en móvil y 9,5 % en escritorio.',
              fuente: 'GA4 (exportado a BigQuery), ' + VENTANA + '.' },
            { id: 'G11', sel: ['#hyLineas'], tipo: 'sindato', pos: 'texto', titulo: '"Cuatro líneas" y servicios',
              propone: 'Bajo la vista previa, las cuatro líneas de Rosen ordenadas por inversión según la búsqueda y, al final, los servicios: tiendas, prueba, retiro, medios de pago, asesoría y armado.',
              datos: SIN_DATO,
              porque: 'Es una decisión de diseño: explicar las líneas con la búsqueda de la persona y cerrar con lo que da confianza para comprar.',
              solidez: '—',
              medir: 'Clics en cada línea y en cada servicio.' }
        ],
        lineas: [
            { id: 'M1', sel: ['#hyRes'], tipo: 'datos', pos: 'texto', titulo: 'Modelos también es página de entrada',
              propone: 'Modelos funciona sola: sin datos en la dirección abre en 2 Plazas, con todos los tipos, precio por modelo, filtros y orden.',
              datos: '937 sesiones entran directo por Líneas, sin pasar por la Guía (≈16 % de sus sesiones). Del total de sesiones de Líneas, ≈36 % viene de canales pagados, 35 % de búsqueda orgánica y 16 % es directo. La campaña de marca aporta 851 sesiones (≈15 %).',
              porque: 'Una parte relevante llega por anuncios o desde Google sin haber visto la Guía. Tiene que poder empezar aquí.',
              limite: 'Las sesiones de GA4 son aproximadas: la suma de filas y el total difieren 1–2 %.',
              solidez: 'Alta',
              medir: 'Sesiones que entran por Modelos y cuántas llegan a una ficha.',
              fuente: 'GA4 y BigQuery, ' + VENTANA + '.' },
            { id: 'M2', sel: ['#rail', '#abrirRail'], tipo: 'parcial', titulo: 'Precio por modelo, filtros y orden',
              propone: 'Cada tarjeta muestra el precio del modelo en el tamaño elegido. Hay filtros de tamaño, firmeza, presupuesto y línea, y orden por valoración, precio, descuento o nombre.',
              datos: 'La página de Líneas actual no muestra el precio de cada modelo.',
              porque: 'Sin precio no se puede comparar ni filtrar por presupuesto, que es uno de los cuatro datos de la búsqueda.',
              limite: 'Es una observación del sitio, no una medición de GA4, BigQuery ni Clarity.',
              solidez: '—',
              medir: 'Uso de filtros y orden, y paso de Modelos a una ficha.' },
            { id: 'M3', sel: ['.ux-card'], tipo: 'datos', pos: 'izq', titulo: 'Tarjetas pensadas para móvil',
              propone: 'En móvil, "Vista rápida" y "Comparar" van bajo el precio y la foto se ve entera.',
              datos: 'El 70,7 % de los usuarios que visitan Líneas usa móvil, y el 82,9 % de los que entran por ella.',
              porque: 'La mayoría ve esta página en un teléfono. Antes los controles tapaban ≈40 % de la foto en tarjetas de 163 px de ancho.',
              limite: 'No hay dato que mida cuánto afectaba la foto tapada. El respaldo es el peso del móvil.',
              solidez: 'Alta',
              medir: 'Paso de Modelos a una ficha en móvil.',
              fuente: 'GA4, ' + VENTANA + '.' },
            { id: 'M4', sel: ['.ux-card .hy-acc-comp', '.ux-card .hy-comp', '.ux-card .ux-comparar'], tipo: 'datos', pos: 'texto', titulo: 'Comparar sin saltar entre fichas',
              propone: 'Marcar modelos y verlos lado a lado en una tabla.',
              datos: 'De las sesiones que ven alguna ficha, el 19,0 % en escritorio pasa de una ficha a otra, contra el 7,3 % en móvil. Entre quienes vieron la Guía: 33,9 % y 19,6 %.',
              porque: 'Hoy se compara saltando entre fichas, sobre todo en escritorio. El comparador lo permite sin ir y volver.',
              limite: 'Incluye recargas de la misma ficha, y GA4 agrupa parte de las direcciones de origen, así que puede quedarse algo corto. El dato de quienes vieron la Guía es una estimación con una muestra del 14 %.',
              solidez: 'Media',
              medir: 'Uso del comparador, y sesiones que pasan de una ficha a otra: 10,2 % (7,3 % móvil, 19,0 % escritorio).',
              fuente: 'GA4, ' + VENTANA + '.' },
            { id: 'M5', sel: ['.v-nav a[data-guia]', '.v-nav'], tipo: 'datos', pos: 'arriba', titulo: 'Volver a la Guía con lo elegido',
              propone: 'El enlace "Guía" vuelve a la Guía con el tipo, el tamaño, la firmeza y el presupuesto elegidos.',
              datos: 'El 25,7 % de los usuarios que ven Líneas ve la Guía en los 30 minutos siguientes (22,9 % en móvil y 32,2 % en escritorio). Solo 102 sesiones lo hacen con un enlace desde Líneas.',
              porque: 'Mucha gente vuelve, pero hoy lo hace por otras páginas o con el botón atrás. Un enlace directo que conserva la búsqueda evita empezar de nuevo.',
              limite: 'Los embudos de GA4 cuentan usuarios, no sesiones, y este usó una muestra del 14 % de los datos. No se puede distinguir el botón atrás de otras rutas.',
              solidez: 'Media',
              medir: 'Vuelta de Modelos a la Guía en 30 minutos, contra el 25,7 %.',
              fuente: 'GA4, embudo por usuario, ' + VENTANA + '.' },
            { id: 'M6', sel: ['#tipos'], tipo: 'sindato', titulo: 'Pestañas por tipo y nombre "Modelos"',
              propone: 'Pestañas para filtrar por tipo (todos, camas europeas, box spring, colchones) y el nombre "Modelos" en vez de "Líneas".',
              datos: SIN_DATO,
              porque: 'Es una decisión de diseño: "Modelos" describe lo que la página lista, y las líneas quedan como filtro.',
              solidez: '—',
              medir: 'Uso de las pestañas.' }
        ],
        pdp: [
            { id: 'F1', sel: ['#medidas'], tipo: 'datos', titulo: 'Primero la medida',
              propone: 'Justo después del precio van las medidas: tamaño, largo 190/200 cm y base, dentro de la misma ficha.',
              datos: 'En camas y colchones, el 74 % de los saltos de una ficha a otra es el mismo modelo en otra medida, incluido el largo 190 ↔ 200 cm. En la cama Autonomy Sky, 158 visitas llegan desde la versión King y 114 desde la de 1,5 plazas.',
              porque: 'Cuando la gente salta entre fichas, sobre todo busca otra medida del mismo modelo. Cambiarla dentro de la ficha ahorra ese salto.',
              limite: 'Solo el 10,2 % de las sesiones que ven una ficha pasa a otra (7,3 % en móvil, 19,0 % en escritorio): el problema es real, pero de una minoría. El 74 % sale de comparar direcciones de página.',
              solidez: 'Alta (reparto) · Media (magnitud)',
              medir: 'Sesiones con ficha que pasan a otra ficha, contra el 10,2 %. Hay que registrar los cambios de medida dentro de la ficha.',
              fuente: 'GA4, 111.402 vistas de fichas de camas y colchones que llegan desde otra ficha, ' + VENTANA + '.' },
            { id: 'F2', sel: ['.hy-otros-tipos', '#fbComp'], tipo: 'datos', titulo: 'El tipo, como opción secundaria',
              propone: 'Los otros tipos del mismo modelo (colchón, cama europea, box spring) aparecen como enlace al final de la selección, no como primer paso.',
              datos: 'Solo ≈1 % de los saltos entre fichas de camas y colchones es el mismo modelo en otro tipo.',
              porque: 'Casi nadie cambia de tipo saltando entre fichas. Ponerlo primero ocuparía el lugar de lo que sí se hace: cambiar de medida.',
              limite: 'Si la gente compara tipos de otra forma (por ejemplo, desde la Guía), este dato no lo ve. Las diferencias de nombre entre direcciones pueden dejar saltos sin contar.',
              solidez: 'Alta (reparto)',
              medir: 'Clics en "También disponible como".',
              fuente: 'GA4, ' + VENTANA + '.' },
            { id: 'F3', sel: ['.ux-compra'], tipo: 'datos', titulo: 'Barra de compra con la medida',
              propone: 'En móvil, la barra fija de compra muestra la medida elegida sobre el precio, la cantidad y el botón.',
              datos: 'Cerca del 72 % de las grabaciones de ficha son en móvil: 72,9 % en Autonomy Sky (1.131 de 1.551) y 71,7 % en otra ficha (264 de 368).',
              porque: 'La mayoría ve la ficha en un teléfono, donde la barra queda siempre a la vista. Ver la medida ahí evita agregar al carro una medida que no era.',
              limite: 'Es una muestra de grabaciones de Clarity; GA4 no trae el dispositivo por ficha.',
              solidez: 'Media',
              medir: 'Agregados al carro desde la barra en móvil.',
              fuente: 'Microsoft Clarity, grabaciones, ' + VENTANA + '.' },
            { id: 'F4', sel: ['.v-migas a'], tipo: 'datos', pos: 'arriba', titulo: 'Volver a la Guía desde la ficha',
              propone: 'La miga "Camas y Colchones" y la pestaña "Guía" vuelven a la Guía con el tamaño y el tipo de esta ficha.',
              datos: 'Al menos 5.648 vistas de la Guía vienen de al menos 1.382 fichas distintas.',
              porque: 'Desde muchas fichas la gente vuelve a la Guía. El enlace lleva la búsqueda para no empezar de nuevo.',
              limite: 'GA4 agrupó parte de las direcciones de origen, así que son mínimos.',
              solidez: 'Media',
              medir: 'Vistas de la Guía con una ficha como página anterior.',
              fuente: 'GA4, ' + VENTANA + '.' },
            { id: 'F5', sel: ['.ux-gal'], tipo: 'contra', titulo: 'Fotos y video sin sumar peso',
              propone: 'Galería con más fotos y un video del producto.',
              datos: 'La ficha actual ya es la página más lenta del recorrido: entre 14,0 y 16,4 s de carga, 7,7–8,7 MB y 550–567 solicitudes (Autonomy Sky).',
              porque: 'Va contra el dato: agrega contenido a la página más pesada. Para no empeorarla, el prototipo carga ≈250 KB y 18 solicitudes al inicio, difiere 14 de sus 16 imágenes y carga el video solo al hacer clic.',
              limite: 'Son 1 o 2 mediciones por página y dispositivo. El peso del prototipo no se puede comparar con el del sitio, que incluye la plataforma y scripts de terceros.',
              solidez: 'Baja',
              medir: 'Peso y tiempo de carga de la ficha integrada en el sitio, con la misma herramienta y dispositivo, contra 7,7–8,7 MB.',
              fuente: 'GTmetrix, mediciones del 18-06 al 12-07-2026.' },
            { id: 'F6', sel: ['[aria-label="Alternativas (desliza para ver más)"]'], tipo: 'sindato', titulo: 'Alternativas y bases sugeridas',
              propone: 'Modelos alternativos al final de la ficha y, en colchones, bases sugeridas para el tamaño.',
              datos: 'Los módulos de recomendación de la ficha actual ("Complementa con", "Si te gustó" y similares) tienen 0 eventos: no se miden.',
              porque: 'Es una decisión de diseño. Sin medición no se sabe si hoy ayudan o distraen.',
              solidez: '—',
              medir: 'Clics en las alternativas y bases agregadas al carro.',
              fuente: 'GA4 (exportado a BigQuery), ' + VENTANA + '.' },
            { id: 'F7', sel: ['#firmeza', '#preguntas'], tipo: 'sindato', titulo: 'Firmeza, más información y preguntas',
              propone: 'Escalas de firmeza y adaptación, pestañas con materiales y preguntas frecuentes.',
              datos: SIN_DATO,
              porque: 'Es una decisión de diseño para explicar el producto en la misma ficha.',
              solidez: '—',
              medir: 'Apertura de pestañas y preguntas.' }
        ]
    };

    const pagina = /lineas\.html/.test(location.pathname) ? 'lineas' : /pdp\.html/.test(location.pathname) ? 'pdp' : 'guia';
    const NOMBRE = { guia: 'Guía', lineas: 'Modelos', pdp: 'Ficha de producto' }[pagina];
    const notas = NOTAS[pagina];
    const CLAVE = 'rosenNotasV2';
    const leer = () => { try { return localStorage.getItem(CLAVE) === '1'; } catch (e) { return false; } };
    const guardar = v => { try { localStorage.setItem(CLAVE, v ? '1' : '0'); } catch (e) {} };
    const movil = () => matchMedia('(max-width: 640px)').matches;
    const suave = () => matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

    let activa = false, abierta = false, actual = null, foco = null, pendiente = false;

    // ---- Estructura ----
    const tab = document.createElement('button');
    tab.type = 'button'; tab.className = 'nt-tab'; tab.setAttribute('aria-controls', 'ntPanel'); tab.setAttribute('aria-expanded', 'false');
    const capa = document.createElement('div');
    capa.className = 'nt-capa'; capa.hidden = true;
    const panel = document.createElement('aside');
    panel.className = 'nt-panel'; panel.id = 'ntPanel'; panel.hidden = true; panel.setAttribute('aria-labelledby', 'ntT');
    panel.innerHTML =
        '<div class="nt-cab"><div><p class="nt-pag">' + NOMBRE + ' · ' + notas.length + ' notas</p><h2 id="ntT">Por qué esta propuesta</h2></div>' +
        '<button type="button" class="nt-x" aria-label="Cerrar el panel (las marcas siguen en la página)">×</button></div>' +
        '<div class="nt-cuerpo" id="ntCuerpo"></div>' +
        '<div class="nt-pie"><button type="button" class="nt-apagar">Ocultar las notas</button></div>';
    const cuerpo = panel.querySelector('#ntCuerpo');

    const marcas = {};
    notas.forEach(n => {
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'nt-m nt-' + n.tipo; b.textContent = n.id; b.dataset.nota = n.id;
        b.setAttribute('aria-label', 'Nota ' + n.id + ': ' + n.titulo + ' (' + TIPOS[n.tipo] + ')');
        b.hidden = true;
        capa.appendChild(b); marcas[n.id] = b;
    });
    document.body.append(capa, tab, panel);

    // ---- Dónde está cada elemento ----
    function visible(el) {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && r.right > 0 && r.left < innerWidth && getComputedStyle(el).visibility !== 'hidden';
    }
    function destino(n) {
        for (const s of n.sel) { const el = [...document.querySelectorAll(s)].find(visible); if (el) return el; }
        return null;
    }
    function colocar() {
        pendiente = false;
        if (!activa) return;
        notas.forEach(n => {
            const m = marcas[n.id], el = destino(n);
            if (!el) { m.hidden = true; return; }
            let r = el.getBoundingClientRect(), x, y = r.top - 11;
            if (n.pos === 'texto') {
                // títulos y leyendas: la marca va justo después del texto, no en el borde de la caja
                const rg = document.createRange(); rg.selectNodeContents(el); const t = rg.getBoundingClientRect();
                if (t.width) r = t;
                x = r.right + 8; y = r.top + Math.min(r.height, 28) / 2 - 12;
            } else {
                x = n.pos === 'izq' ? r.left - 8 : r.right - 30;
                if (n.pos === 'arriba') y = r.top - 26;   // enlaces cortos (miga, pestaña): la marca no tapa el texto
            }
            if (y < -30 || y > innerHeight - 10) { m.hidden = true; return; }
            m.hidden = false;
            x = Math.min(Math.max(x, 4), innerWidth - m.offsetWidth - 6);
            m.style.transform = 'translate(' + Math.round(x) + 'px,' + Math.round(y) + 'px)';
        });
    }
    // requestAnimationFrame se pausa cuando la página no se está pintando; el temporizador asegura que las marcas igual se ubiquen
    const pedir = () => {
        if (pendiente || !activa) return;
        pendiente = true; requestAnimationFrame(colocar); setTimeout(() => { if (pendiente) colocar(); }, 120);
    };

    // ---- Contenido del panel ----
    const chip = n => '<span class="nt-chip nt-' + n.tipo + '">' + n.id + '</span>';
    function indice() {
        const cuenta = {}; notas.forEach(n => { cuenta[n.tipo] = (cuenta[n.tipo] || 0) + 1; });
        cuerpo.innerHTML =
            '<p class="nt-intro">Cada marca en la página explica una decisión con datos del sitio actual: GA4, Microsoft Clarity y GTmetrix, del ' + VENTANA + '. ' +
            'Los datos muestran el problema de hoy y la dirección del cambio. <strong>No prueban que esta propuesta sea mejor</strong>: eso se sabrá al medirla.</p>' +
            '<ul class="nt-leyenda">' + Object.keys(TIPOS).filter(t => cuenta[t]).map(t => '<li><span class="nt-punto nt-' + t + '" aria-hidden="true"></span>' + TIPOS[t] + ' <span class="nt-n">' + cuenta[t] + '</span></li>').join('') + '</ul>' +
            '<details class="nt-solidez"><summary>Cómo leer la solidez</summary><ul>' +
            '<li><strong>Alta:</strong> tabla completa, unidad correcta y muestra amplia.</li>' +
            '<li><strong>Media:</strong> cifra correcta con una limitación conocida, como muestreo, datos agrupados o una definición incompleta.</li>' +
            '<li><strong>Baja:</strong> mediciones sueltas. Sirve como señal, no como medida.</li></ul></details>' +
            '<ol class="nt-lista">' + notas.map(n => '<li><button type="button" data-ir="' + n.id + '">' + chip(n) + '<span><strong>' + n.titulo + '</strong><small>' + TIPOS[n.tipo] + '</small></span></button></li>').join('') + '</ol>';
    }
    function detalle(n) {
        const i = notas.indexOf(n), ant = notas[i - 1], sig = notas[i + 1];
        const fila = (t, v) => v ? '<dt>' + t + '</dt><dd>' + v + '</dd>' : '';
        cuerpo.innerHTML =
            '<button type="button" class="nt-volver" data-indice>← Todas las notas</button>' +
            '<p class="nt-tipo">' + chip(n) + TIPOS[n.tipo] + '</p>' +
            '<h3 class="nt-h">' + n.titulo + '</h3>' +
            '<dl class="nt-dl">' +
            fila('Qué propone', n.propone) + fila('Lo que dicen los datos', n.datos) + fila('Por qué esta opción', n.porque) +
            fila('Hasta dónde llega el dato', n.limite) + fila('Solidez', n.solidez) + fila('Cómo sabremos si funciona', n.medir) + fila('Fuente', n.fuente) +
            '</dl>' +
            '<div class="nt-pasos">' + (ant ? '<button type="button" data-ir="' + ant.id + '">← ' + ant.id + '</button>' : '<span></span>') +
            (sig ? '<button type="button" data-ir="' + sig.id + '">' + sig.id + ' →</button>' : '') + '</div>';
    }

    // ---- Acciones ----
    function marcarFoco(el) {
        if (foco) foco.classList.remove('nt-foco');
        foco = el; if (el) el.classList.add('nt-foco');
        Object.values(marcas).forEach(m => m.classList.toggle('nt-activa', !!actual && m.dataset.nota === actual.id));
    }
    function abrirNota(id, desplazar) {
        const n = notas.find(x => x.id === id); if (!n) return;
        actual = n; detalle(n); abrirPanel();
        cuerpo.scrollTop = 0;
        const el = destino(n);
        marcarFoco(el);
        if (el && getComputedStyle(el).position !== 'fixed') {   // la barra de compra es fija: no hay a dónde desplazar
            const r = el.getBoundingClientRect();
            // desde una marca solo se desplaza si el panel tapa el elemento (en móvil el panel cubre la parte de abajo)
            const tapado = movil() ? r.top < 0 || r.bottom > panel.getBoundingClientRect().top - 8 : r.top < 0 || r.top > innerHeight - 40;
            if (!desplazar && !tapado) { pedir(); return; }
            const arriba = movil() ? 72 : Math.max(90, innerHeight / 3 - r.height / 2);
            scrollTo({ top: Math.max(0, r.top + scrollY - arriba), behavior: suave() });
        }
        pedir();
    }
    function verIndice() { actual = null; indice(); marcarFoco(null); cuerpo.scrollTop = 0; }
    function abrirPanel() {
        abierta = true; panel.hidden = false; tab.hidden = true; tab.setAttribute('aria-expanded', 'true');
        document.body.classList.add('nt-panel-abierto');
    }
    function cerrarPanel() {
        abierta = false; panel.hidden = true; tab.hidden = false; tab.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nt-panel-abierto');
        actual = null; marcarFoco(null); pintarTab(); tab.focus();
    }
    function pintarTab() { tab.textContent = activa ? 'Notas · ' + notas.length : 'Por qué'; tab.setAttribute('aria-label', activa ? 'Abrir la lista de notas' : 'Ver por qué: notas con datos sobre esta propuesta'); }
    function encender(conPanel) {
        activa = true; guardar(true); capa.hidden = false; document.body.classList.add('nt-on');
        pintarTab(); if (conPanel) { verIndice(); abrirPanel(); }
        pedir();
    }
    function apagar() {
        activa = false; guardar(false); capa.hidden = true; document.body.classList.remove('nt-on');
        if (abierta) cerrarPanel(); pintarTab();
    }

    tab.addEventListener('click', () => { if (!activa) encender(true); else { verIndice(); abrirPanel(); } panel.querySelector('.nt-x').focus(); });
    panel.querySelector('.nt-x').addEventListener('click', cerrarPanel);
    panel.querySelector('.nt-apagar').addEventListener('click', apagar);
    cuerpo.addEventListener('click', ev => {
        const ir = ev.target.closest('[data-ir]'); if (ir) { abrirNota(ir.dataset.ir, true); cuerpo.querySelector('.nt-volver').focus(); return; }
        if (ev.target.closest('[data-indice]')) verIndice();
    });
    capa.addEventListener('click', ev => { const m = ev.target.closest('.nt-m'); if (m) abrirNota(m.dataset.nota, false); });
    document.addEventListener('keydown', ev => { if (ev.key === 'Escape' && abierta && !document.querySelector('dialog[open]')) cerrarPanel(); });

    addEventListener('scroll', pedir, { passive: true });
    addEventListener('resize', pedir);
    new MutationObserver(muts => { if (muts.some(m => !capa.contains(m.target) && !panel.contains(m.target))) pedir(); })
        .observe(document.body, { childList: true, subtree: true });
    setInterval(pedir, 800);   // cambios de clase o de estilo que no agregan elementos (por ejemplo, abrir los filtros)

    // ---- Inicio: ?notas=1 abre la lista, ?notas=G3 abre esa nota; si no, se recuerda si estaban activas ----
    const p = new URLSearchParams(location.search).get('notas');
    const pedida = p && notas.find(n => n.id.toLowerCase() === p.toLowerCase());
    if (pedida) { encender(false); setTimeout(() => abrirNota(pedida.id, true), 300); }
    else if (p === '1') encender(true);
    else if (p === '0') apagar();
    else if (leer()) encender(false);
    else pintarTab();
})();
