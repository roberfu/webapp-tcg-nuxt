# TODO - webapp-tcg-nuxt

## Completado ✅

- [x] Generador de collage Magic: The Gathering
- [x] Generador de collage Pokémon TCG
- [x] Proxy server-side para imágenes (fix CORS en Chrome)
- [x] Búsqueda por nombre exacto en Magic (Scryfall `/cards/named`)
- [x] Búsqueda por set y número de carta en Pokémon TCG
- [x] Badges de cantidad con formas: círculo, diamante, hexágono
- [x] Procesamiento de cartas en lotes de 4 (performance)
- [x] Progreso visible al procesar listas ("Procesando 4/12...")
- [x] Collage ajusta ancho según cantidad de cartas (horizontal responsive)
- [x] Mensajes diferenciados: "no encontradas" vs "error de red/API"
- [x] Footer visible en todas las páginas (layout flex)
- [x] i18n Español / English con selector de bandera (imágenes flagcdn.com, cross-browser)
- [x] Idioma persistido en localStorage
- [x] Página `/help` con guía visual por pasos (Magic y Pokémon)
- [x] Página `/about` con descripción del equipo y agradecimientos a servicios
- [x] Links de Ayuda y Sobre nosotros en el footer
- [x] Responsivo: index apila tarjetas en móvil, padding adaptable

---

## Funcionalidades nuevas

### Collage
- [ ] Previsualización de cartas al hacer hover en la lista del deck
- [ ] Soporte para más de 4 copias de una carta (útil en Magic para básicas como lands)
- [ ] Ordenar las cartas en el collage (por nombre, por cantidad, por tipo)
- [ ] Importar deck desde archivo `.txt`
- [ ] Guardar/cargar configuración de collage (cols, gap, colores) en localStorage

### Búsqueda
- [ ] Buscador de cartas individual con sugerencias en tiempo real
- [ ] Filtros: por set, por rareza, por tipo

### Páginas pendientes
- [ ] `/database` — explorador de cartas con búsqueda y filtros
- [ ] `/collection` — colección personal persistida en localStorage o base de datos

---

## UX / Visual
- [ ] Mensaje cuando el collage está vacío, invitando a pegar una lista
- [ ] Modo claro / oscuro
- [ ] Skeleton de carga en las imágenes del deck list
- [ ] Toast de confirmación al descargar el PNG
- [ ] Botón para limpiar la lista y el deck de una vez

## Mobile
- [ ] Tabs (Controles / Preview) en pantallas pequeñas para el collage
- [ ] Botones +/- más grandes en el input de columnas para móvil

## Técnico / Calidad
- [ ] Extraer panel de configuración (cols, gap, colores, badge) en componente reutilizable
- [ ] Extraer panel de deck list en componente reutilizable
- [ ] Límite de cartas en el deck list con aviso al usuario

## SEO / Meta
- [ ] Open Graph tags para preview al compartir el link
- [ ] Favicon real (`/public/icon.png`)
- [ ] Descripción meta por página
