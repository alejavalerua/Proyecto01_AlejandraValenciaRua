---
theme: ../../theme
transition: none
layout: cover
title: Proyecto 01 - React — Aplicación Integradora
exportFilename: 43-proyecto-01
---

# Proyecto 01
## React — Aplicación Integradora

✏️ 2026-01

---
layout: default-y-center
---

## Qué hay que hacer?

::contents::
Construir una **aplicación React de múltiples páginas** (SPA) que integre **todos los conceptos** vistos hasta la Semana 8.

A partir de la **imagen de referencia** que se les suministra, deben recrear la app.

Ustedes deciden cómo organizar el código, qué componentes crear, y cómo nombrarlos. La rúbrica evalúa **qué funciona**, no cómo lo estructuraron.

::header::
Proyecto 01

::footer::
{{ $page }} / {{ $nav.total }}

---
layout: default-y-center
---

## La API

::contents::
Deben usar una **API pública gratuita** (sin API key, sin registro).

Escojan **una** de las siguientes opciones:

| API | URL base | Datos disponibles |
|-----|----------|-------------------|
| Rick and Morty | `https://rickandmortyapi.com/api/character` | Personajes, imágenes, estado, especie |
| REST Countries | `https://restcountries.com/v3.1/all` | Países, banderas, capitales, población, región |
| DummyJSON Products | `https://dummyjson.com/products` | Productos, imágenes, precio, categoría, rating |
| TVMaze | `https://api.tvmaze.com/shows` | Series TV, imágenes, géneros, rating, sinopsis |
| Jikan (MyAnimeList) | `https://api.jikan.moe/v4/anime` | Anime, imágenes, score, géneros, sinopsis |
| TheMealDB | `https://www.themealdb.com/api/json/v1/1/search.php?s=` | Recetas, imágenes, categorías, instrucciones |
| Art Institute of Chicago | `https://api.artic.edu/api/v1/artworks` | Obras de arte, artista, fecha, imágenes |
| PokeAPI | `https://pokeapi.co/api/v2/pokemon?limit=50` | Pokémon, sprites, tipos, stats |
| Digimon | `https://digimon-api.vercel.app/api/digimon` | Digimon, imágenes, nivel |
| SpaceX | `https://api.spacexdata.com/v4/launches` | Lanzamientos, nombres, fechas, parches |

Pueden proponer otra API — con aprobación del profesor. No se permite que dos estudiantes usen la misma API.

::header::
Proyecto 01

::footer::
{{ $page }} / {{ $nav.total }}

---
layout: default-y-center
---

## Requisitos técnicos

::contents::
✅ Proyecto creado con **Vite + React**

✅ **React Router** con mínimo 6 rutas (incluida 404 y ruta dinámica `:id`):
- Página de inicio (landing/hero)
- Página de exploración (grid de tarjetas con fetch de lista)
- Página de detalle (fetch individual por ID, ruta dinámica)
- Página de favoritos (items guardados en estado)
- Página de contacto (formulario controlado)
- Página 404

✅ **Dos fetches**: lista y detalle por ID con `useEffect` + `async/await`

✅ Estados de **loading** y **error** visibles en la UI

✅ **Búsqueda** y **filtrado** funcional en tiempo real

✅ **Favoritos** en estado (agregar/quitar, persisten entre rutas)

✅ **Formulario controlado** con validación (nombre, email, mensaje) y botón disabled

✅ **Toast** de éxito (al cargar datos), error (al fallar fetch), e info (favoritos/formulario) — con auto-dismiss

✅ **Modal de confirmación** con `<dialog>` + `useRef` + `showModal()`

✅ **Modal con dark pattern** intencional + comentario explicativo en el código

✅ **SVG inline** (logo o icono, directamente en JSX)

✅ **Tailwind CSS** para todo el styling (no CSS custom) — responsive con prefijos

✅ **Accesibilidad**: `alt`, `role`, `aria-label`, `htmlFor`, HTML semántico

✅ Mínimo **8 componentes** en archivos `.jsx` separados

❌ No se aceptan datos hardcodeados

