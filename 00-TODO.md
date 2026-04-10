# TODO - webapp-tcg-nuxt

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

## UX / Visual
- [ ] Indicador de progreso al procesar listas largas (ej: "3/12 cartas cargadas...")
- [ ] Mensaje cuando el collage está vacío, invitando a pegar una lista
- [ ] Modo claro / oscuro
- [ ] Skeleton de carga en las imágenes del deck list
- [ ] Toast de confirmación al descargar el PNG
- [ ] Indicar visualmente qué cartas no se encontraron (ahora solo aparece texto)
- [ ] Botón para limpiar la lista y el deck de una vez

## Mobile
- [ ] Tabs (Controles / Preview) en pantallas pequeñas para el collage
- [ ] Botones +/- más grandes en el input de columnas para móvil

## Técnico / Calidad
- [ ] Extraer panel de configuración (cols, gap, colores, badge) en componente reutilizable
- [ ] Extraer panel de deck list en componente reutilizable
- [ ] Mensajes de error en pantalla cuando la API falla (ahora solo hay console.error)
- [ ] Límite de cartas en el deck list con aviso al usuario
- [ ] Rate limiting en el procesamiento para no saturar las APIs

## SEO / Meta
- [ ] Open Graph tags para preview al compartir el link
- [ ] Favicon real (`/public/icon.png`)
- [ ] Descripción meta por página
