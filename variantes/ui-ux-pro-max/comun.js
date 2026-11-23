/* Piezas que comparten las tres páginas de la opción UI UX Pro Max: tarjeta, escalas y estrellas. */
const UX = (() => {
    const RUTA = 'variantes/ui-ux-pro-max/';
    const dim = x => x.replace(' x ', ' × ').replace('cm', ' cm');
    const escala = (txt, n) => '<div class="ux-escala"><span>' + txt + '</span><i>' + [1, 2, 3, 4, 5].map(k => '<b' + (k <= n ? ' class="on"' : '') + '></b>').join('') + '</i></div>';
    const estrellas = n => '<span class="ux-est" role="img" aria-label="Valoración ' + n.toString().replace('.', ',') + ' de 5"><i style="width:' + (n / 5 * 100) + '%"></i></span>';
    // opciones: { comparar, vista, extra }
    function tarjeta(i, o) {
        o = o || {};
        const on = Cat.comparador.tiene(i.id);
        return '<article class="ux-card' + (on ? ' en-comparador' : '') + '" data-id="' + i.id + '">' +
            '<div class="ux-card-img"><img src="' + i.imagen + '" alt="" loading="lazy" decoding="async">' +
            (i.descuento ? '<span class="ux-dto">−' + i.descuento + '%</span>' : '') +
            (o.comparar ? '<label class="ux-comparar"><input type="checkbox" data-comparar="' + i.id + '"' + (on ? ' checked' : '') + '> Comparar</label>' : '') +
            (o.vista ? '<button type="button" class="ux-vista" data-vista="' + i.id + '">Vista rápida</button>' : '') + '</div>' +
            '<div class="ux-card-c"><span class="ux-linea">' + i.linea + ' · ' + Cat.esc(i.nombre) + '</span>' +
            '<h3><a href="' + Cat.hrefPdp(RUTA, i) + '">' + Cat.esc(i.nombreCompleto) + '</a></h3>' +
            '<p class="ux-meta">Firmeza ' + Cat.palabraFirmeza(i.firmezaN) + ' · ' + i.tamanoLabel + '</p>' +
            '<p class="ux-precio">' + Cat.fmt(i.precio) + (i.descuento ? '<s>' + Cat.fmt(i.precioNormal) + '</s>' : '') + '</p>' + (o.extra || '') + '</div></article>';
    }
    return { RUTA, dim, escala, estrellas, tarjeta };
})();
