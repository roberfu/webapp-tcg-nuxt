# webapp-tcg-nuxt

Aplicación web para generar collages de cartas TCG (Pokémon y Magic: The Gathering) a partir de listas de deck. Permite descargar el resultado como imagen PNG.

Creada por un grupo de amigos aficionados a Magic: The Gathering y los juegos de cartas coleccionables, construida en nuestro tiempo libre con mucho cariño.

## Funcionalidades

- Generador de collages para **Magic: The Gathering** y **Pokémon TCG**
- Búsqueda de cartas por nombre exacto usando APIs públicas
- Configuración del collage: columnas, espaciado, color de fondo, badge y borde
- Badges de cantidad sobre cada carta (formas: círculo, diamante, hexágono)
- Descarga del collage como PNG con nombre automático y fecha
- Preview en tiempo real del collage generado
- Progreso visible al procesar listas (`Procesando 4/12...`)
- i18n: interfaz en **Español** 🇨🇱 e **Inglés** 🇺🇸 con selector de bandera
- Idioma persistido en localStorage entre sesiones

## Páginas

| Ruta | Estado | Descripción |
|---|---|---|
| `/` | Completa | Página principal con selector de juego |
| `/collage-magic` | Completa | Generador de collages Magic: The Gathering |
| `/collage-pokemon` | Completa | Generador de collages Pokémon TCG |
| `/help` | Completa | Guía visual de uso con capturas de pantalla |
| `/about` | Completa | Sobre el equipo y agradecimientos a servicios |
| `/database` | En desarrollo | Explorador de cartas |
| `/collection` | En desarrollo | Colección personal |

## Formato de listas

**Magic: The Gathering**
```
1 Lightning Bolt
2 Counterspell
1,"Black Lotus"
```

**Pokémon TCG**
```
4 Teal Mask Ogerpon ex TWM 25
2 Mew Ex MEW 151
1 Switch MEW 206
```

## APIs e imágenes

- [Scryfall API](https://scryfall.com/docs/api) — Magic: The Gathering (búsqueda por nombre exacto)
- [Scrydex](https://scrydex.com) — Imágenes de alta calidad de cartas Magic
- [Pokémon TCG API](https://docs.pokemontcg.io/) — Pokémon Trading Card Game (cartas e imágenes)

## Tech Stack

- [Nuxt 4](https://nuxt.com/) — Framework Vue con SSR
- [Vue 3](https://vuejs.org/) — Framework UI
- [Tailwind CSS](https://tailwindcss.com/) — Estilos
- [html-to-image](https://github.com/bubkoo/html-to-image) — Exportación del collage como PNG
- Nitro server routes — Proxy de imágenes para CORS
- [Vercel](https://vercel.com) — Hosting y deploy

## Requisitos

- Node.js (LTS)
- Yarn

## Desarrollo

```bash
# Instalar dependencias
yarn install

# Iniciar servidor de desarrollo
yarn dev

# Construir para producción
yarn build

# Vista previa de producción
yarn preview
```

## Deploy

El proyecto está configurado para desplegarse en **Vercel** en modo SSR. Los server routes (`/api/image-proxy`) se despliegan automáticamente como Vercel Functions.

## Reportar problemas

Si encuentras algún problema, repórtalo en [GitHub Issues](https://github.com/roberfg/webapp-tcg-nuxt/issues).
