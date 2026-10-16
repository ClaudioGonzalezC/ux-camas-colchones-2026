/* Catálogo compartido entre Guía y Líneas (modelos reales de rosen.cl) y construcción de sus cards.
   Se carga con <script src="./data/modelos.js"> antes del script de cada página. */

// Genera un número pseudoaleatorio determinístico (0 a 1) a partir de un texto,
// para que la valoración/reseñas de cada producto sean "al azar" pero queden
// fijas siempre que se use la misma semilla (ej. nombre del modelo + tipo).
function seededRandom(seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = (hash * 31 + seed.charCodeAt(i)) | 0;
    }
    return (Math.abs(hash) % 1000) / 1000;
}

function calificacionFija(seed) {
    // 21 valores posibles (3.0 a 5.0 en pasos de 0.1) en vez de 5 (pasos de 0.5),
    // para que sea poco probable que 2-3 productos comparados empaten en el máximo.
    return Math.round((3 + seededRandom(seed + '-calificacion') * 2) * 10) / 10;
}

function resenasFijas(seed) {
    return 100 + Math.floor(seededRandom(seed + '-resenas') * 201);
}

// Cada variante (Cama Europea / Box Spring / Colchón) tiene precio oferta, precio normal, imagen y detalles propios.
// Si un tipo no existe para el modelo, se deja undefined y no se muestra ese botón/tarjeta.
function variante(precio, precioNormal, imagen, extra) {
    if (precio === undefined) return undefined;
    return Object.assign({ precio, precioNormal, imagen }, extra || {});
}
// firmeza y adaptación: valor de 1 a 5, aplican al modelo completo (los 3 tipos)
// escala de firmeza: 1-2 suave, 3-4 intermedio, 5 firme
// pata: si no se indica "acero", la pata es de madera (default)
// detalle: información guardada para uso futuro (pata, base, tamaños, almohadas), aún sin definir cómo mostrarla
// tamanos (en el colchón): precio oferta/normal reales por medida 150x190cm y 150x200cm. El precio/precioNormal
// base de la variante corresponde siempre a 150x200cm. Nest es el único modelo sin 150x190cm.
// tamanosConAlmohada (solo New Style 6): mismos precios pero con la opción de almohada incluida.
function modelo(nombre, camaEuropea, boxSpring, colchon, firmeza, adaptacion, detalle) {
    return { nombre, camaEuropea, boxSpring, colchon, firmeza, adaptacion, detalle };
}

