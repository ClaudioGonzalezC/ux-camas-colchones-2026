/* Piezas que comparten las tres páginas de la opción frontend-design: tarjeta de producto, barras de firmeza y estrellas. */
const FD = (() => {
    const RUTA = 'variantes/frontend-design/';

    function barras(i) {
        const fila = (txt, n) => '<div class="fd-barra"><span>' + txt + '</span><i>' + [1, 2, 3, 4, 5].map(k => '<b' + (k <= n ? ' class="on"' : '') + '></b>').join('') + '</i></div>';
        return '<div class="fd-barras">' + fila('Firmeza', i.firmezaN) + fila('Adaptación', i.adaptacion) + '</div>';
    }
    function estrellas(n) { return '<span class="fd-estrellas" role="img" aria-label="Valoración ' + n.toString().replace('.', ',') + ' de 5"><i style="width:' + (n / 5 * 100) + '%"></i></span>'; }

    // opciones: { comparar: bool, tambien: bool, clase: '' }
    function tarjeta(i, opciones) {
        opciones = opciones || {};
        const otros = opciones.tambien === false ? [] : Cat.otrosTipos(i).filter(x => x.tipoKey !== i.tipoKey);
        const enComp = Cat.comparador.tiene(i.id);
        return '<article class="fd-card' + (enComp ? ' en-comparador' : '') + (opciones.clase ? ' ' + opciones.clase : '') + '" data-id="' + i.id + '">' +
            '<div class="fd-card-img"><img src="' + i.imagen + '" alt="" loading="lazy" decoding="async">' +
            (i.descuento ? '<span class="fd-dto">−' + i.descuento + '%</span>' : '') +
            (opciones.comparar ? '<label class="fd-comparar"><input type="checkbox" data-comparar="' + i.id + '"' + (enComp ? ' checked' : '') + '> Comparar</label>' : '') + '</div>' +
            '<div class="fd-card-cuerpo"><span class="fd-linea">' + i.linea + '</span>' +
            '<h3><a href="' + Cat.hrefPdp(RUTA, i) + '">' + Cat.esc(i.nombreCompleto) + '</a></h3>' +
            '<div class="fd-meta"><span class="fd-chip">Firmeza ' + Cat.palabraFirmeza(i.firmezaN) + '</span><span class="fd-chip">' + i.tamanoLabel + '</span></div>' +
            (opciones.barras === false ? '' : barras(i)) +
            '<p class="fd-precio">' + Cat.fmt(i.precio) + (i.descuento ? '<s>' + Cat.fmt(i.precioNormal) + '</s>' : '') + '</p>' +
            (otros.length ? '<p class="fd-tambien">También: ' + otros.map(o => '<a href="' + Cat.hrefPdp(RUTA, o) + '">' + o.tipo.nombre.toLowerCase() + ' ' + Cat.fmt(o.precio) + '</a>').join(' · ') + '</p>' : '') +
            (opciones.extra || '') + '</div></article>';
    }
    return { RUTA, tarjeta, barras, estrellas };
})();
