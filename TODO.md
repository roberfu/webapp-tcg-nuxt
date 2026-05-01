# TODO - TCG Collage

## Completado ✅

- [x] Generador de collage Magic: The Gathering
- [x] Generador de collage Pokémon TCG
- [x] Proxy server-side para imágenes (fix CORS en Chrome)
- [x] Búsqueda por nombre exacto en Magic (Scryfall `/cards/named`)
- [x] Búsqueda por set y número de carta en Pokémon TCG
- [x] Badges de cantidad con formas: círculo, diamante, hexágono
- [x] Procesamiento de cartas en lotes de 4 (performance)
- [x] Progreso visible al procesar listas ("Procesando 4/12...")
- [x] Preservar orden original de cartas al procesar (fix race condition en Promise.all)
- [x] Collage ajusta ancho según cantidad de cartas (horizontal responsive)
- [x] Mensajes diferenciados: "no encontradas" vs "error de red/API"
- [x] Footer visible en todas las páginas (layout flex)
- [x] i18n Español / English con selector de bandera (imágenes flagcdn.com, cross-browser)
- [x] Idioma persistido en localStorage
- [x] Página `/help` con guía visual por pasos (Magic y Pokémon)
- [x] Página `/about` con descripción del equipo y agradecimientos a servicios
- [x] Links de Ayuda y Sobre nosotros en el footer
- [x] Responsivo: index apila tarjetas en móvil, padding adaptable
- [x] Descripción y enlace a ayuda en la portada
- [x] Rebrand: logo horizontal en homepage, isotipo como favicon, OG image con logo
- [x] Paleta de colores personalizada (brand-50 a brand-950) basada en el logo
- [x] Meta description por página (`useSeoMeta`)
- [x] JSON-LD schema (WebApplication)
- [x] `sitemap.xml` + `robots.txt` con referencia al sitemap
- [x] Google Search Console verificado y sitemap enviado
- [x] Exportar collage como PDF (grid 3x3 fijo, una página por cada 9 cartas, JPEG 0.80)

---

## Funcionalidades nuevas

### Collage
- [ ] **Tooltip con preview de carta** — Al hacer hover sobre una carta en la lista del deck, mostrar la imagen flotante. Evita tener que generar el collage para ver cómo quedó. *Esfuerzo: bajo*
- [ ] **Ordenar cartas en el collage** — Dropdown para ordenar por: orden de entrada (actual), nombre A-Z, cantidad descendente, tipo (Magic). *Esfuerzo: medio*
- [ ] **Importar deck desde archivo `.txt`** — Botón para subir un archivo de texto con la lista de cartas. Útil para mazos guardados localmente. *Esfuerzo: medio*
- [ ] **Exportar deck como `.txt`** — Botón para descargar la lista procesada como archivo de texto. Útil para compartir mazos. *Esfuerzo: bajo*
- [ ] **Soporte >4 copias en Magic** — Lands y básicas pueden ir a 60+ copias. Quitar el `Math.min(60, ...)` o hacerlo configurable por carta. *Esfuerzo: muy bajo*

### Búsqueda
- [ ] **Buscador de cartas con autocomplete** — Input que busque en Scryfall/Pokémon TCG API mientras escribes. Podría vivir en `/database`. *Esfuerzo: alto*
- [ ] **Filtros: por set, por rareza, por tipo** — Complemento del buscador para refinar resultados. *Esfuerzo: medio*

### Páginas pendientes
- [ ] `/database` — Explorador de cartas con búsqueda, filtros y autocomplete. *Esfuerzo: alto*
- [ ] `/collection` — Colección personal persistida en localStorage o base de datos. *Esfuerzo: alto*
- [ ] **One Piece TCG** — Desbloquear la tarjeta de One Piece cuando haya API disponible. *Esfuerzo: alto*

---

## UX / Visual

- [ ] **Botón "Limpiar todo"** — Resetear textarea, deck, canvas y status de una vez. *Esfuerzo: muy bajo*
- [ ] **Toast de confirmación al descargar** — Notificación visual ("JPG descargado" / "PDF descargado") en vez de solo cambiar el texto de status. *Esfuerzo: bajo*
- [ ] **Guardar configuración en localStorage** — Que cols, gap, bg, badgeColor, borderColor, badgeShape persistan entre sesiones. *Esfuerzo: bajo*
- [ ] **Skeleton loading en deck list** — Mientras se procesan las cartas, mostrar placeholders grises en vez de espacio vacío. *Esfuerzo: bajo*
- [ ] **Mensaje cuando el collage está vacío** — Invitar a pegar una lista cuando no hay cartas cargadas. *Esfuerzo: muy bajo*
- [ ] **Modo claro / oscuro** — Toggle light/dark. Requiere duplicar toda la paleta `brand-*` con variantes claras. *Esfuerzo: medio*

## Mobile

- [ ] **Tabs (Controles / Preview)** — En pantallas <640px, alternar entre controles y preview en vez de apilar todo verticalmente. *Esfuerzo: medio*
- [ ] **Botones +/- más grandes** — Inputs de columnas y filas más táctiles en móvil. *Esfuerzo: muy bajo*
- [ ] **Web Share API** — Botón "Compartir" que use el share nativo del móvil o copie al portapapeles en desktop. *Esfuerzo: bajo*

## Técnico / Calidad

- [ ] **Componente `DeckInput`** — Extraer textarea + botón procesar + lista de cartas en componente reutilizable (Magic y Pokémon comparten 90% del código). *Esfuerzo: medio*
- [ ] **Componente `CollageSettings`** — Extraer panel de configuración (cols, gap, bg, badge, border, download mode). *Esfuerzo: medio*
- [ ] **Límite de cartas con aviso** — Si el usuario pega 200+ cartas, mostrar un warning antes de procesar. *Esfuerzo: bajo*

---

## Orden recomendado de implementación

1. Guardar configuración en localStorage (muy bajo esfuerzo, alto impacto)
2. Botón "Limpiar todo" (muy bajo esfuerzo)
3. Tooltip preview de carta (bajo esfuerzo, mejora UX notable)
4. Toast de confirmación (bajo esfuerzo)
5. Importar deck desde `.txt` (medio esfuerzo, funcionalidad pedida frecuentemente)
