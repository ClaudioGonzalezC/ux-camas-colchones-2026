/* Piezas que comparten las tres páginas de la opción 3 (híbrida): tarjeta, escalas y estrellas. */
const HY = (() => {
    const RUTA = 'variantes/hibrida/';
    // Diseño de tarjeta: ?card=limpia (por defecto) o ?card=completa; se recuerda mientras dure la sesión
    const CARD = (() => {
        const p = new URLSearchParams(location.search).get('card');
        try { if (p === 'limpia' || p === 'completa') sessionStorage.setItem('hyCard', p); return sessionStorage.getItem('hyCard') || 'limpia'; } catch (e) { return p === 'completa' ? 'completa' : 'limpia'; }
    })();
    const dim = x => x.replace(' x ', ' × ').replace('cm', ' cm');
    const escala = (txt, n) => '<div class="ux-escala"><span>' + txt + '</span><i>' + [1, 2, 3, 4, 5].map(k => '<b' + (k <= n ? ' class="on"' : '') + '></b>').join('') + '</i></div>';
    const estrellas = n => '<span class="ux-est" role="img" aria-label="Valoración ' + n.toString().replace('.', ',') + ' de 5"><i style="width:' + (n / 5 * 100) + '%"></i></span>';
    // "También como": el mismo modelo, en este mismo tamaño, en otros tipos (colchón / cama europea / box spring), con su precio.
    function tambien(i) {
        const otros = Cat.otrosTipos(i).filter(x => x.tipoKey !== i.tipoKey);
        return otros.length ? '<p class="hy-tambien">También como: ' + otros.map(o => '<a href="' + Cat.hrefPdp(RUTA, o) + '">' + o.tipo.nombre + ' ' + Cat.fmt(o.precio) + '</a>').join(' · ') + '</p>' : '';
    }
    const barra = (txt, n) => '<div class="hy-barra"><span>' + txt + '</span><i>' + [1, 2, 3, 4, 5].map(k => '<b' + (k <= n ? ' class="on"' : '') + '></b>').join('') + '</i></div>';
    const palabraBase = k => k.charAt(0).toUpperCase() + k.slice(1);

    // Tarjeta completa, a la manera de la del prototipo original: valoración, línea y modelo, tipo, base, tamaño, firmeza, barras,
    // precio, diferencia con el más económico y botón "Ver producto".
    // opciones: { comparar, vista, tambien, minPrecio (el precio más bajo de la lista, para mostrar la diferencia), extra }
    // En móvil (hasta 640 px) "Comparar" y "Vista rápida" van bajo el precio, para no tapar la foto (tapaban ≈40 % en una tarjeta de 163 px);
    // en pantallas más grandes siguen sobre la foto. El CSS muestra una u otra copia.
    const accionesAbajo = (i, o, on) => (o.comparar || o.vista) ? '<div class="hy-acc-m">' +
        (o.vista ? '<button type="button" class="hy-acc-vista" data-vista="' + i.id + '">Vista rápida</button>' : '') +
        (o.comparar ? '<label class="hy-acc-comp"><input type="checkbox" data-comparar="' + i.id + '"' + (on ? ' checked' : '') + '> Comparar</label>' : '') + '</div>' : '';
    function tarjetaCompleta(i, o) {
        o = o || {};
        const on = Cat.comparador.tiene(i.id);
        const bases = i.base ? Object.keys(i.base) : [];
        const baseDef = bases.includes('completa') ? 'completa' : bases[0];
        const href = Cat.hrefPdp(RUTA, i, baseDef ? { base: baseDef } : null);
        const p = baseDef && i.base[baseDef].precio ? { precio: i.base[baseDef].precio, normal: i.base[baseDef].precioNormal || i.base[baseDef].precio } : { precio: i.precio, normal: i.precioNormal };
        const dto = p.normal > p.precio ? Math.round((1 - p.precio / p.normal) * 100) : 0;
        const delta = o.minPrecio ? (p.precio === o.minPrecio ? '<span class="hy-delta hy-delta-min">El más económico</span>' : '<span class="hy-delta">+' + Cat.fmt(p.precio - o.minPrecio) + ' vs. el más económico</span>') : '';
        return '<article class="ux-card hy-rica' + (on ? ' en-comparador' : '') + '" data-id="' + i.id + '" data-href="' + Cat.esc(href) + '">' +
            '<div class="ux-card-img"><img src="' + i.imagen + '" alt="" loading="lazy" decoding="async">' +
            '<span class="ux-dto"' + (dto ? '' : ' hidden') + '>' + dto + '%</span>' +
            (o.comparar ? '<label class="ux-comparar"><input type="checkbox" data-comparar="' + i.id + '"' + (on ? ' checked' : '') + '> Comparar</label>' : '') +
            (o.vista ? '<button type="button" class="ux-vista" data-vista="' + i.id + '">Vista rápida</button>' : '') + '</div>' +
            '<div class="ux-card-c">' +
            '<div class="hy-val">' + estrellas(i.calificacion) + '<span>' + i.resenas.toLocaleString('es-CL') + ' reseñas</span></div>' +
            '<span class="ux-linea">' + i.linea + '</span>' +
            '<h3><a href="' + Cat.esc(href) + '">' + Cat.esc(i.nombreCompleto) + '</a></h3>' +
            (bases.length ? '<div class="hy-fila"><span class="hy-fila-t">Base</span><div class="hy-chips" role="group" aria-label="Base">' + bases.map(k => '<button type="button" class="hy-chip hy-chip-op' + (k === baseDef ? ' sel' : '') + '" data-base="' + k + '" data-precio="' + (i.base[k].precio || i.precio) + '" data-normal="' + (i.base[k].precioNormal || i.base[k].precio || i.precioNormal) + '"' + (i.base[k].imagen ? ' data-img="' + Cat.esc(i.base[k].imagen) + '"' : '') + ' aria-pressed="' + (k === baseDef) + '">' + palabraBase(k) + '</button>').join('') + '</div></div>' : '') +
            '<div class="hy-fila"><span class="hy-fila-t">Tamaño</span><span class="hy-chip">' + Cat.esc(i.dimensiones) + '</span></div>' +
            '<div class="hy-fila"><span class="hy-fila-t">Firmeza</span><span class="hy-chip">' + i.firmeza + '</span></div>' +
            '<div class="hy-barras">' + barra('Firmeza', i.firmezaN) + barra('Adaptación', i.adaptacion) + '</div>' +
            '<p class="ux-precio" data-precio="' + p.precio + '">' + Cat.fmt(p.precio) + (dto ? '<s>' + Cat.fmt(p.normal) + '</s>' : '') + '</p>' + delta +
            '<a class="v-btn v-btn-primario hy-cta" href="' + Cat.esc(href) + '">Ver producto</a>' + accionesAbajo(i, o, on) +
            (o.tambien ? tambien(i) : '') + (o.extra || '') + '</div></article>';
    }

    // Tarjeta limpia: foto, línea y valoración, nombre, una sola línea de datos y precio. Todo lo demás (barras, base, "también como",
    // diferencia de precio) vive en la vista rápida y en la ficha. La tarjeta entera es el enlace a la ficha.
    function tarjetaLimpia(i, o) {
        o = o || {};
        const on = Cat.comparador.tiene(i.id);
        const bases = i.base ? Object.keys(i.base) : [];
        const baseDef = bases.includes('completa') ? 'completa' : bases[0];
        const precios = bases.map(k => i.base[k].precio).filter(Boolean);
        const variable = precios.length > 1 && Math.min(...precios) !== Math.max(...precios);
        const precio = precios.length ? Math.min(...precios) : i.precio;
        const normal = precios.length ? (i.base[baseDef].precioNormal || i.base[baseDef].precio) : i.precioNormal;
        const dto = normal > precio ? Math.round((1 - precio / normal) * 100) : 0;
        const href = Cat.hrefPdp(RUTA, i, baseDef ? { base: baseDef } : null);
        const barato = o.minPrecio && precio === o.minPrecio;
        return '<article class="ux-card hy-limpia' + (on ? ' en-comparador' : '') + '" data-id="' + i.id + '">' +
            '<div class="ux-card-img"><img src="' + i.imagen + '" alt="" loading="lazy" decoding="async">' +
            (dto ? '<span class="ux-dto">' + dto + '%</span>' : '') + (barato ? '<span class="hy-barato">El más económico</span>' : '') +
            (o.comparar ? '<label class="ux-comparar hy-comp"><input type="checkbox" data-comparar="' + i.id + '"' + (on ? ' checked' : '') + '> <span>Comparar</span></label>' : '') +
            (o.vista ? '<button type="button" class="ux-vista" data-vista="' + i.id + '">Vista rápida</button>' : '') + '</div>' +
            '<div class="ux-card-c">' +
            '<div class="hy-val">' + estrellas(i.calificacion) + '<span>' + i.resenas.toLocaleString('es-CL') + ' reseñas</span></div>' +
            '<span class="ux-linea">' + i.linea + '</span>' +
            '<h3><a href="' + Cat.esc(href) + '">' + Cat.esc(i.nombreCompleto) + '</a></h3>' +
            '<p class="ux-precio">' + (variable ? '<small>Desde</small> ' : '') + Cat.fmt(precio) + (dto ? '<s>' + Cat.fmt(normal) + '</s>' : '') + '</p>' + accionesAbajo(i, o, on) +
            (o.tambien && tambien(i) ? tambien(i) : '') + (o.extra || '') + '</div></article>';
    }
    const tarjeta = (i, o) => (CARD === 'completa' ? tarjetaCompleta : tarjetaLimpia)(i, o);
    // Elegir otra base (completa / dividida): cambia el precio, el descuento, la foto y el enlace de esa tarjeta
    document.addEventListener('click', ev => {
        const b = ev.target.closest('.hy-chip-op'); if (!b) return;
        const card = b.closest('.ux-card'); const precio = parseInt(b.dataset.precio, 10), normal = parseInt(b.dataset.normal, 10) || precio;
        card.querySelectorAll('.hy-chip-op').forEach(x => { x.classList.toggle('sel', x === b); x.setAttribute('aria-pressed', x === b); });
        const pEl = card.querySelector('.ux-precio'); pEl.dataset.precio = precio; pEl.innerHTML = Cat.fmt(precio) + (normal > precio ? '<s>' + Cat.fmt(normal) + '</s>' : '');
        const d = card.querySelector('.ux-dto'); d.hidden = !(normal > precio); d.textContent = '' + Math.round((1 - precio / normal) * 100) + '%';
        if (b.dataset.img) card.querySelector('.ux-card-img img').src = b.dataset.img;
        const q = new URL(card.dataset.href, document.baseURI); q.searchParams.set('base', b.dataset.base);
        const nuevo = Cat.relativa(q.href); card.dataset.href = nuevo; card.querySelectorAll('h3 a, .hy-cta').forEach(a => a.setAttribute('href', nuevo));
    });
    // Fotos de un producto: la principal del catálogo y las 2 adicionales de data/galerias.js (si existen)
    function fotos(i) {
        // clave: código de 8 dígitos de la foto o, si no lo tiene, el nombre del archivo sin extensión
        const m = /images\/productos\/(\d{8})-/.exec(i.imagen || '') || /images\/productos\/([^/]+)\.webp$/.exec(i.imagen || '');
        const extra = (typeof GALERIAS !== 'undefined' && m && GALERIAS[m[1]]) || [];
        return [i.imagen].concat(extra.filter(x => x !== i.imagen));
    }
    // Ícono de tarjeta de crédito (decorativo) para el texto de las cuotas
    const iconoTarjeta = '<svg class="hy-ico-cuotas" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 15h4"/></svg>';
    return { RUTA, dim, escala, estrellas, tarjeta, fotos, iconoTarjeta };
})();