const modelosData = [
    {
        tamano: '2-plazas', linea: 'Línea Premium',
        tamanoLabel: '2 Plazas', dimensiones: '150 x 200cm',
        porFirmeza: {
            suave: [
                modelo('Swag',
                    variante(599990, 799990, './images/productos/16017817-1.webp', { pata: 'madera' }),
                    undefined,
                    variante(259990, 399990, './images/productos/14014632-5.webp', { tamanos: { '150 x 190cm': { precio: 249990, precioNormal: 389990 }, '150 x 200cm': { precio: 259990, precioNormal: 399990 } } }),
                    2, 3,
                    { camaEuropea: { base: { completa: {} } } })
            ],
            intermedio: [
                modelo('New style 6 Plus',
                    variante(429990, 589990, './images/productos/16023296-1.webp', { pata: 'madera' }),
                    undefined,
                    variante(269990, 399990, './images/productos/14016678-1.webp', { tamanos: { '150 x 190cm': { precio: 249990, precioNormal: 389990 }, '150 x 200cm': { precio: 269990, precioNormal: 399990 } } }),
                    4, 3,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('New style 6',
                    variante(399990, 499990, './images/productos/16023873-1.webp', { pata: 'madera', almohadas: true }),
                    undefined,
                    variante(249990, 339990, './images/productos/14017392-1.webp', { almohadas: true, tamanos: { '150 x 190cm': { precio: 239990, precioNormal: 319990 }, '150 x 200cm': { precio: 249990, precioNormal: 339990 } }, tamanosConAlmohada: { '150 x 190cm': { precio: 239990, precioNormal: 329990 }, '150 x 200cm': { precio: 249990, precioNormal: 349990 } } }),
                    4, 3,
                    { camaEuropea: { base: { completa: { precio: 399990, precioNormal: 499990, imagen: './images/productos/16023848-1.webp' }, dividida: { precio: 419990, precioNormal: 529990 } } } }),
                modelo('Indie',
                    variante(359990, 499990, './images/productos/16025221-1.webp'),
                    undefined,
                    variante(249990, 349990, './images/productos/14014495-1.webp', { tamanos: { '150 x 190cm': { precio: 239990, precioNormal: 329990 }, '150 x 200cm': { precio: 249990, precioNormal: 349990 } } }),
                    4, 3,
                    { camaEuropea: { pata: ['madera', 'acero'], base: { completa: { precio: 359990, precioNormal: 499990, imagen: './images/productos/16018708-2.webp' }, dividida: { precio: 419990, precioNormal: 549990 } } } }),
                modelo('Classique +',
                    variante(469990, 569990, './images/productos/16015887-1_1.webp'),
                    variante(469990, 569990, './images/productos/16015887-1_1.webp'),
                    variante(319990, 369990, './images/productos/14012257-1.webp', { tamanos: { '150 x 190cm': { precio: 299990, precioNormal: 349990 }, '150 x 200cm': { precio: 319990, precioNormal: 369990 } } }),
                    3, 3,
                    { camaEuropea: { pata: ['madera'], base: { dividida: {} } }, boxSpring: { pata: ['madera'] } }),
                modelo('Autonomy Sky',
                    variante(449990, 649990, './images/productos/16020297-3new.webp'),
                    undefined,
                    variante(319990, 459990, './images/productos/14014528-1.webp', { tamanos: { '150 x 190cm': { precio: 309990, precioNormal: 449990 }, '150 x 200cm': { precio: 319990, precioNormal: 459990 } } }),
                    3, 3,
                    { camaEuropea: { pata: ['madera', 'acero'], base: { dividida: {} } } }),
                modelo('Upline',
                    undefined,
                    undefined,
                    variante(219990, 299990, './images/productos/14014712-1.webp', { tamanos: { '150 x 190cm': { precio: 209990, precioNormal: 289990 }, '150 x 200cm': { precio: 219990, precioNormal: 299990 } } }),
                    4, 3),
                modelo('Joy',
                    variante(469990, 999990, './images/productos/joy_1_base_1.webp'),
                    undefined,
                    variante(339990, 679990, './images/productos/joy1.webp', { tamanos: { '150 x 190cm': { precio: 329990, precioNormal: 659990 }, '150 x 200cm': { precio: 339990, precioNormal: 679990 } } }),
                    4, 3,
                    { camaEuropea: { acabado: ['Black', 'To Go'], base: { dividida: {} } } }),
                modelo('Nest',
                    variante(749990, 829990, './images/productos/16013763-1.webp'),
                    variante(699990, 829990, './images/productos/16013763-1.webp'),
                    variante(549990, 669990, './images/productos/14012072-1.webp'),
                    3, 4,
                    { camaEuropea: { base: { dividida: {} } } })
            ],
            firme: [
                modelo('Tempo',
                    variante(439990, 599990, './images/productos/16012317-1newpata_1.webp'),
                    undefined,
                    variante(299990, 419990, './images/productos/14011751-new-1.webp', { tamanos: { '150 x 190cm': { precio: 289990, precioNormal: 399990 }, '150 x 200cm': { precio: 299990, precioNormal: 419990 } } }),
                    5, 4,
                    { camaEuropea: { almohadas: ['Esencial', 'Light'], base: { dividida: {} } } }),
                modelo('Tempo Plus',
                    variante(489990, 699990, './images/productos/16022415-1.webp'),
                    variante(529990, 799990, './images/productos/16022415-1.webp'),
                    variante(349990, 499990, './images/productos/14016336-1.webp', { tamanos: { '150 x 190cm': { precio: 339990, precioNormal: 479990 }, '150 x 200cm': { precio: 349990, precioNormal: 499990 } } }),
                    5, 4,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('Art 4',
                    variante(489990, 699990, './images/productos/16012540-1newpata.webp'),
                    variante(539990, 799990, './images/productos/16012540-1newpata.webp'),
                    variante(329990, 499990, './images/productos/14007178-1new.webp', { tamanos: { '150 x 190cm': { precio: 329990, precioNormal: 479990 }, '150 x 200cm': { precio: 329990, precioNormal: 499990 } } }),
                    5, 3,
                    { camaEuropea: { almohadas: ['Esencial', 'Viscoelástica'], base: { dividida: {} } } }),
                modelo('Neo Plus',
                    variante(549990, 749990, './images/productos/16022040-1newpata.webp'),
                    variante(669990, 849990, './images/productos/16022040-1newpata.webp'),
                    variante(399990, 539990, './images/productos/14012246-1new.webp', { tamanos: { '150 x 190cm': { precio: 379990, precioNormal: 519990 }, '150 x 200cm': { precio: 399990, precioNormal: 539990 } } }),
                    5, 3,
                    { camaEuropea: { almohadas: ['Esencial', 'Microfibra'], base: { dividida: {} } } }),
                modelo('Driven',
                    variante(579990, 759990, './images/productos/16013759-1newpata.webp'),
                    variante(629990, 859990, './images/productos/16013759-1newpata.webp'),
                    variante(419990, 569990, './images/productos/14012067-1.webp', { tamanos: { '150 x 190cm': { precio: 399990, precioNormal: 529990 }, '150 x 200cm': { precio: 419990, precioNormal: 569990 } } }),
                    5, 3,
                    { camaEuropea: { almohadas: ['Esencial', 'Memory Max Basic'], base: { dividida: {} } } })
            ]
        }
    },
    {
        tamano: '2-plazas', linea: 'Línea Esencial',
        tamanoLabel: '2 Plazas', dimensiones: '150 x 200cm',
        // firmeza/adaptación de este bloque son estimaciones por criterio: rosen.cl no publica una escala numérica,
        // solo texto descriptivo (ver ficha de Pratta: "espuma suave", "D-22 Soft"). No se fabricó ningún precio o dato de catálogo.
        porFirmeza: {
            suave: [
                modelo('Pratta',
                    variante(279990, 489990, './images/productos/16017942-1_1.webp'),
                    undefined,
                    variante(159990, 329990, './images/productos/14014385-2.webp', { tamanos: { '150 x 190cm': { precio: 309990, precioNormal: 309990 }, '150 x 200cm': { precio: 159990, precioNormal: 329990 } } }),
                    2, 3,
                    { camaEuropea: { base: { completa: { precio: 279990, precioNormal: 489990 }, dividida: { precio: 299990, precioNormal: 519990 } } } })
            ],
            intermedio: [
                modelo('Wave',
                    variante(249990, 279990, './images/productos/16023491-2_1.webp'),
                    undefined,
                    variante(129990, 189990, './images/productos/14016841-1.webp', { tamanos: { '150 x 190cm': { precio: 129990, precioNormal: 189990 } } }),
                    3, 2,
                    { camaEuropea: { base: { completa: { precio: 249990, precioNormal: 279990 }, dividida: { precio: 299990, precioNormal: 339990 } } } }),
                modelo('Ergo-T New',
                    variante(279990, 369990, './images/productos/16024404-1.webp'),
                    undefined,
                    variante(149990, 239990, './images/productos/14017543-1.webp'),
                    3, 3,
                    { camaEuropea: { base: { completa: { precio: 279990, precioNormal: 369990 }, dividida: { precio: 299990, precioNormal: 399990 } } } }),
                modelo('New Style 2 Plus',
                    variante(289990, 399990, './images/productos/16022961-1new_1.webp'),
                    undefined,
                    variante(169990, 259990, './images/productos/14016578-1new.webp'),
                    3, 2,
                    { camaEuropea: { base: { completa: { precio: 289990, precioNormal: 399990 }, dividida: { precio: 309990, precioNormal: 449990 } } } }),
                modelo('New Style 4 Plus',
                    variante(329990, 449990, './images/productos/16024151-1_1.webp'),
                    undefined,
                    variante(169990, 279990, './images/productos/14017520-1.webp'),
                    4, 3,
                    { camaEuropea: { base: { completa: { precio: 329990, precioNormal: 449990 }, dividida: { precio: 349990, precioNormal: 489990 } } } })
            ],
            firme: []
        }
    },
    {
        tamano: '2-plazas', linea: 'Línea Advantage',
        tamanoLabel: '2 Plazas', dimensiones: '150 x 200cm',
        // firmeza/adaptación de este bloque son estimaciones por criterio (rosen.cl no publica escala numérica).
        // No se encontró SKU real de "New Cero" para 2 Plazas al momento de esta carga: se dejó fuera para no fabricar datos.
        porFirmeza: {
            suave: [
                modelo('Âme',
                    undefined,
                    undefined,
                    variante(929990, 999990, './images/productos/14011068-1.webp'),
                    2, 3)
            ],
            intermedio: [
                modelo('Seaqual',
                    variante(1129990, 1349990, './images/productos/16016172-1_2.webp'),
                    undefined,
                    variante(799990, 949990, './images/productos/16016171-1.webp'),
                    3, 4,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('Forward',
                    variante(1199990, 1449990, './images/productos/16014282-1.webp'),
                    undefined,
                    variante(829990, 999990, './images/productos/14012225-1.webp'),
                    3, 4,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('New Sollievo',
                    variante(1249990, 2049990, './images/productos/16023144-1_1.webp'),
                    variante(1379990, 2249990, './images/productos/16023148-1_1.webp'),
                    variante(999990, 1599990, './images/productos/14016612-1_1.webp'),
                    3, 4,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('Bock',
                    variante(799990, 1049990, './images/productos/16016360-1_2.webp'),
                    variante(879990, 1149990, './images/productos/16014298-1_1.webp'),
                    variante(649990, 799990, './images/productos/14016616-1_1.webp'),
                    4, 3,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('Somnus',
                    undefined,
                    variante(1439990, 1599990, './images/productos/16021743-1new_2.webp'),
                    variante(1139990, 1299990, './images/productos/14015843-1_2.webp'),
                    4, 4),
                modelo('Novus',
                    undefined,
                    variante(1829990, 2249990, './images/productos/16020805-1.webp'),
                    variante(1299990, 1599990, './images/productos/14015668-1.webp'),
                    4, 4)
            ],
            firme: []
        }
    },
    {
        tamano: '2-plazas', linea: 'Selección Excelsior',
        tamanoLabel: '2 Plazas', dimensiones: '150 x 200cm',
        // firmeza/adaptación de este bloque son estimaciones por criterio (rosen.cl no publica escala numérica).
        // Astrum y J. Rosenberg (Sucessor/Founder) no tenían SKU real de colchón para 2 Plazas al momento de esta carga: se dejaron fuera para no fabricar datos.
        porFirmeza: {
            suave: [],
            intermedio: [
                modelo('Pearl',
                    variante(1679989, 2099990, './images/productos/16014974-1_2.webp'),
                    variante(1749990, 2199990, './images/productos/16014973-1_2.webp'),
                    variante(1249990, 1599990, './images/productos/14012284-1_1.webp'),
                    3, 5,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('Orbix',
                    variante(2399990, 2899990, './images/productos/16020808-1_1.webp'),
                    variante(2629990, 3099990, './images/productos/16020809-1_1.webp'),
                    variante(1999990, 2399990, './images/productos/14015673-1_1.webp'),
                    4, 5,
                    { camaEuropea: { base: { dividida: {} } } })
            ],
            firme: [
                modelo('Pionero',
                    undefined,
                    variante(2399990, 2599990, './images/productos/16023403-1.webp'),
                    variante(1999990, 2199990, './images/productos/14017244-1.webp'),
                    5, 4)
            ]
        }
    },
    {
        tamano: '1-plaza', linea: 'Línea Esencial',
        tamanoLabel: '1 Plaza', dimensiones: '90 x 200cm',
        // Solo hay SKU real de cama europea para Esencial y Premium en 1 Plaza (Advantage y Excelsior no tienen
        // modelos en este tamaño en rosen.cl). Box Spring tampoco existe en rosen.cl para este tamaño.
        porFirmeza: {
            suave: [
                modelo('Pratta',
                    variante(199990, 369990, './images/productos/16017939-1_1.webp'),
                    undefined,
                    variante(119990, 229990, './images/productos/14014381-2.webp', { tamanos: { '90 x 190cm': { precio: 109990, precioNormal: 209990 }, '90 x 200cm': { precio: 119990, precioNormal: 229990 } } }),
                    2, 3,
                    { camaEuropea: { base: { completa: {} } } })
            ],
            intermedio: [
                modelo('Wave',
                    variante(179990, 209990, './images/productos/16023442-1.webp'),
                    undefined,
                    variante(89990, 139990, './images/productos/14016843-1.webp', { tamanos: { '90 x 190cm': { precio: 89990, precioNormal: 139990 } } }),
                    3, 2,
                    { camaEuropea: { base: { completa: {} } } }),
                modelo('Ergo-T New',
                    variante(199990, 259990, './images/productos/16024402-1.webp'),
                    undefined,
                    variante(109990, 179990, './images/productos/14017546-1.webp', { tamanos: { '90 x 190cm': { precio: 99990, precioNormal: 169990 }, '90 x 200cm': { precio: 109990, precioNormal: 179990 } } }),
                    3, 3,
                    { camaEuropea: { base: { completa: {} } } }),
                modelo('New Style 2 Plus',
                    variante(209990, 299990, './images/productos/16022958-1new.webp'),
                    undefined,
                    variante(129990, 199990, './images/productos/14016574-1new.webp', { tamanos: { '90 x 190cm': { precio: 119990, precioNormal: 189990 }, '90 x 200cm': { precio: 129990, precioNormal: 199990 } } }),
                    3, 2,
                    { camaEuropea: { base: { completa: {} } } }),
                modelo('New Style 4 Plus',
                    variante(239990, 349990, './images/productos/16024154-1.webp'),
                    undefined,
                    variante(139990, 219990, './images/productos/14017517-1.webp', { tamanos: { '90 x 190cm': { precio: 129990, precioNormal: 209990 }, '90 x 200cm': { precio: 139990, precioNormal: 219990 } } }),
                    4, 3)
            ],
            firme: []
        }
    },
    {
        tamano: '1-plaza', linea: 'Línea Premium',
        tamanoLabel: '1 Plaza', dimensiones: '90 x 200cm',
        porFirmeza: {
            suave: [],
            intermedio: [
                modelo('Autonomy Sky',
                    variante(299990, 479990, './images/productos/16022801-1new.webp'),
                    undefined,
                    variante(189990, 359990, './images/productos/14014518-1_2.webp', { tamanos: { '90 x 190cm': { precio: 179990, precioNormal: 349990 }, '90 x 200cm': { precio: 189990, precioNormal: 359990 } } }),
                    3, 3,
                    { camaEuropea: { base: { completa: {} } } }),
                modelo('Classique +',
                    variante(329990, 429990, './images/productos/16014269-1.webp'),
                    undefined,
                    variante(229990, 299990, './images/productos/14012252-1_3.webp', { tamanos: { '90 x 190cm': { precio: 219990, precioNormal: 279990 }, '90 x 200cm': { precio: 229990, precioNormal: 299990 } } }),
                    3, 3,
                    { camaEuropea: { base: { completa: {} } } }),
                modelo('New style 6',
                    variante(269990, 379990, './images/productos/16023870-1.webp'),
                    undefined,
                    variante(169990, 239990, './images/productos/14017396-1.webp', { tamanos: { '90 x 190cm': { precio: 159990, precioNormal: 219990 }, '90 x 200cm': { precio: 169990, precioNormal: 239990 } } }),
                    4, 3,
                    { camaEuropea: { base: { completa: {} } } }),
                modelo('New style 6 Plus',
                    variante(319990, 429990, './images/productos/16023292-1.webp'),
                    undefined,
                    variante(229990, 299990, './images/productos/14016682-1.webp', { tamanos: { '90 x 190cm': { precio: 219990, precioNormal: 289990 }, '90 x 200cm': { precio: 229990, precioNormal: 299990 } } }),
                    4, 3),
                modelo('Indie',
                    variante(249990, 389990, './images/productos/16018706-1.webp'),
                    undefined,
                    variante(159990, 249990, './images/productos/14014488-1.webp', { tamanos: { '90 x 190cm': { precio: 149990, precioNormal: 229990 }, '90 x 200cm': { precio: 159990, precioNormal: 249990 } } }),
                    4, 3,
                    { camaEuropea: { base: { completa: {} } } })
            ],
            firme: []
        }
    },
    {
        tamano: '1-5-plazas', linea: 'Línea Esencial',
        tamanoLabel: '1,5 Plazas', dimensiones: '105 x 200cm',
        // Advantage y Excelsior no tienen modelos reales en 1,5 Plazas en rosen.cl.
        porFirmeza: {
            suave: [
                modelo('Pratta',
                    variante(209990, 409990, './images/productos/16017940-1_1.webp'),
                    undefined,
                    variante(129990, 279990, './images/productos/14014383-2.webp', { tamanos: { '105 x 190cm': { precio: 119990, precioNormal: 259990 }, '105 x 200cm': { precio: 129990, precioNormal: 279990 } } }),
                    2, 3,
                    { camaEuropea: { base: { completa: {} } } })
            ],
            intermedio: [
                modelo('Wave',
                    variante(199990, 229990, './images/productos/16023443-1.webp'),
                    undefined,
                    variante(99990, 159990, './images/productos/14016842-1.webp', { tamanos: { '105 x 190cm': { precio: 99990, precioNormal: 159990 } } }),
                    3, 2,
                    { camaEuropea: { base: { completa: {} } } }),
                modelo('Ergo-T New',
                    variante(209990, 279990, './images/productos/16024403-1.webp'),
                    undefined,
                    variante(129990, 199990, './images/productos/14017544-1.webp', { tamanos: { '105 x 190cm': { precio: 119990, precioNormal: 189990 }, '105 x 200cm': { precio: 129990, precioNormal: 199990 } } }),
                    3, 3,
                    { camaEuropea: { base: { completa: {} } } }),
                modelo('New Style 2 Plus',
                    variante(219990, 329990, './images/productos/16022959-1new.webp'),
                    undefined,
                    variante(139990, 219990, './images/productos/14016576-1new.webp', { tamanos: { '105 x 190cm': { precio: 129990, precioNormal: 209990 }, '105 x 200cm': { precio: 139990, precioNormal: 219990 } } }),
                    3, 2,
                    { camaEuropea: { base: { completa: {} } } }),
                modelo('New Style 4 Plus',
                    variante(249990, 379990, './images/productos/16024153-1.webp'),
                    undefined,
                    variante(149990, 259990, './images/productos/14017519-1.webp', { tamanos: { '105 x 190cm': { precio: 139990, precioNormal: 239990 }, '105 x 200cm': { precio: 149990, precioNormal: 259990 } } }),
                    4, 3)
            ],
            firme: []
        }
    },
    {
        tamano: '1-5-plazas', linea: 'Línea Premium',
        tamanoLabel: '1,5 Plazas', dimensiones: '105 x 200cm',
        porFirmeza: {
            suave: [],
            intermedio: [
                modelo('Autonomy Sky',
                    variante(309990, 499990, './images/productos/16020296-1new.webp'),
                    undefined,
                    variante(219990, 379990, './images/productos/14014519-1.webp', { tamanos: { '105 x 190cm': { precio: 199990, precioNormal: 369990 }, '105 x 200cm': { precio: 219990, precioNormal: 379990 } } }),
                    3, 3,
                    { camaEuropea: { base: { completa: {} } } }),
                modelo('New style 6',
                    variante(279990, 419990, './images/productos/16023849-1.webp'),
                    undefined,
                    variante(179990, 289990, './images/productos/14017394-1.webp', { tamanos: { '105 x 190cm': { precio: 169990, precioNormal: 269990 }, '105 x 200cm': { precio: 179990, precioNormal: 289990 } } }),
                    4, 3,
                    { camaEuropea: { base: { completa: {} } } }),
                modelo('New style 6 Plus',
                    variante(349990, 459990, './images/productos/16023294-1.webp'),
                    undefined,
                    variante(249990, 319990, './images/productos/14016680-1.webp', { tamanos: { '105 x 190cm': { precio: 239990, precioNormal: 309990 }, '105 x 200cm': { precio: 249990, precioNormal: 319990 } } }),
                    4, 3),
                modelo('Classique +',
                    variante(369990, 449990, './images/productos/16015896-1_1.webp'),
                    undefined,
                    variante(249990, 329990, './images/productos/14012254-1.webp', { tamanos: { '105 x 190cm': { precio: 239990, precioNormal: 319990 }, '105 x 200cm': { precio: 249990, precioNormal: 329990 } } }),
                    3, 3,
                    { camaEuropea: { base: { completa: {} } } }),
                modelo('Indie',
                    variante(269990, 429990, './images/productos/16018707-1.webp'),
                    undefined,
                    variante(169990, 299990, './images/productos/14014489-1.webp', { tamanos: { '105 x 190cm': { precio: 159990, precioNormal: 279990 }, '105 x 200cm': { precio: 169990, precioNormal: 299990 } } }),
                    4, 3,
                    { camaEuropea: { base: { completa: {} } } }),
                modelo('Joy',
                    variante(349990, 739990, './images/productos/joy_1_base_1.webp'),
                    undefined,
                    variante(229990, 539990, './images/productos/joy1.webp', { tamanos: { '105 x 190cm': { precio: 229990, precioNormal: 519990 }, '105 x 200cm': { precio: 229990, precioNormal: 539990 } } }),
                    4, 3),
                modelo('Upline',
                    undefined,
                    undefined,
                    variante(159990, 259990, './images/productos/14014359-1.webp', { tamanos: { '105 x 190cm': { precio: 149990, precioNormal: 249990 }, '105 x 200cm': { precio: 159990, precioNormal: 259990 } } }),
                    4, 3)
            ],
            firme: [
                modelo('Art 4',
                    variante(369990, 519990, './images/productos/16015000-1newpata.webp'),
                    undefined,
                    variante(279990, 399990, './images/productos/14007177-1new.webp', { tamanos: { '105 x 190cm': { precio: 269990, precioNormal: 379990 }, '105 x 200cm': { precio: 279990, precioNormal: 399990 } } }),
                    5, 3,
                    { camaEuropea: { base: { completa: {} } } }),
                modelo('Tempo',
                    variante(329990, 479990, './images/productos/16012287-2nw26.webp'),
                    undefined,
                    variante(229990, 369990, './images/productos/14011749-new-1.webp', { tamanos: { '105 x 190cm': { precio: 219990, precioNormal: 349990 }, '105 x 200cm': { precio: 229990, precioNormal: 369990 } } }),
                    5, 4,
                    { camaEuropea: { base: { completa: {} } } }),
                modelo('Tempo Plus',
                    variante(429990, 519990, './images/productos/16022414-2n26.webp'),
                    undefined,
                    variante(299990, 399990, './images/productos/14016335-1.webp', { tamanos: { '105 x 190cm': { precio: 289990, precioNormal: 379990 }, '105 x 200cm': { precio: 299990, precioNormal: 399990 } } }),
                    5, 4,
                    { camaEuropea: { base: { dividida: {} } } })
            ]
        }
    },
    {
        tamano: 'full', linea: 'Línea Esencial',
        tamanoLabel: 'Full', dimensiones: '135 x 200cm',
        // Catálogo real muy reducido en Full: solo Pratta y New Style 4 Plus (Esencial) y Classique+ y Joy (Premium).
        // Advantage y Excelsior no tienen modelos en este tamaño en rosen.cl.
        porFirmeza: {
            suave: [
                modelo('Pratta',
                    variante(259990, 449990, './images/productos/16017984-1_1.webp'),
                    undefined,
                    variante(149990, 299990, './images/productos/14014432-2.webp'),
                    2, 3,
                    { camaEuropea: { base: { completa: {} } } })
            ],
            intermedio: [
                modelo('New Style 4 Plus',
                    variante(279990, 399990, './images/productos/16024095-1.webp'),
                    undefined,
                    undefined,
                    4, 3)
            ],
            firme: []
        }
    },
    {
        tamano: 'full', linea: 'Línea Premium',
        tamanoLabel: 'Full', dimensiones: '135 x 200cm',
        porFirmeza: {
            suave: [],
            intermedio: [
                modelo('Classique +',
                    variante(419990, 519990, './images/productos/16014272-1.webp'),
                    undefined,
                    variante(269990, 339990, './images/productos/14012258-1.webp'),
                    3, 3,
                    { camaEuropea: { base: { completa: {} } } }),
                modelo('Joy',
                    undefined,
                    undefined,
                    variante(259990, 619990, './images/productos/joy1.webp', { tamanos: { '135 x 190cm': { precio: 259990, precioNormal: 619990 } } }),
                    4, 3)
            ],
            firme: []
        }
    },
    {
        tamano: 'queen', linea: 'Selección Excelsior',
        tamanoLabel: 'Queen', dimensiones: '160 x 200cm',
        // Queen es un tamaño que rosen.cl recién está lanzando: casi todo su catálogo real aparece "Próximamente".
        // J. Rosenberg Founder es el único SKU con precio publicado (Box Spring, sin cama europea ni colchón
        // asociados todavía). No se fabricó ningún otro modelo ni línea para este tamaño.
        porFirmeza: {
            suave: [],
            intermedio: [
                modelo('J. Rosenberg Founder',
                    undefined,
                    variante(7699990, undefined, './images/productos/16014670-1.webp'),
                    undefined,
                    3, 4)
            ],
            firme: []
        }
    },
    {
        tamano: 'king', linea: 'Línea Esencial',
        tamanoLabel: 'King', dimensiones: '180 x 200cm',
        // Wave no tiene SKU real en King (no se fabricó ese dato).
        porFirmeza: {
            suave: [
                modelo('Pratta',
                    variante(349990, 589990, './images/productos/16017943-1_1.webp'),
                    undefined,
                    variante(189990, 429990, './images/productos/14014386-2.webp'),
                    2, 3,
                    { camaEuropea: { base: { dividida: {} } } })
            ],
            intermedio: [
                modelo('Ergo-T New',
                    variante(349990, 459990, './images/productos/16024406-1.webp'),
                    undefined,
                    variante(189990, 299990, './images/productos/14017541-1.webp'),
                    3, 3,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('New Style 2 Plus',
                    variante(369990, 499990, './images/productos/16022962-1new.webp'),
                    undefined,
                    variante(199990, 339990, './images/productos/14016579-1new.webp'),
                    3, 2,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('New Style 4 Plus',
                    variante(399990, 539990, './images/productos/16024150-1.webp'),
                    undefined,
                    variante(229990, 369990, './images/productos/14017522-1.webp'),
                    4, 3)
            ],
            firme: []
        }
    },
    {
        tamano: 'king', linea: 'Línea Premium',
        tamanoLabel: 'King', dimensiones: '180 x 200cm',
        // Upline y New Swag no tienen SKU real (o con precio publicado) en King.
        porFirmeza: {
            suave: [],
            intermedio: [
                modelo('Autonomy Sky',
                    variante(479990, 729990, './images/productos/16020298-1new.webp'),
                    undefined,
                    variante(319990, 549990, './images/productos/14014528-1.webp'),
                    3, 3,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('Nest',
                    variante(729990, 929990, './images/productos/16013764-1new.webp'),
                    variante(789990, 999990, './images/productos/16013771-1.webp'),
                    variante(599990, 729990, './images/productos/14012072-1_1.webp'),
                    3, 4,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('Classique +',
                    variante(519990, 649990, './images/productos/16015894-1_1.webp'),
                    variante(579990, 759990, './images/productos/16015887-1.webp'),
                    variante(359990, 479990, './images/productos/14012257-1_2.webp'),
                    3, 3,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('New style 6',
                    variante(479990, 599990, './images/productos/16023872-1.webp'),
                    undefined,
                    variante(259990, 439990, './images/productos/14017391-1.webp'),
                    4, 3,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('New style 6 Plus',
                    variante(519990, 669990, './images/productos/16023297-1.webp'),
                    undefined,
                    variante(359990, 479990, './images/productos/14016677-1.webp'),
                    4, 3),
                modelo('Indie',
                    variante(479990, 619990, './images/productos/16018710-1.webp'),
                    undefined,
                    variante(249990, 449990, './images/productos/14014498-1.webp'),
                    4, 3,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('Joy',
                    variante(519990, 1049990, './images/productos/joy_1_base_1_2.webp'),
                    undefined,
                    variante(349990, 759990, './images/productos/joy1.webp'),
                    4, 3)
            ],
            firme: [
                modelo('Art 4',
                    variante(599990, 799990, './images/productos/16012540-1newpata_1.webp'),
                    variante(649990, 899990, './images/productos/16015193-1newpata_1.webp'),
                    variante(389990, 599990, './images/productos/14007179-1new.webp'),
                    5, 3,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('Tempo',
                    variante(499990, 679990, './images/productos/16012352-2nw26.webp'),
                    variante(549990, 789990, './images/productos/16015306-2nw26.webp'),
                    variante(339990, 529990, './images/productos/14011752-new-1.webp'),
                    5, 4,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('Tempo Plus',
                    variante(619990, 799990, './images/productos/16022416-2n26.webp'),
                    variante(669990, 899990, './images/productos/16022416-2n26.webp'),
                    variante(419990, 599990, './images/productos/14016338-1.webp'),
                    5, 4,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('Driven',
                    variante(699909, 859990, './images/productos/16013759-1newpata_1.webp'),
                    variante(719990, 949990, './images/productos/16013767-1newpata_1.webp'),
                    variante(499990, 669990, './images/productos/14012067-1_1.webp'),
                    5, 3,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('Neo Plus',
                    variante(629990, 839990, './images/productos/16022041-1newpata.webp'),
                    variante(699990, 939990, './images/productos/16022062-1newpata.webp'),
                    variante(439990, 639990, './images/productos/14012246-1new.webp'),
                    5, 3,
                    { camaEuropea: { base: { dividida: {} } } })
            ]
        }
    },
    {
        tamano: 'king', linea: 'Línea Advantage',
        tamanoLabel: 'King', dimensiones: '180 x 200cm',
        // New Cero no tiene SKU real en King.
        porFirmeza: {
            suave: [
                modelo('Âme',
                    undefined,
                    variante(1499990, 1649990, './images/productos/16021951-1.webp'),
                    variante(1099990, 1199990, './images/productos/14011068-1_1.webp'),
                    2, 3)
            ],
            intermedio: [
                modelo('Seaqual',
                    variante(1299990, 1549990, './images/productos/16016172-1_2.webp'),
                    undefined,
                    variante(939990, 1099990, './images/productos/16016171-1.webp'),
                    3, 4,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('Forward',
                    variante(1349990, 1649990, './images/productos/16014285-1_1.webp'),
                    undefined,
                    variante(999990, 1199990, './images/productos/14012227-1.webp'),
                    3, 4,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('New Sollievo',
                    variante(1499990, 2399990, './images/productos/16023146-1_1.webp'),
                    variante(1499990, 2599990, './images/productos/16023148-1_1_1.webp'),
                    variante(1149990, 1799990, './images/productos/14016614-1_1.webp'),
                    3, 4,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('Somnus',
                    undefined,
                    variante(1799990, 1999990, './images/productos/16021744-1new_2.webp'),
                    variante(1349990, 1499990, './images/productos/14015844-1_2.webp'),
                    4, 4),
                modelo('Novus',
                    variante(1999990, 2399990, './images/productos/16020804-1.webp'),
                    variante(2049990, 2599990, './images/productos/16020806-1.webp'),
                    variante(1469990, 1799990, './images/productos/14015670-1.webp'),
                    4, 4,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('Bock',
                    variante(899990, 1149990, './images/productos/16016361-1_1.webp'),
                    variante(979990, 1249990, './images/productos/16014300-1new_1.webp'),
                    variante(749990, 899990, './images/productos/14016617-1_1.webp'),
                    4, 3,
                    { camaEuropea: { base: { dividida: {} } } })
            ],
            firme: []
        }
    },
    {
        tamano: 'king', linea: 'Selección Excelsior',
        tamanoLabel: 'King', dimensiones: '180 x 200cm',
        porFirmeza: {
            suave: [],
            intermedio: [
                modelo('Pearl',
                    variante(1999990, 2499990, './images/productos/16014974-1_2.webp'),
                    variante(1999990, 2599990, './images/productos/16014973-1_2.webp'),
                    variante(1499990, 1899990, './images/productos/14012287-1_3.webp'),
                    3, 5,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('Orbix',
                    variante(2849990, 3199990, './images/productos/16020808-1.webp'),
                    variante(2899990, 3499990, './images/productos/16020809-1.webp'),
                    variante(2349990, 2799990, './images/productos/14015673-1.webp'),
                    4, 5,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('Astrum',
                    variante(4499990, 4999990, './images/productos/16020811-1.webp'),
                    variante(4699990, 5199990, './images/productos/16020813-1.webp'),
                    variante(4249990, 4699990, './images/productos/14015675-1.webp'),
                    4, 5,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('J. Rosenberg Successor',
                    undefined,
                    variante(5999990, undefined, './images/productos/16023528-1.webp'),
                    undefined,
                    3, 4),
                modelo('J. Rosenberg Founder',
                    undefined,
                    variante(7999990, undefined, './images/productos/16014672-1.webp'),
                    undefined,
                    3, 4)
            ],
            firme: [
                modelo('Pionero',
                    undefined,
                    variante(2699990, 2899990, './images/productos/16023404-1.webp'),
                    variante(2199990, 2399990, './images/productos/14017245-1.webp'),
                    5, 4)
            ]
        }
    },
    {
        tamano: 'super-king', linea: 'Línea Premium',
        tamanoLabel: 'Super King', dimensiones: '200 x 200cm',
        // Esencial no tiene ningún modelo real en Super King. Classique+ y Upline tampoco (no se fabricó ese dato).
        porFirmeza: {
            suave: [],
            intermedio: [
                modelo('Autonomy Sky',
                    variante(569990, 829990, './images/productos/16020299-2new.webp'),
                    undefined,
                    variante(349990, 599990, './images/productos/14014528-1.webp'),
                    3, 3,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('Nest',
                    variante(789990, 999990, './images/productos/16013765-1new.webp'),
                    variante(839990, 1099990, './images/productos/16013772-1.webp'),
                    variante(649990, 799990, './images/productos/14012075-1_2.webp'),
                    3, 4,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('New style 6',
                    variante(509990, 699990, './images/productos/16023871-1.webp'),
                    undefined,
                    variante(289990, 459990, './images/productos/14017390-1.webp'),
                    4, 3,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('New style 6 Plus',
                    variante(609990, 769990, './images/productos/16023298-1.webp'),
                    undefined,
                    variante(389990, 579990, './images/productos/14016676-1.webp'),
                    4, 3),
                modelo('Indie',
                    variante(499990, 699990, './images/productos/16018710-1_1.webp'),
                    undefined,
                    variante(279990, 469990, './images/productos/14014499-1.webp'),
                    4, 3,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('Joy',
                    undefined,
                    undefined,
                    variante(369990, 839990, './images/productos/joy1.webp'),
                    4, 3)
            ],
            firme: [
                modelo('Art 4',
                    variante(689990, 899990, './images/productos/16012540-1newpata_1.webp'),
                    variante(739990, 999990, './images/productos/16015193-1newpata_1.webp'),
                    variante(469990, 649990, './images/productos/14007180-1new.webp'),
                    5, 3,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('Tempo',
                    variante(589990, 779990, './images/productos/16012387-2nw26.webp'),
                    variante(639990, 879990, './images/productos/16015338-2nw26.webp'),
                    variante(369990, 579990, './images/productos/14011753-new-1.webp'),
                    5, 4,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('Tempo Plus',
                    variante(699990, 899990, './images/productos/16022417-2n26.webp'),
                    variante(759990, 999990, './images/productos/16022417-2n26.webp'),
                    variante(499990, 649990, './images/productos/14016339-1.webp'),
                    5, 4,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('Driven',
                    variante(769990, 959990, './images/productos/16013759-1newpata_1.webp'),
                    variante(819990, 1069990, './images/productos/16013767-1newpata_1.webp'),
                    variante(599990, 689990, './images/productos/14012070-1_1.webp'),
                    5, 3,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('Neo Plus',
                    variante(699990, 949990, './images/productos/16022042-1newpata.webp'),
                    variante(769990, 1049990, './images/productos/16022063-1newpata.webp'),
                    variante(519990, 669990, './images/productos/14012246-1new.webp'),
                    5, 3,
                    { camaEuropea: { base: { dividida: {} } } })
            ]
        }
    },
    {
        tamano: 'super-king', linea: 'Línea Advantage',
        tamanoLabel: 'Super King', dimensiones: '200 x 200cm',
        // New Cero no tiene SKU real en Super King.
        porFirmeza: {
            suave: [
                modelo('Âme',
                    undefined,
                    variante(1599990, 1749990, './images/productos/16021952-1.webp'),
                    variante(1189990, 1299990, './images/productos/14011068-1_1.webp'),
                    2, 3)
            ],
            intermedio: [
                modelo('Bock',
                    variante(949990, 1249990, './images/productos/16016362-1_1.webp'),
                    variante(1049990, 1349990, './images/productos/16014300-1new_2.webp'),
                    variante(799990, 999990, './images/productos/14016618-1_1.webp'),
                    4, 3,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('Seaqual',
                    variante(1349990, 1649990, './images/productos/16016172-1_2.webp'),
                    undefined,
                    variante(1039990, 1199990, './images/productos/16016171-1.webp'),
                    3, 4,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('Forward',
                    variante(1399990, 1749990, './images/productos/16014285-1_1.webp'),
                    undefined,
                    variante(1059990, 1299990, './images/productos/14012227-1_1.webp'),
                    3, 4,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('New Sollievo',
                    variante(1549990, 2499990, './images/productos/16023147-1_1.webp'),
                    variante(1659990, 2699990, './images/productos/16023151-1_1.webp'),
                    variante(1289990, 1999990, './images/productos/14016615-1_1.webp'),
                    3, 4),
                modelo('Somnus',
                    undefined,
                    variante(1879990, 2099990, './images/productos/16021744-1new_3.webp'),
                    variante(1429990, 1599990, './images/productos/14015844-1_2.webp'),
                    4, 4),
                modelo('Novus',
                    variante(2049990, 2499990, './images/productos/16020720-1.webp'),
                    variante(2189990, 2699990, './images/productos/16020807-1.webp'),
                    variante(1679990, 1999990, './images/productos/14015671-1.webp'),
                    4, 4,
                    { camaEuropea: { base: { dividida: {} } } })
            ],
            firme: []
        }
    },
    {
        tamano: 'super-king', linea: 'Selección Excelsior',
        tamanoLabel: 'Super King', dimensiones: '200 x 200cm',
        porFirmeza: {
            suave: [],
            intermedio: [
                modelo('Pearl',
                    variante(2079990, 2599990, './images/productos/16014976-1_2.webp'),
                    variante(2149990, 2699990, './images/productos/16014975-1_2.webp'),
                    variante(1599990, 1999990, './images/productos/14012287-1_3.webp'),
                    3, 5,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('Orbix',
                    variante(2899990, 3499990, './images/productos/16020722-1.webp'),
                    variante(3269990, 3799990, './images/productos/16020810-1.webp'),
                    variante(2699990, 3199990, './images/productos/14015674-1.webp'),
                    4, 5,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('Astrum',
                    variante(4749990, 5299990, './images/productos/16020812-1.webp'),
                    variante(4959990, 5499990, './images/productos/16020723-1.webp'),
                    variante(4599990, 5099990, './images/productos/14015676-1.webp'),
                    4, 5,
                    { camaEuropea: { base: { dividida: {} } } }),
                modelo('J. Rosenberg Successor',
                    undefined,
                    variante(6499990, undefined, './images/productos/16023529-1_1.webp'),
                    undefined,
                    3, 4),
                modelo('J. Rosenberg Founder',
                    undefined,
                    variante(8499990, undefined, './images/productos/16014670-1.webp'),
                    undefined,
                    3, 4)
            ],
            firme: [
                modelo('Pionero',
                    undefined,
                    variante(2979990, 3199990, './images/productos/16023405-1.webp'),
                    variante(2469990, 2699990, './images/productos/14017246-1.webp'),
                    5, 4)
            ]
        }
    }
];

// Construcción de las cards de modelo (la misma que usan la PLP de Líneas y el resultado del quiz de Guía),
// para que la estructura sea idéntica en ambos lugares.
const RosenModelos = (() => {
    const tipoPrefijoMap = { camaEuropea: 'Cama Europea', boxSpring: 'Box Spring', colchon: 'Colchón' };

    function valoresHtml(m) {
        if (m.firmeza == null || m.adaptacion == null) return '';
        function fila(label, valor) {
            let segmentos = '';
            for (let i = 1; i <= 5; i++) {
                segmentos += `<span class="valores-segment${i <= valor ? ' filled' : ''}"></span>`;
            }
            return `<div class="valores-row"><span class="valores-label">${label}</span><div class="valores-bar">${segmentos}</div></div>`;
        }
        return `<div class="valores">${fila('Firmeza', m.firmeza)}${fila('Adaptación', m.adaptacion)}</div>`;
    }

    // El tamaño llega elegido (param "medida"). En las cards solo se muestra la opción ya seleccionada, sin toggle.
    // Si el colchón no tiene precio real para esa medida (ej. Nest, que solo existe en 150x200cm) se usa 150x200cm como respaldo.
    function tamanoHtml(v, tipoKey, medida, dimensiones) {
        const medidaMostrada = (tipoKey === 'colchon' && v.tamanos && v.tamanos[medida]) ? medida : dimensiones;
        return `<div class="tamano-colchon"><p class="description">Tamaño</p><p class="firme selected">${medidaMostrada}</p></div>`;
    }

    function baseOpciones(m, tipoKey) {
        const base = tipoKey === 'camaEuropea' && m.detalle && m.detalle.camaEuropea && m.detalle.camaEuropea.base;
        return (base && !Array.isArray(base)) ? base : null;
    }

    function baseHtml(m, tipoKey) {
        const opciones = baseOpciones(m, tipoKey);
        if (!opciones) return '';
        const keys = Object.keys(opciones);
        if (!keys.length) return '';
        const defaultKey = opciones.completa ? 'completa' : keys[0];
        const pills = keys.map(k => {
            const opt = opciones[k];
            const imgAttr = opt.imagen ? ` data-imagen="${opt.imagen}"` : '';
            return `<p class="firme${k === defaultKey ? ' selected' : ''}" data-base="${k}" data-precio="${opt.precio || ''}" data-precio-normal="${opt.precioNormal || ''}"${imgAttr}>${k}</p>`;
        }).join('');
        return `<div class="base-info"><p class="description">Base</p>${pills}</div>`;
    }

    function imagenInicial(m, v, tipoKey) {
        const opciones = baseOpciones(m, tipoKey);
        if (opciones) {
            const defaultKey = opciones.completa ? 'completa' : Object.keys(opciones)[0];
            if (opciones[defaultKey] && opciones[defaultKey].imagen) return opciones[defaultKey].imagen;
        }
        return v.imagen;
    }

    function almohadaHtml(precioConAlmohada) {
        if (!precioConAlmohada) return '';
        return `<label class="almohada-overlay">
                    <input type="checkbox" class="almohada-check">
                    <img loading="lazy" decoding="async" src="./images/productos/14012528-1new.webp" alt="Almohada Fibra Light">
                    <span>+ Almohada Fibra Light</span>
                </label>`;
    }

    // Precio inicial (oferta y normal) de una variante para la medida elegida.
    function precioDe(m, tipoKey, medida) {
        const v = m[tipoKey];
        const porMedida = tipoKey === 'colchon' && v.tamanos ? (v.tamanos[medida] || v.tamanos['150 x 200cm']) : null;
        return { precio: porMedida ? porMedida.precio : v.precio, precioNormal: porMedida ? porMedida.precioNormal : v.precioNormal };
    }

    // items: [{ m, linea, dimensiones, tipoKey?, firmeza? }]; ctx: { medida, tipoKey?, firmeza?, onPriceChange? }
    function renderCards(grid, items, ctx) {
        const medida = ctx.medida;
        grid.innerHTML = items.map(it => {
            const m = it.m;
            const tipoKey = it.tipoKey || ctx.tipoKey;
            const firmeza = it.firmeza || ctx.firmeza;
            const v = m[tipoKey];
            const { precio: precioInicial, precioNormal: precioNormalInicial } = precioDe(m, tipoKey, medida);
            const descuento = precioNormalInicial ? Math.round((1 - precioInicial / precioNormalInicial) * 100) : null;
            const precioConAlmohada = tipoKey === 'colchon' && v.tamanosConAlmohada
                ? (v.tamanosConAlmohada[medida] || v.tamanosConAlmohada['150 x 200cm'])
                : null;
            const esNewStyle6Colchon = tipoKey === 'colchon' && m.nombre === 'New style 6';
            const ratingSeed = tipoKey + '-' + m.nombre;
            const calificacion = esNewStyle6Colchon ? 4.5 : calificacionFija(ratingSeed);
            const resenas = esNewStyle6Colchon ? 150 : resenasFijas(ratingSeed);
            return `
        <div class="product-card modelo-card" data-nombre="${m.nombre}" data-resenas="${resenas}">
            <div class="product-image">
                ${v.imagen ? `<img loading="lazy" decoding="async" src="${imagenInicial(m, v, tipoKey)}" data-original="${v.imagen}" alt="${m.nombre}">` : ''}
                ${descuento ? `<span class="discount-badge">${descuento}%</span>` : ''}
                <label class="compare-overlay"><input type="checkbox"> Comparar</label>
                ${almohadaHtml(precioConAlmohada)}
            </div>
            <div class="rating"><span class="stars" style="--rating: ${calificacion};"></span><span class="rating-count">${resenas.toLocaleString('es-CL')} reseñas</span></div>
            <p class="linea-reco">${it.linea}</p>
            <p class="linea">${tipoPrefijoMap[tipoKey]} ${m.nombre}</p>
            ${baseHtml(m, tipoKey)}
            ${tamanoHtml(v, tipoKey, medida, it.dimensiones)}
            <div class="firmeza">
                <p class="description">Firmeza</p>
                <p class="firme selected">${firmeza}</p>
            </div>
            ${valoresHtml(m)}
            <p class="price" data-precio="${precioInicial}" data-precio-normal="${precioNormalInicial || ''}"${precioConAlmohada ? ` data-precio-almohada="${precioConAlmohada.precio}" data-precio-normal-almohada="${precioConAlmohada.precioNormal}"` : ''}>$${precioInicial.toLocaleString('es-CL')}${precioNormalInicial ? `<span class="price-old">$${precioNormalInicial.toLocaleString('es-CL')}</span>` : ''}</p>
            <a class="product-cta" href="${esNewStyle6Colchon ? 'index-pdp.html' : '#'}">Ver producto</a>
        </div>
    `;
        }).join('');

        const alCambiarPrecio = card => {
            if (typeof RosenCompare !== 'undefined') RosenCompare.updateLabel(card);
            if (ctx.onPriceChange) ctx.onPriceChange();
        };

        grid.querySelectorAll('.almohada-check').forEach(check => {
            check.addEventListener('change', () => {
                const card = check.closest('.product-card');
                const priceEl = card.querySelector('.price');
                const base = parseInt(priceEl.dataset.precio, 10);
                const baseNormal = priceEl.dataset.precioNormal ? parseInt(priceEl.dataset.precioNormal, 10) : null;
                const alt = priceEl.dataset.precioAlmohada ? parseInt(priceEl.dataset.precioAlmohada, 10) : null;
                const altNormal = priceEl.dataset.precioNormalAlmohada ? parseInt(priceEl.dataset.precioNormalAlmohada, 10) : null;
                const precio = check.checked && alt != null ? alt : base;
                const precioNormal = check.checked && altNormal != null ? altNormal : baseNormal;
                priceEl.innerHTML = `$${precio.toLocaleString('es-CL')}${precioNormal ? `<span class="price-old">$${precioNormal.toLocaleString('es-CL')}</span>` : ''}`;

                const badgeEl = card.querySelector('.discount-badge');
                if (badgeEl && precioNormal) {
                    badgeEl.textContent = Math.round((1 - precio / precioNormal) * 100) + '%';
                }

                const imgEl = card.querySelector('.product-image img');
                if (imgEl) {
                    imgEl.src = check.checked
                        ? './images/productos/16024222-1.webp'
                        : imgEl.dataset.original;
                }

                alCambiarPrecio(card);
            });
        });

        grid.querySelectorAll('.base-info').forEach(baseGroup => {
            const pills = baseGroup.querySelectorAll('.firme');
            if (pills.length < 2) return;
            const card = baseGroup.closest('.product-card');
            const priceEl = card.querySelector('.price');
            const imgEl = card.querySelector('.product-image img');
            pills.forEach(pill => {
                pill.addEventListener('click', () => {
                    pills.forEach(p => p.classList.remove('selected'));
                    pill.classList.add('selected');
                    const precio = parseInt(pill.dataset.precio, 10);
                    const precioNormal = pill.dataset.precioNormal ? parseInt(pill.dataset.precioNormal, 10) : null;
                    priceEl.dataset.precio = precio;
                    if (precioNormal) priceEl.dataset.precioNormal = precioNormal;
                    priceEl.innerHTML = `$${precio.toLocaleString('es-CL')}${precioNormal ? `<span class="price-old">$${precioNormal.toLocaleString('es-CL')}</span>` : ''}`;

                    const badgeEl = card.querySelector('.discount-badge');
                    if (badgeEl && precioNormal) {
                        badgeEl.textContent = Math.round((1 - precio / precioNormal) * 100) + '%';
                    }

                    if (imgEl) {
                        imgEl.src = pill.dataset.imagen || imgEl.dataset.original;
                    }

                    alCambiarPrecio(card);
                });
            });
        });
    }

    // Cantidad de modelos reales de cada línea para un tamaño y tipo (todas las firmezas), p. ej. { 'Línea Premium': 13, ... }.
    function conteoPorLinea(tamano, tipoKey) {
        const r = {};
        modelosData.filter(d => d.tamano === tamano).forEach(d => {
            r[d.linea] = Object.values(d.porFirmeza).flat().filter(m => m[tipoKey] !== undefined).length;
        });
        return r;
    }

    // Líneas con más modelos que las demás. No marca nada si hay una sola línea con modelos o si todas empatan.
    function lineasConMasModelos(conteo) {
        const con = Object.entries(conteo).filter(([, n]) => n > 0);
        if (con.length < 2) return [];
        const max = Math.max(...con.map(([, n]) => n));
        if (con.every(([, n]) => n === max)) return [];
        return con.filter(([, n]) => n === max).map(([l]) => l);
    }

    function textoCantidad(n) {
        return n + (n === 1 ? ' modelo' : ' modelos');
    }

    return { renderCards, precioDe, tipoPrefijoMap, conteoPorLinea, lineasConMasModelos, textoCantidad };
})();
