/* Capa de datos compartida de las variantes de rediseño (variantes/frontend-design y variantes/ui-ux-pro-max).
   Usa el mismo catálogo que el prototipo original (data/modelos.js) y no inventa datos: solo lo reordena para consultarlo
   (filtrar, comparar, buscar otros tamaños o alternativas) y guarda el comparador y el carro en el navegador.
   Se carga después de data/modelos.js. Todas las rutas son relativas a la raíz del prototipo (<base href="../../">). */
const Cat = (() => {
    const TIPOS = [
        { key: 'camaEuropea', url: 'cama-europea', nombre: 'Cama europea', plural: 'Camas europeas' },
        { key: 'boxSpring', url: 'box-spring', nombre: 'Box spring', plural: 'Box spring' },
        { key: 'colchon', url: 'colchon', nombre: 'Colchón', plural: 'Colchones' }
    ];
    const TAMANOS = [
        { id: '1-plaza', label: '1 Plaza', personas: '1 persona' },
        { id: '1-5-plazas', label: '1,5 Plazas', personas: '1 persona con más espacio' },
        { id: 'full', label: 'Full', personas: '2 personas, espacio compacto' },
        { id: '2-plazas', label: '2 Plazas', personas: '2 personas' },
        { id: 'queen', label: 'Queen', personas: '2 personas, más espacio' },
        { id: 'king', label: 'King', personas: '2 personas, máximo espacio' },
        { id: 'super-king', label: 'Super King', personas: '2 personas y niños' }
    ].map(t => {
        const b = modelosData.find(d => d.tamano === t.id);
        return Object.assign(t, { dimensiones: b ? b.dimensiones : '' });
    });
    const LINEAS = ['Línea Esencial', 'Línea Premium', 'Línea Advantage', 'Selección Excelsior'];
    const LINEA_CORTA = { 'Línea Esencial': 'Esencial', 'Línea Premium': 'Premium', 'Línea Advantage': 'Advantage', 'Selección Excelsior': 'Excelsior' };
    const TEXTO_LINEA = {
        'Línea Esencial': 'Todo lo necesario para un descanso de calidad: adaptabilidad, resistencia y buenos materiales. Una gran y conveniente elección.',
        'Línea Premium': 'La Línea Premium agrupa colchones que sobresalen por incorporar más tecnología como los resortes pocket advance, espumas zonificadas; diseños y propiedades que brindan mayor adaptabilidad al cuerpo, soporte y comodidad para un máximo descanso.',
        'Línea Advantage': 'Materiales de altísima calidad e innovaciones tecnológicas únicas en cada modelo. Se adapta a tu cuerpo, con gran soporte y máximo confort.',
        'Selección Excelsior': 'Las mejores tecnologías y materiales premium del catálogo. Sensaciones únicas de descanso, con adaptabilidad, soporte y durabilidad sin precedentes.'
    };
    const FIRMEZAS = ['suave', 'intermedio', 'firme'];
    const tipoPorKey = k => TIPOS.find(t => t.key === k);
    const tipoPorUrl = u => TIPOS.find(t => t.url === u);

    const fmt = n => '$' + Number(n).toLocaleString('es-CL');
    const slug = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    // Un "ítem" es un producto concreto: modelo + tipo + tamaño + línea.
    let _items = null;
    function items() {
        if (_items) return _items;
        _items = [];
        modelosData.forEach(d => {
            Object.keys(d.porFirmeza).forEach(f => {
                d.porFirmeza[f].forEach(m => {
                    TIPOS.forEach(t => {
                        const v = m[t.key];
                        if (v === undefined) return;
                        const p = RosenModelos.precioDe(m, t.key, d.dimensiones);
                        const semilla = t.key + '-' + m.nombre;
                        const base = t.key === 'camaEuropea' && m.detalle && m.detalle.camaEuropea && m.detalle.camaEuropea.base;
                        _items.push({
                            id: [d.tamano, slug(d.linea), slug(m.nombre), t.url].join('~'),
                            m, v, d,
                            nombre: m.nombre,
                            nombreCompleto: t.nombre + ' ' + m.nombre,
                            tipoKey: t.key, tipo: t,
                            linea: d.linea, lineaCorta: LINEA_CORTA[d.linea],
                            tamano: d.tamano, tamanoLabel: d.tamanoLabel, dimensiones: d.dimensiones,
                            firmeza: f, firmezaN: m.firmeza, adaptacion: m.adaptacion,
                            precio: p.precio, precioNormal: p.precioNormal,
                            descuento: p.precioNormal && p.precioNormal > p.precio ? Math.round((1 - p.precio / p.precioNormal) * 100) : 0,
                            imagen: v.imagen,
                            base: base && !Array.isArray(base) && Object.keys(base).length ? base : null,
                            calificacion: calificacionFija(semilla),
                            resenas: resenasFijas(semilla)
                        });
                    });
                });
            });
        });
        return _items;
    }
    const porId = id => items().find(i => i.id === id);

    // filtros: { tamano, tipo (url), firmeza: [..], linea: [..], max, min }
    function filtrar(f) {
        f = f || {};
        return items().filter(i =>
            (!f.tamano || i.tamano === f.tamano) &&
            (!f.tipo || i.tipo.url === f.tipo) &&
            (!f.firmeza || !f.firmeza.length || f.firmeza.includes(i.firmeza)) &&
            (!f.linea || !f.linea.length || f.linea.includes(i.linea)) &&
            (!f.max || i.precio <= f.max) &&
            (!f.min || i.precio >= f.min));
    }
    function minimo(lista) { return lista.length ? Math.min(...lista.map(i => i.precio)) : null; }
    function maximo(lista) { return lista.length ? Math.max(...lista.map(i => i.precio)) : null; }

    // Ordenar: relevancia (modelos con más adaptación y mejor valoración primero), menor, mayor, descuento, az
    function ordenar(lista, orden) {
        const l = lista.slice();
        const cmp = {
            menor: (a, b) => a.precio - b.precio,
            mayor: (a, b) => b.precio - a.precio,
            descuento: (a, b) => b.descuento - a.descuento,
            az: (a, b) => a.nombre.localeCompare(b.nombre, 'es'),
            relevancia: (a, b) => (b.calificacion - a.calificacion) || (a.precio - b.precio)
        }[orden] || null;
        return cmp ? l.sort(cmp) : l;
    }

    // Enlaces. `ruta` es la carpeta de la variante, p. ej. 'variantes/frontend-design/'.
    function hrefPdp(ruta, i, extra) {
        const q = new URLSearchParams({ modelo: i.nombre, tipo: i.tipo.url, tamano: i.tamano, linea: i.linea, firmeza: i.firmeza, medida: i.dimensiones });
        Object.entries(extra || {}).forEach(([k, v]) => q.set(k, v));
        return ruta + 'pdp.html?' + q.toString();
    }
    const lleno = v => Array.isArray(v) ? v.length > 0 : (v !== undefined && v !== null && v !== '' && v !== 0);
    function hrefLineas(ruta, f) {
        const q = new URLSearchParams();
        Object.entries(f || {}).forEach(([k, v]) => { if (lleno(v)) q.set(k, Array.isArray(v) ? v.join(',') : v); });
        const s = q.toString();
        return ruta + 'lineas.html' + (s ? '?' + s : '');
    }

    // El mismo modelo, mismo tipo y línea, en otros tamaños (para cambiar de tamaño sin volver al listado).
    function otrosTamanos(i) {
        return TAMANOS.map(t => items().find(x => x.nombre === i.nombre && x.tipoKey === i.tipoKey && x.linea === i.linea && x.tamano === t.id)).filter(Boolean);
    }
    // El mismo modelo y tamaño en otros tipos (cama europea, box spring, colchón).
    function otrosTipos(i) {
        return TIPOS.map(t => items().find(x => x.nombre === i.nombre && x.tipoKey === t.key && x.tamano === i.tamano && x.linea === i.linea)).filter(Boolean);
    }
    // Alternativas cercanas: mismo tipo y tamaño, otros modelos; se ordenan por cercanía de precio.
    function alternativas(i, n) {
        return items()
            .filter(x => x.tamano === i.tamano && x.tipoKey === i.tipoKey && x.id !== i.id)
            .sort((a, b) => Math.abs(a.precio - i.precio) - Math.abs(b.precio - i.precio))
            .slice(0, n || 4);
    }

    // Texto de firmeza / adaptación en palabras
    const palabraFirmeza = n => n <= 2 ? 'suave' : (n <= 4 ? 'intermedia' : 'firme');
    const palabraAdapt = n => n <= 2 ? 'baja' : (n === 3 ? 'media' : 'alta');
    function descripcion(i) {
        return i.nombreCompleto + ' pertenece a la ' + i.linea + '. ' + (TEXTO_LINEA[i.linea] || '') +
            ' Firmeza ' + palabraFirmeza(i.firmezaN) + ' (' + i.firmezaN + ' de 5) y adaptación ' + palabraAdapt(i.adaptacion) + ' (' + i.adaptacion + ' de 5): valores referenciales del prototipo.';
    }

    // ---- Estado compartido en el navegador (comparador y carro) ----
    // El carro, el comparador y la última lista son propios de cada opción (no se mezclan entre frontend-design y ui-ux-pro-max)
    const ESPACIO = location.pathname.indexOf('/ui-ux-pro-max/') >= 0 ? 'ux' : (location.pathname.indexOf('/hibrida/') >= 0 ? 'hy' : 'fd');
    const clave = k => k + '-' + ESPACIO;
    const leer = (k, def) => { try { return JSON.parse(localStorage.getItem(clave(k))) || def; } catch (e) { return def; } };
    const guardar = (k, v) => { try { localStorage.setItem(clave(k), JSON.stringify(v)); } catch (e) {} };
    const avisar = nombre => document.dispatchEvent(new CustomEvent(nombre));

    const comparador = {
        MAX: 3,
        lista: () => leer('rosenVarComparar', []).filter(porId),
        tiene: id => comparador.lista().includes(id),
        alternar(id) {
            let l = comparador.lista();
            if (l.includes(id)) l = l.filter(x => x !== id);
            else if (l.length < comparador.MAX) l.push(id);
            else return false;
            guardar('rosenVarComparar', l); avisar('comparador:cambio'); return true;
        },
        quitar(id) { guardar('rosenVarComparar', comparador.lista().filter(x => x !== id)); avisar('comparador:cambio'); },
        vaciar() { guardar('rosenVarComparar', []); avisar('comparador:cambio'); }
    };

    const carro = {
        lista: () => leer('rosenVarCarro', []),
        agregar(i, opciones) {
            opciones = opciones || {};
            const medida = opciones.medida || i.dimensiones;
            const base = opciones.base || null;
            const key = i.id + '|' + medida + '|' + (base || '');
            const l = carro.lista();
            const ex = l.find(x => x.key === key);
            if (ex) ex.qty += (opciones.qty || 1);
            else l.push({ key, id: i.id, nombre: i.nombreCompleto, medida, base, precio: opciones.precio || i.precio, precioNormal: opciones.precioNormal || i.precioNormal, imagen: opciones.imagen || i.imagen, qty: opciones.qty || 1 });
            guardar('rosenVarCarro', l); avisar('carro:cambio');
        },
        cambiar(key, delta) {
            const l = carro.lista(); const x = l.find(y => y.key === key); if (!x) return;
            x.qty += delta;
            guardar('rosenVarCarro', l.filter(y => y.qty > 0)); avisar('carro:cambio');
        },
        cantidad: () => carro.lista().reduce((s, x) => s + x.qty, 0),
        total: () => carro.lista().reduce((s, x) => s + x.qty * x.precio, 0)
    };

    // Parámetros de URL leídos y escritos de forma uniforme
    function leerUrl() {
        const q = new URLSearchParams(location.search);
        const lista = k => (q.get(k) || '').split(',').map(s => s.trim()).filter(Boolean);
        return {
            // un valor que no existe (por ejemplo, de un enlace mal copiado) se ignora en vez de romper la página
            tamano: TAMANOS.some(t => t.id === q.get('tamano')) ? q.get('tamano') : '', tipo: tipoPorUrl(q.get('tipo')) ? q.get('tipo') : '',
            firmeza: lista('firmeza').filter(f => FIRMEZAS.includes(f)),
            linea: lista('linea'), max: parseInt(q.get('max'), 10) || 0, min: parseInt(q.get('min'), 10) || 0, orden: q.get('orden') || 'relevancia'
        };
    }
    // Escribe el estado de los filtros en la URL sin tocar los demás parámetros (por ejemplo ?envio=b o ?card=completa)
    function escribirUrl(estado) {
        const q = new URLSearchParams(location.search);
        Object.entries(estado).forEach(([k, v]) => {
            if (lleno(v) && !(k === 'orden' && v === 'relevancia')) q.set(k, Array.isArray(v) ? v.join(',') : v); else q.delete(k);
        });
        const s = q.toString();
        history.replaceState(null, '', location.pathname + (s ? '?' + s : ''));
    }

    // La última lista de resultados que viste: la ficha vuelve exactamente ahí, con tus filtros.
    function recordarLista() {
        try { sessionStorage.setItem(clave('rosenVarLista'), location.pathname + location.search); } catch (e) {}
        const a = document.querySelector('.v-nav a[aria-current="page"]');
        if (a && /lineas\.html/.test(location.pathname)) a.setAttribute('href', location.pathname + location.search);
    }
    // La búsqueda actual (tipo, tamaño, firmeza, presupuesto): la actualizan la Guía, Modelos y la ficha, y los enlaces a la Guía la llevan.
    // El 25,7 % de quienes ven Líneas vuelve a la Guía en 30 minutos (GA4, 22-03 a 20-06-2026): al volver, la Guía retoma lo elegido.
    function busquedaGuardada() { try { return JSON.parse(sessionStorage.getItem(clave('rosenVarBusqueda'))) || null; } catch (e) { return null; } }
    function hrefGuia(ruta) {
        const b = busquedaGuardada(); if (!b) return ruta + 'guia.html';
        const q = new URLSearchParams();
        if (b.tamano) q.set('tamano', b.tamano);
        if (b.tipo) q.set('tipo', b.tipo);
        if (b.firmeza && b.firmeza.length === 1) q.set('firmeza', b.firmeza[0]);   // la Guía admite una sola firmeza
        if (b.max) q.set('max', b.max);                                                // un tope que la Guía no ofrece se lee como "sin tope"
        const s = q.toString();
        return ruta + 'guia.html' + (s ? '?' + s : '');
    }
    function guardarBusqueda(parcial) {
        const b = Object.assign(busquedaGuardada() || {}, parcial);
        try { sessionStorage.setItem(clave('rosenVarBusqueda'), JSON.stringify(b)); } catch (e) {}
        document.querySelectorAll('a[data-guia]').forEach(a => a.setAttribute('href', hrefGuia(a.dataset.guia)));
        document.querySelectorAll('a[data-modelos]').forEach(a => a.setAttribute('href', hrefModelos(a.dataset.modelos)));
    }
    // "Modelos" (navegación y miga): vuelve a la última lista que viste, con su línea y su orden, si sigue siendo la búsqueda actual.
    // Si en la Guía o en la ficha cambiaste tamaño, tipo, firmeza o presupuesto, abre la lista de la búsqueda nueva.
    function hrefModelos(ruta) {
        const b = busquedaGuardada();
        let u = null; try { u = sessionStorage.getItem(clave('rosenVarLista')); } catch (e) {}
        if (u && u.indexOf(ruta) < 0) u = null;
        if (!b) return u ? relativa(u) : hrefLineas(ruta, { tamano: '2-plazas' });
        if (u) {
            const q = new URL(u, document.baseURI).searchParams;
            const firmezas = v => (Array.isArray(v) ? v : String(v || '').split(',')).filter(Boolean).sort().join(',');
            if ((q.get('tamano') || '') === (b.tamano || '') && (q.get('tipo') || '') === (b.tipo || '')
                && firmezas(q.get('firmeza')) === firmezas(b.firmeza) && (parseInt(q.get('max'), 10) || 0) === (b.max || 0)) return relativa(u);
        }
        return hrefLineas(ruta, { tamano: b.tamano || '2-plazas', tipo: b.tipo, firmeza: b.firmeza, max: b.max });
    }
    // Pasa una dirección del sitio a ruta relativa a la raíz del prototipo (la del <base href="../../">).
    // Sirve igual en local (raíz "/") y en GitHub Pages (raíz "/ux-camas-colchones-2026/"); quitar solo la "/" inicial duplicaba la carpeta en Pages.
    function relativa(u) {
        const url = new URL(u, document.baseURI), raiz = new URL(document.baseURI).pathname;
        return (url.pathname.indexOf(raiz) === 0 ? url.pathname.slice(raiz.length) : url.pathname.replace(/^\//, '')) + url.search;
    }
    function listaGuardada(ruta, alternativa) {
        try { const u = sessionStorage.getItem(clave('rosenVarLista')); if (u && u.indexOf(ruta) >= 0) return relativa(u); } catch (e) {}
        return alternativa || hrefLineas(ruta, { tamano: '2-plazas' });
    }

    const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

    return { TIPOS, TAMANOS, LINEAS, LINEA_CORTA, TEXTO_LINEA, FIRMEZAS, tipoPorKey, tipoPorUrl, fmt, slug, esc, items, porId, filtrar, minimo, maximo, ordenar,
        hrefPdp, hrefLineas, recordarLista, listaGuardada, relativa, hrefGuia, hrefModelos, busquedaGuardada, guardarBusqueda, otrosTamanos, otrosTipos, alternativas, palabraFirmeza, palabraAdapt, descripcion, comparador, carro, leerUrl, escribirUrl };
})();