❌ No se acepta todo en un solo componente

❌ No se acepta CSS custom ni otros frameworks (Bootstrap, etc.)

::header::
Proyecto 01

::footer::
{{ $page }} / {{ $nav.total }}

---
layout: default-y-center
---

## Pistas

::contents::
No hay código aquí — ya vieron todos estos patrones en clase. Si se traban, revisen las presentaciones de las semanas anteriores:

- **Semana 5–6:** React Router, `useParams`, `NavLink`
- **Semana 6:** `useEffect`, `fetch`, `async/await`, estados de carga/error
- **Semana 7:** Formularios controlados, validación, `useState`
- **Semana 7:** `useRef`, `<dialog>`, `showModal()`, dark patterns
- **Semana 8:** Tailwind CSS, responsive, grid, utilidades
- **Semana 8:** SVG inline, accesibilidad (`alt`, `role`, `aria-label`, semántica)

Para los **favoritos**: piensen en dónde debe vivir ese estado para que persista entre rutas.

Para el **toast**: pueden usar una librería como `react-hot-toast`, `sonner`, o `react-toastify` (instalar con `npm install`). También pueden implementarlo desde cero con `useState` + `setTimeout`.

::header::
Proyecto 01

::footer::
{{ $page }} / {{ $nav.total }}

---
layout: default-y-center
---

## Rúbrica

::contents::

| Categoría | Requerimiento | Pts |
|-----------|--------------|-----|
| ⛔ Penalización | `node_modules` en el `.zip` | -8 |
| ⛔ Penalización | Estructura incorrecta de proyecto | -2 |
| ⛔ Penalización | Datos hardcodeados en lugar de API | -4 |
| **Routing** | BrowserRouter + Routes configurado | 1 |
| | 5+ rutas funcionales incluyendo 404 | 1 |
| | Ruta dinámica `/explorar/:id` con `useParams` | 1 |
| **Data Fetching** | `useEffect` + `async/await` + `try/catch` en `/explorar` | 1 |
| | Fetch individual por ID en `/explorar/:id` | 1 |
| | Loading y error visibles en la UI | 1 |
| **Componentes** | 8+ componentes en archivos `.jsx` separados | 1 |
| | Props usados correctamente (padre → hijo) | 1 |
| | Favoritos funcional (agregar/quitar, persiste entre rutas) | 1 |
| **Formulario** | Controlado con `useState` por campo | 1 |
| | Validación visible (requerido, email, longitud) | 1 |
| | Botón disabled cuando inválido o enviando | 1 |
| **UX** | Toast éxito + error + info con auto-dismiss | 1 |
| | Modal de confirmación con `<dialog>` + `useRef` + `showModal()` | 1 |
| | Modal con dark pattern identificado + comentario explicativo | 1 |
| | SVG inline (logo o icono) | 1 |
| | Accesibilidad: `alt`, `role`, `htmlFor`, HTML semántico | 1 |
| **Tailwind** | Similitud visual con la referencia | 1 |
| | Responsive con prefijos (`md:`, `lg:`) | 1 |
| | Grid de Tailwind para grilla de tarjetas | 1 |
| | Solo clases de Tailwind (no CSS custom) | 1 |
| | **Total** | **21** |

::header::
Proyecto 01

::footer::
{{ $page }} / {{ $nav.total }}

---
layout: default-y-center
---

## Entrega

::contents::
📁 **Formato:** Carpeta del proyecto comprimida en `.zip`
*(sin incluir `node_modules`)*

📅 **Fecha límite:** según lo indicado en el aula virtual

📤 **Cómo entregar:** subir el `.zip` al aula virtual

⚠️ **Importante:**
- Este es un proyecto **individual** (20% de la nota final)
- Deben escoger **una** API de la lista (o proponer otra con aprobación)
- La app debe verse y funcionar similar a la **referencia visual** proporcionada
- El código será revisado — no se acepta código copiado de otros estudiantes

::header::
Proyecto 01

::footer::
{{ $page }} / {{ $nav.total }}

---
layout: cover
---

# 🚀
