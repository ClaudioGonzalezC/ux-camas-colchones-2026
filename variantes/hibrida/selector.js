/* Selector propio de la opción 3: lo usan la Guía (panel de búsqueda) y Modelos (ordenar por). */
const selectsPropios = [];
// Selector propio: mismo <select> por debajo (la lógica no cambia), con una lista a medida.
// Si se le pasa `permitido(valor)`, solo ofrece las opciones que lo cumplen (la elegida siempre se muestra).
// `ayudas` es un objeto { valor: 'texto breve' } que se muestra bajo cada opción.
function selectorPropio(sel, lblId, permitido, ayudas) {
    permitido = permitido || (() => true); ayudas = ayudas || {};
    const caja = document.createElement('div'); caja.className = 'hy-sel';
    sel.parentNode.insertBefore(caja, sel); caja.appendChild(sel); sel.classList.add('hy-sel-nativo'); sel.tabIndex = -1; sel.setAttribute('aria-hidden', 'true');
    const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'hy-sel-btn'; btn.id = sel.id + 'Btn';
    btn.setAttribute('aria-haspopup', 'listbox'); btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-labelledby', lblId + ' ' + btn.id);
    const lista = document.createElement('ul'); lista.className = 'hy-sel-lista'; lista.id = sel.id + 'Lista'; lista.setAttribute('role', 'listbox'); lista.setAttribute('aria-labelledby', lblId); lista.tabIndex = -1; lista.hidden = true;
    caja.append(btn, lista);
    let activo = 0, vis = [];   // vis: opciones visibles { i: posición en el <select>, x: <option> }
    const calcular = () => { vis = [...sel.options].map((x, i) => ({ i, x })).filter(o => o.i === sel.selectedIndex || permitido(o.x.value)); };
    function pintar() {
        calcular();
        const o = sel.options[sel.selectedIndex]; btn.innerHTML = '<span class="hy-sel-txt">' + Cat.esc(o ? o.text : '') + '</span><svg class="hy-sel-flecha" viewBox="0 0 12 8" width="12" height="8" aria-hidden="true"><path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
        lista.innerHTML = vis.map((v, k) => {
            const ay = ayudas[v.x.value];
            return '<li role="option" id="' + sel.id + 'O' + k + '" data-k="' + k + '" aria-selected="' + (v.i === sel.selectedIndex) + '"><span class="hy-opt-t">' + Cat.esc(v.x.text) + (ay ? '<small>' + Cat.esc(ay) + '</small>' : '') + '</span><svg class="hy-opt-ok" viewBox="0 0 16 12" width="16" height="12" aria-hidden="true"><path d="M1.5 6.5l4 4 9-9" fill="none" stroke="currentColor" stroke-width="2.2"/></svg></li>';
        }).join('');
        marcar(Math.max(0, vis.findIndex(v => v.i === sel.selectedIndex)));
    }
    // `teclado` = true solo cuando se navega con las flechas: ahí se desplaza la lista (nunca la página) para mantener visible la opción activa.
    // Con el mouse no se desplaza nada, para que las opciones no se muevan bajo el puntero mientras se hace clic.
    function marcar(k, teclado) {
        activo = Math.max(0, Math.min(vis.length - 1, k));
        lista.querySelectorAll('li').forEach((li, n) => li.classList.toggle('activo', n === activo));
        lista.setAttribute('aria-activedescendant', sel.id + 'O' + activo);
        const li = lista.children[activo];
        if (teclado && li && !lista.hidden) { const t = li.offsetTop, b = t + li.offsetHeight; if (t < lista.scrollTop) lista.scrollTop = t; else if (b > lista.scrollTop + lista.clientHeight) lista.scrollTop = b - lista.clientHeight; }
    }
    function abrir() { selectsPropios.forEach(x => x.cerrar()); pintar(); lista.hidden = false; btn.setAttribute('aria-expanded', 'true'); caja.classList.add('abierto');
        // Si la lista no cabe hacia abajo en la pantalla y sí hacia arriba, se abre hacia arriba (así nunca queda cortada)
        caja.classList.remove('arriba'); const rl = lista.getBoundingClientRect(), rb = btn.getBoundingClientRect();
        if (rl.bottom > window.innerHeight - 8 && rb.top > rl.height + 14) caja.classList.add('arriba');
        lista.focus({ preventScroll: true }); }
    function cerrar(devolverFoco) { if (lista.hidden) return; lista.hidden = true; btn.setAttribute('aria-expanded', 'false'); caja.classList.remove('abierto'); if (devolverFoco) btn.focus(); }
    function elegir(k) { sel.selectedIndex = vis[k].i; sel.dispatchEvent(new Event('change', { bubbles: true })); pintar(); cerrar(true); }
    btn.addEventListener('click', () => lista.hidden ? abrir() : cerrar(true));
    btn.addEventListener('keydown', ev => { if (['ArrowDown', 'ArrowUp'].includes(ev.key)) { ev.preventDefault(); abrir(); } });
    lista.addEventListener('keydown', ev => {
        if (ev.key === 'ArrowDown') { ev.preventDefault(); marcar(activo + 1, true); } else if (ev.key === 'ArrowUp') { ev.preventDefault(); marcar(activo - 1, true); }
        else if (ev.key === 'Home') { ev.preventDefault(); marcar(0, true); } else if (ev.key === 'End') { ev.preventDefault(); marcar(vis.length - 1, true); }
        else if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); elegir(activo); }
        else if (ev.key === 'Escape') { ev.preventDefault(); cerrar(true); } else if (ev.key === 'Tab') cerrar(false);
        else if (ev.key.length === 1) { const k = vis.findIndex((v, n) => n > activo && v.x.text.toLowerCase().startsWith(ev.key.toLowerCase())); if (k >= 0) marcar(k, true); }
    });
    lista.addEventListener('click', ev => { const li = ev.target.closest('li'); if (li) elegir(+li.dataset.k); });
    lista.addEventListener('mousemove', ev => { const li = ev.target.closest('li'); if (li) marcar(+li.dataset.k); });
    document.addEventListener('click', ev => { if (!caja.contains(ev.target)) cerrar(false); });
    const api = { sync: pintar, cerrar }; selectsPropios.push(api); return api;
}
