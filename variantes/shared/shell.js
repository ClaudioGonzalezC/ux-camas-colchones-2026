/* Estructura común de las variantes: encabezado de Rosen (la misma imagen del prototipo), barra de navegación con el carro,
   cajón del carro y aviso breve. El aspecto lo define el CSS de cada variante (clases con prefijo v-). */
const Shell = (() => {
    function montar(cfg) {
        // cfg: { ruta, actual: 'guia'|'lineas'|'pdp', migas?: [[texto, href?]] }
        const ruta = cfg.ruta;
        const top = document.createElement('div');
        top.className = 'v-top';
        top.innerHTML =
            '<div class="v-top-wrap"><a class="v-top-img" href="' + ruta + 'guia.html" aria-label="Rosen, ir a la guía"><img src="images/header.webp" alt="Rosen — Camas y colchones" width="1600" height="152"></a>' +
            '<button type="button" class="v-carro-btn" id="vCarroBtn" aria-label="Abrir el carro"><span class="v-carro-n" id="vCarroN" hidden>0</span></button></div>' +
            '<div class="v-bar"><nav class="v-bar-in" aria-label="Navegación">' +
            '<ol class="v-migas">' + (cfg.migas || []).map(m => '<li>' + (m[1] ? '<a href="' + m[1] + '">' + Cat.esc(m[0]) + '</a>' : '<span aria-current="page">' + Cat.esc(m[0]) + '</span>') + '</li>').join('') + '</ol>' +
            '<ul class="v-nav" aria-label="Secciones">' +
            '<li><a href="' + ruta + 'guia.html"' + (cfg.actual === 'guia' ? ' aria-current="page"' : '') + '>Guía</a></li>' +
            '<li><a href="' + Cat.listaGuardada(ruta) + '"' + (cfg.actual === 'lineas' ? ' aria-current="page"' : '') + '>Modelos</a></li></ul>' +
            ''+
            '</div></nav></div>';
        document.body.insertBefore(top, document.body.firstChild);
        if (cfg.guiaConBusqueda) top.querySelectorAll('a').forEach(a => { if (/guia\.html(\?|$)/.test(a.getAttribute('href') || '')) { a.dataset.guia = ruta; a.setAttribute('href', Cat.hrefGuia(ruta)); } });

        const foot = document.createElement('footer');
        foot.className = 'v-footer';
        foot.innerHTML = '<img src="images/footer.webp" alt="Rosen — pie de página" width="1600" height="548" loading="lazy" decoding="async">';
        document.body.appendChild(foot);

        const cajon = document.createElement('div');
        cajon.innerHTML =
            '<div class="v-overlay" id="vCarroOverlay" hidden></div>' +
            '<aside class="v-cajon" id="vCajon" role="dialog" aria-modal="true" aria-label="Carro de compras" hidden>' +
            '<div class="v-cajon-h"><h2>Tu carro <span id="vCajonN"></span></h2><button type="button" class="v-cajon-x" id="vCajonX" aria-label="Cerrar el carro">×</button></div>' +
            '<div class="v-cajon-items" id="vCajonItems"></div><div class="v-cajon-sug" id="vCajonSug" hidden></div>' +
            '<div class="v-cajon-f"><div class="v-cajon-total"><span>Total</span><strong id="vCajonTotal"></strong></div><button type="button" class="v-btn v-btn-primario v-btn-full" id="vCajonPagar">Finalizar compra</button></div>' +
            '</aside><div class="v-aviso" id="vAviso" role="status" aria-live="polite" hidden></div>';
        document.body.appendChild(cajon);

        const abrir = () => { dibujarCarro(); document.getElementById('vCajon').hidden = false; document.getElementById('vCarroOverlay').hidden = false; document.getElementById('vCajonX').focus(); document.documentElement.classList.add('v-sin-scroll'); };
        const cerrar = () => { document.getElementById('vCajon').hidden = true; document.getElementById('vCarroOverlay').hidden = true; document.documentElement.classList.remove('v-sin-scroll'); document.getElementById('vCarroBtn').focus(); };
        document.getElementById('vCarroBtn').addEventListener('click', abrir);
        document.getElementById('vCajonX').addEventListener('click', cerrar);
        document.getElementById('vCarroOverlay').addEventListener('click', cerrar);
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && !document.getElementById('vCajon').hidden) cerrar(); });
        document.getElementById('vCajonItems').addEventListener('click', e => {
            const b = e.target.closest('[data-delta]');
            if (b) Cat.carro.cambiar(b.dataset.key, parseInt(b.dataset.delta, 10));
        });
        document.getElementById('vCajonPagar').addEventListener('click', () => aviso('Esto es un prototipo: aquí continuaría el pago.'));
        document.addEventListener('carro:cambio', () => { contador(); if (!document.getElementById('vCajon').hidden) dibujarCarro(); });
        contador();
        return { abrirCarro: abrir };
    }

    function contador() {
        const n = Cat.carro.cantidad(); const el = document.getElementById('vCarroN');
        if (!el) return; el.textContent = n; el.hidden = n === 0;
        document.getElementById('vCarroBtn').setAttribute('aria-label', 'Abrir el carro, ' + n + (n === 1 ? ' producto' : ' productos'));
    }
    function dibujarCarro() {
        const l = Cat.carro.lista();
        document.getElementById('vCajonN').textContent = l.length ? '(' + Cat.carro.cantidad() + ')' : '';
        document.getElementById('vCajonItems').innerHTML = l.length ? l.map(x =>
            '<div class="v-item"><img src="' + x.imagen + '" alt="" width="72" height="72"><div class="v-item-i"><p class="v-item-n">' + Cat.esc(x.nombre) + '</p><p class="v-item-m">' + Cat.esc(x.medida) + (x.base ? ' · base ' + Cat.esc(x.base) : '') + '</p>' +
            '<p class="v-item-p">' + Cat.fmt(x.precio) + (x.precioNormal && x.precioNormal > x.precio ? ' <s>' + Cat.fmt(x.precioNormal) + '</s>' : '') + '</p></div>' +
            '<div class="v-qty"><button type="button" data-key="' + Cat.esc(x.key) + '" data-delta="-1" aria-label="Quitar uno">−</button><span>' + x.qty + '</span><button type="button" data-key="' + Cat.esc(x.key) + '" data-delta="1" aria-label="Agregar uno">+</button></div></div>').join('')
            : '<p class="v-vacio">Tu carro está vacío. Elige un producto y agrégalo desde su ficha.</p>';
        const sug = document.getElementById('vCajonSug');
        if (sug) { sug.innerHTML = sugerencias; sug.hidden = !l.length || !sugerencias; }
        document.getElementById('vCajonTotal').textContent = Cat.fmt(Cat.carro.total());
        document.getElementById('vCajonPagar').disabled = !l.length;
    }
    // Texto (HTML) opcional que se muestra bajo los productos del carro, por ejemplo accesorios para completar la compra
    let sugerencias = '';
    function sugerir(html) { sugerencias = html || ''; }
    let _t;
    function aviso(texto) {
        const el = document.getElementById('vAviso'); if (!el) return;
        el.textContent = texto; el.hidden = false; clearTimeout(_t); _t = setTimeout(() => { el.hidden = true; }, 3200);
    }
    return { montar, aviso, sugerir };
})();
