/* Ficha de producto parametrizada (#30). Se carga al final de index-pdp.html.
   Lee la URL (?modelo=&tipo=&tamano=&linea=&firmeza=&medida=&base=), busca el modelo en el catálogo (data/modelos.js)
   y completa la ficha con datos reales. New style 6 conserva su contenido completo (el colchón con sus fotos y su video;
   la cama europea con las fotos reales de su ficha); el resto de los modelos muestra solo lo que hay en el catálogo y
   oculta los bloques que dependen de contenido propio de cada producto (galería, capas de tecnología, reseñas, etc.). */
(() => {
    const params = new URLSearchParams(location.search);
    const nombre = params.get('modelo') || 'New style 6';
    const tipo = params.get('tipo') || 'colchon';
    const tamano = params.get('tamano') || '2-plazas';
    const TIPO_KEY = { 'cama-europea': 'camaEuropea', 'box-spring': 'boxSpring', 'colchon': 'colchon' };
    const TIPO_URL = { camaEuropea: 'cama-europea', boxSpring: 'box-spring', colchon: 'colchon' };
    const TIPO_CHIP = { camaEuropea: 'Cama europea', boxSpring: 'Box spring', colchon: 'Colchón' };
    const tipoKey = TIPO_KEY[tipo] || 'colchon';
    const prefijo = RosenModelos.tipoPrefijoMap[tipoKey];
    const esNS6 = nombre === 'New style 6';
    const TEXTO_LINEA = {
        'Línea Esencial': 'Todo lo necesario para un descanso de calidad: adaptabilidad, resistencia y buenos materiales. Una gran y conveniente elección.',
        'Línea Premium': 'La Línea Premium agrupa colchones que sobresalen por incorporar más tecnología como los resortes pocket advance, espumas zonificadas; diseños y propiedades que brindan mayor adaptabilidad al cuerpo, soporte y comodidad para un máximo descanso.',
        'Línea Advantage': 'Materiales de altísima calidad e innovaciones tecnológicas únicas en cada modelo. Se adapta a tu cuerpo, con gran soporte y máximo confort.',
        'Selección Excelsior': 'Las mejores tecnologías y materiales premium del catálogo. Sensaciones únicas de descanso, con adaptabilidad, soporte y durabilidad sin precedentes.'
    };
    const $ = s => document.querySelector(s);
    const $$ = s => document.querySelectorAll(s);
    const ocultar = sel => $$(sel).forEach(e => { e.style.display = 'none'; });

    // ---- 1. Buscar el modelo en el catálogo ----
    function buscar() {
        const linea = params.get('linea');
        let bloques = modelosData.filter(d => d.tamano === tamano && (!linea || d.linea === linea));
        if (!bloques.length) bloques = modelosData.filter(d => d.tamano === tamano);
        const pref = params.get('firmeza');
        const firmezas = [pref, 'intermedio', 'suave', 'firme'].filter((f, i, a) => f && a.indexOf(f) === i);
        for (const d of bloques) {
            for (const f of firmezas) {
                const m = (d.porFirmeza[f] || []).find(x => x.nombre === nombre && x[tipoKey] !== undefined);
                if (m) return { d, m, f };
            }
        }
        return null;
    }

    const hit = buscar();
    if (!hit) {
        mostrarError();
        return;
    }
    const { d, m, f: firmeza } = hit;
    const v = m[tipoKey];
    const dim = d.dimensiones;
    const nombreCompleto = prefijo + ' ' + nombre;
    const medidaParam = params.get('medida');

    const listaUrl = 'index-lineas.html?' + new URLSearchParams({
        tamano, linea: d.linea, firmeza, tipo, medida: medidaParam || dim, modelo: nombre
    }).toString() + '#modelosResultado';

    function pdpUrl(k) {
        return 'index-pdp.html?' + new URLSearchParams({ modelo: nombre, tipo: TIPO_URL[k], tamano, linea: d.linea, firmeza }).toString();
    }

    // ---- 2. Enlaces de regreso y "Ver como" (#3) ----
    const crumbLineas = $('.breadcrumb a[href="index-lineas.html"]');
    if (crumbLineas) crumbLineas.href = listaUrl;
    const comparar = $('.pdp-compare-link');
    if (comparar) comparar.href = listaUrl;

    const info = $('.pdp-info');
    const bloqueTipos = document.createElement('div');
    bloqueTipos.className = 'pdp-tipos';
    bloqueTipos.innerHTML = '<span class="pdp-tipos-label">Ver este modelo como:</span>';
    ['camaEuropea', 'boxSpring', 'colchon'].filter(k => m[k] !== undefined).forEach(k => {
        const precio = RosenModelos.precioDe(m, k, k === tipoKey && medidaParam ? medidaParam : '150 x 200cm').precio;
        const el = document.createElement(k === tipoKey ? 'span' : 'a');
        el.className = 'pdp-tipo-chip' + (k === tipoKey ? ' active' : '');
        el.textContent = TIPO_CHIP[k] + ' $' + precio.toLocaleString('es-CL');
        if (k === tipoKey) el.setAttribute('aria-current', 'true'); else el.href = pdpUrl(k);
        bloqueTipos.appendChild(el);
    });
    const rating = $('.pdp-info .rating');
    if (bloqueTipos.children.length > 2) rating.insertAdjacentElement('afterend', bloqueTipos);

    // ---- 3. El colchón New style 6 de 2 Plazas ya es la ficha completa: solo se le agregó el puente y los enlaces ----
    if (esNS6 && tipoKey === 'colchon' && tamano === '2-plazas') return;

    // ---- 4. Encabezado ----
    document.title = nombreCompleto + ' | Rosen';
    $('.breadcrumb .current').textContent = nombreCompleto;
    $('.pdp-info .linea-reco').textContent = d.linea;
    $('.pdp-info h1').textContent = nombreCompleto;
    if (!(esNS6 && tipoKey === 'colchon')) {
        const seed = tipoKey + '-' + nombre;
        $('.pdp-info .rating .stars').style.setProperty('--rating', calificacionFija(seed));
        $('.pdp-info .rating .rating-count').textContent = resenasFijas(seed).toLocaleString('es-CL') + ' reseñas';
    }

    // ---- 5. Precios, medidas y base ----
    const nuevosTamanos = {};
    let conAlmohada = {};
    if (tipoKey === 'colchon' && v.tamanos) {
        Object.assign(nuevosTamanos, v.tamanos);
        conAlmohada = v.tamanosConAlmohada || {};
    } else {
        nuevosTamanos[dim] = { precio: v.precio, precioNormal: v.precioNormal || v.precio };
    }
    PDP_DATA.nombre = nombreCompleto;
    PDP_DATA.tamanos = nuevosTamanos;
    PDP_DATA.tamanosConAlmohada = conAlmohada;
    const medidas = Object.keys(nuevosTamanos);
    medidaActual = medidas.includes(medidaParam) ? medidaParam : (medidas.includes('150 x 200cm') && tipoKey === 'colchon' ? '150 x 200cm' : (medidas.includes(dim) ? dim : medidas[0]));

    const filaTamano = $('.pdp-info .tamano-colchon');
    filaTamano.querySelectorAll('.firme').forEach(p => p.remove());
    const refPills = filaTamano.querySelector('.pdp-size-why-wrap');
    medidas.forEach(med => {
        const p = document.createElement('p');
        p.className = 'firme' + (med === medidaActual ? ' selected' : '');
        p.dataset.medida = med;
        p.textContent = med;
        p.addEventListener('click', () => {
            filaTamano.querySelectorAll('.firme').forEach(x => x.classList.remove('selected'));
            p.classList.add('selected');
            medidaActual = med;
            actualizarPrecio();
        });
        filaTamano.insertBefore(p, refPills);
    });
    if (tipoKey !== 'colchon') ocultar('.pdp-size-why-wrap');

    // Si el precio normal no es mayor que el de oferta, no se muestra descuento
    const actualizarPrecioOriginal = actualizarPrecio;
    window.actualizarPrecio = function () {
        actualizarPrecioOriginal();
        const fuente = ($('#pdpAlmohada') && $('#pdpAlmohada').checked) ? PDP_DATA.tamanosConAlmohada : PDP_DATA.tamanos;
        const x = fuente[medidaActual];
        const sinDescuento = !x || !x.precioNormal || x.precioNormal <= x.precio;
        const viejo = $('#pdpPriceOld');
        if (viejo) viejo.style.display = sinDescuento ? 'none' : '';
        $('#pdpDiscount').style.display = sinDescuento ? 'none' : '';
    };

    // Base de la cama europea: una opción fija, o elegir entre completa y dividida con su precio
    const opcionesBase = tipoKey === 'camaEuropea' && m.detalle && m.detalle.camaEuropea && m.detalle.camaEuropea.base;
    const clavesBase = opcionesBase ? Object.keys(opcionesBase) : [];
    const baseElegible = clavesBase.length > 1 && clavesBase.every(k => opcionesBase[k].precio);
    let baseActual = null;
    if (clavesBase.length) {
        baseActual = clavesBase.includes(params.get('base')) ? params.get('base') : (clavesBase.includes('completa') ? 'completa' : clavesBase[0]);
        const filaBase = document.createElement('div');
        filaBase.className = 'tamano-colchon';
        filaBase.innerHTML = '<p class="description">Base</p>';
        clavesBase.forEach(k => {
            const p = document.createElement('p');
            p.className = 'firme' + (k === baseActual ? ' selected' : '');
            p.dataset.base = k;
            p.textContent = k;
            if (baseElegible) p.addEventListener('click', () => elegirBase(k, filaBase));
            filaBase.appendChild(p);
        });
        filaTamano.insertAdjacentElement('beforebegin', filaBase);
    }

    // ---- 6. Galería ----
    const galeriaPropia = esNS6 && tipoKey === 'camaEuropea' && tamano === '2-plazas';
    const galeriaOriginal = esNS6 && tipoKey === 'colchon';
    function galeriaCama(base) {
        const b = base === 'dividida' ? 'dividida' : 'completa';
        const ruta = './images/productos/';
        return [
            { src: ruta + 'cama-ns6-' + b + '-1.webp', alt: nombreCompleto + ', base ' + b },
            { src: ruta + 'cama-ns6-' + b + '-2.webp', alt: nombreCompleto + ' — vista 2' },
            { src: ruta + 'cama-ns6-' + b + '-3.webp', alt: nombreCompleto + ' — vista frontal' },
            { src: ruta + 'cama-ns6-' + b + '-4.webp', alt: nombreCompleto + ' — vista 4' },
            { src: ruta + 'cama-ns6-5.webp', alt: nombreCompleto + ' — detalle de la etiqueta' },
            { src: ruta + 'cama-ns6-6.webp', alt: nombreCompleto + ' — detalle de la tela' },
            { src: ruta + 'cama-ns6-' + b + '-cota.webp', alt: nombreCompleto + ' — medidas' }
        ];
    }
    function setGaleria(items) {
        const col = $('.pdp-thumbs-vertical');
        col.innerHTML = items.map((it, i) => '<button type="button" class="pdp-thumb' + (i === 0 ? ' selected' : '') + '" data-imagen="' + it.src +
            '"><img src="' + it.src + '" alt="' + it.alt + '" width="900" height="900" loading="lazy" decoding="async"></button>').join('');
        col.style.display = items.length > 1 ? '' : 'none';
        const principal = $('#pdpImage');
        principal.src = items[0].src;
        principal.alt = items[0].alt;
        imagenSeleccionada = items[0].src;
        PDP_DATA.imagen = items[0].src;
    }
    if (!galeriaOriginal) {
        ocultar('.pdp-thumbs-row');
        ocultar('.pdp-video');
        const videoFicha = $('.pdp-video iframe');
        if (videoFicha) videoFicha.removeAttribute('src');   // este producto no tiene video: no se pide el del colchón
        const baseImg = baseActual && opcionesBase[baseActual] && opcionesBase[baseActual].imagen;
        setGaleria(galeriaPropia ? galeriaCama(baseActual) : [{ src: baseImg || v.imagen, alt: nombreCompleto }]);
        $('.pdp-thumbs-vertical').addEventListener('click', e => {
            const t = e.target.closest('.pdp-thumb');
            if (!t) return;
            $$('.pdp-thumb').forEach(x => x.classList.remove('selected'));
            t.classList.add('selected');
            imagenSeleccionada = t.dataset.imagen;
            $('#pdpImage').src = imagenSeleccionada;
        });
    }

    function elegirBase(k, fila) {
        baseActual = k;
        fila.querySelectorAll('.firme').forEach(p => p.classList.toggle('selected', p.dataset.base === k));
        const o = opcionesBase[k];
        PDP_DATA.tamanos[dim] = { precio: o.precio, precioNormal: o.precioNormal || o.precio };
        if (galeriaPropia) setGaleria(galeriaCama(k)); else if (o.imagen) setGaleria([{ src: o.imagen, alt: nombreCompleto + ', base ' + k }]);
        actualizarPrecio();
    }
    if (baseElegible) {
        const o = opcionesBase[baseActual];
        PDP_DATA.tamanos[dim] = { precio: o.precio, precioNormal: o.precioNormal || o.precio };
    }

    // ---- 7. Bloques que dependen de contenido propio del producto ----
    const hayAlmohada = esNS6 && tipoKey === 'colchon' && Object.keys(conAlmohada).length;
    if (!hayAlmohada) ocultar('label.almohada-add-on');
    if (!esNS6) {
        ocultar('.pdp-features');
        ocultar('.pdp-layers');
        ocultar('.pdp-why-band');
        ocultar('.pdp-feature-rows');
        ocultar('.pdp-firmeza-img');
    }
    if (!(esNS6 && tipoKey === 'colchon')) ocultar('.pdp-ratings');
    if (tipoKey !== 'colchon') ocultar('.pdp-base');

    // Descripción
    // Misma escala que usa el catálogo para agrupar por firmeza: 1-2 suave, 3-4 intermedio, 5 firme
    const etiquetaFirmeza = n => n <= 2 ? 'suave' : (n <= 4 ? 'intermedio' : 'firme');
    const etiquetaFirmezaEscala = n => n <= 2 ? 'Suave' : (n <= 4 ? 'Media' : 'Firme');
    const etiquetaAdapt = n => n <= 2 ? 'baja' : (n === 3 ? 'media' : 'alta');
    const pDesc = $('.pdp-description p');
    if (esNS6 && tipoKey === 'camaEuropea') {
        pDesc.textContent = 'La Cama Europea New style 6 de Línea Premium incorpora el colchón New style 6, que combina resortes pocket advance con espumas zonificadas para un soporte diferenciado por zonas del cuerpo, sobre una base europea con patas de madera. Firmeza intermedia y buena adaptabilidad, pensada para quienes buscan un descanso más tecnológico sin perder confort.';
    } else if (!esNS6) {
        pDesc.textContent = nombreCompleto + ' pertenece a la ' + d.linea + '. ' + (TEXTO_LINEA[d.linea] || '') +
            ' Firmeza ' + etiquetaFirmeza(m.firmeza) + ' (' + m.firmeza + ' de 5) y adaptación ' + etiquetaAdapt(m.adaptacion) + ' (' + m.adaptacion + ' de 5): valores referenciales del prototipo.';
    }
    if (d.linea !== 'Línea Premium') {
        const li = $('.pdp-linea-info');
        if (li) { li.querySelector('h2').textContent = d.linea; li.querySelector('p').textContent = TEXTO_LINEA[d.linea] || ''; }
    }

    // Barras y escalas de firmeza y adaptación
    const filas = $$('.pdp-info .valores .valores-row');
    [m.firmeza, m.adaptacion].forEach((n, i) => {
        if (!filas[i] || n == null) return;
        filas[i].querySelectorAll('.valores-segment').forEach((s, j) => s.classList.toggle('filled', j < n));
    });
    const bloques = $$('.pdp-valores-row .pdp-valor-block');
    [[m.firmeza, etiquetaFirmezaEscala], [m.adaptacion, etiquetaAdapt]].forEach(([n, etiqueta], i) => {
        const b = bloques[i];
        if (!b || n == null) return;
        const puntos = b.querySelectorAll('.pdp-firmness-dot');
        const idx = Math.round((n - 1) / 4 * (puntos.length - 1));
        puntos.forEach((p, j) => p.classList.toggle('active', j === idx));
        const tip = b.querySelector('.pdp-firmness-tooltip');
        if (tip) { tip.style.left = puntos[idx].style.left; tip.textContent = etiqueta(n).replace(/^./, c => c.toUpperCase()); }
    });

    actualizarPrecio();
    document.documentElement.dataset.pdpListo = 'si';

    // ---- Error: el modelo no existe con esos parámetros ----
    function mostrarError() {
        // ¿Existe este modelo en este tamaño con otro tipo? Se ofrece como alternativa.
        const otros = [];
        modelosData.filter(d => d.tamano === tamano).forEach(d => Object.entries(d.porFirmeza).forEach(([f, ms]) => ms.forEach(x => {
            if (x.nombre !== nombre) return;
            ['camaEuropea', 'boxSpring', 'colchon'].forEach(k => {
                if (x[k] !== undefined && !otros.some(o => o.k === k)) otros.push({ k, d, f });
            });
        })));
        const aviso = document.createElement('div');
        aviso.className = 'pdp-error';
        const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
        aviso.innerHTML = '<h1>No encontramos este producto</h1>' +
            '<p>No hay un modelo llamado <strong>' + esc(nombre) + '</strong> en esa combinación de tipo y tamaño.</p>' +
            (otros.length ? '<p>Sí lo tenemos como: ' + otros.map(o => '<a href="index-pdp.html?' + esc(new URLSearchParams({ modelo: nombre, tipo: TIPO_URL[o.k], tamano, linea: o.d.linea, firmeza: o.f }).toString()) +
                '">' + TIPO_CHIP[o.k] + '</a>').join(' · ') + '.</p>' : '') +
            '<p><a class="product-cta" href="index-lineas.html?tamano=' + encodeURIComponent(tamano) + '#modelosResultado">Ver los modelos disponibles</a></p>';
        $('.breadcrumb').insertAdjacentElement('afterend', aviso);
        ['.pdp', '.pdp-layers', '.pdp-why-band', '.pdp-description-full', '.pdp-ratings', '.pdp-recomendados', '#pdpStickyBar'].forEach(ocultar);
        document.title = 'Producto no encontrado | Rosen';
    }
})();
