// src/pages/Explore.jsx
import { useState, useEffect, useCallback } from 'react'
import ShowCard from '../components/ShowCard'
import LoadingGrid from '../components/LoadingGrid'
import FilterPanel from '../components/FilterPanel'

const EMPTY_FILTERS = { name: '', actor: '', genre: '', year: '' }

// ─── Helpers de la API ──────────────────────────────────────────────────────

// 1. Buscar series por nombre
async function fetchByName(query) {
  const res = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`)
  if (!res.ok) throw new Error('Error al buscar series')
  const data = await res.json()
  return data.map(item => item.show) // {score, show} → show
}

// 2. Buscar series por actor:
//    Paso A: buscar la persona
//    Paso B: obtener sus créditos de actuación con el show embebido
async function fetchByActor(actorName) {
  const peopleRes = await fetch(`https://api.tvmaze.com/search/people?q=${encodeURIComponent(actorName)}`)
  if (!peopleRes.ok) throw new Error('Error al buscar actores')
  const people = await peopleRes.json()

  if (people.length === 0) return []

  // Tomamos los primeros 3 resultados de personas para ampliar la búsqueda
  const topPeople = people.slice(0, 3).map(p => p.person)

  const creditsPromises = topPeople.map(person =>
    fetch(`https://api.tvmaze.com/people/${person.id}/castcredits?embed=show`)
      .then(r => r.ok ? r.json() : [])
      .catch(() => [])
  )

  const allCredits = await Promise.all(creditsPromises)

  // Extraer shows únicos (sin duplicados por ID)
  const showsMap = new Map()
  allCredits.flat().forEach(credit => {
    const show = credit?._embedded?.show
    if (show && !showsMap.has(show.id)) showsMap.set(show.id, show)
  })

  return Array.from(showsMap.values())
}

// 3. Cargar listado general paginado
async function fetchAllShows(page) {
  const res = await fetch(`https://api.tvmaze.com/shows?page=${page}`)
  if (!res.ok) throw new Error('No se pudo cargar la información')
  return res.json()
}

// ─── Filtros client-side ────────────────────────────────────────────────────

function applyClientFilters(shows, { genre, year }) {
  return shows.filter(show => {
    const matchGenre = !genre || show.genres?.includes(genre)
    const matchYear  = !year  || show.premiered?.startsWith(year)
    return matchGenre && matchYear
  })
}

// ─── Componente ──────────────────────────────────────────────────────────────

export default function Explore() {
  const [allShows, setAllShows]     = useState([])   // listado general paginado
  const [results, setResults]       = useState([])   // resultado final a mostrar
  const [loading, setLoading]       = useState(true)
  const [searching, setSearching]   = useState(false)
  const [error, setError]           = useState(null)
  const [page, setPage]             = useState(0)
  const [hasMore, setHasMore]       = useState(true)

  const [filters, setFilters]       = useState(EMPTY_FILTERS)
  const [mode, setMode]             = useState('all') // 'all' | 'name' | 'actor'

  // ── Carga inicial del listado general ──
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetchAllShows(page)
      .then(data => {
        if (data.length === 0) { setHasMore(false); return }
        setAllShows(prev => page === 0 ? data : [...prev, ...data])
        setLoading(false)
      })
      .catch(err => {
        if (err.name !== 'AbortError') { setError(err.message); setLoading(false) }
      })

    return () => controller.abort()
  }, [page])

  // ── Lógica central: decide qué mostrar según filtros y modo ──
  const runSearch = useCallback(async () => {
    const { name, actor, genre, year } = filters
    const hasTextSearch = name.trim() || actor.trim()

    // Si no hay búsqueda de texto → filtrar el listado ya cargado
    if (!hasTextSearch) {
      setResults(applyClientFilters(allShows, { genre, year }))
      return
    }

    // Si hay búsqueda de texto → ir a la API
    setSearching(true)
    setError(null)
    try {
      let shows = []

      if (actor.trim()) {
        // Búsqueda por actor (prioridad sobre nombre si ambos están activos)
        shows = await fetchByActor(actor.trim())
      } else if (name.trim()) {
        // Búsqueda por nombre de serie
        shows = await fetchByName(name.trim())
      }

      // Aplicar filtros adicionales de género y año sobre los resultados
      setResults(applyClientFilters(shows, { genre, year }))
    } catch (err) {
      setError(err.message)
    } finally {
      setSearching(false)
    }
  }, [filters, allShows])

  // ── Debounce: esperar 400ms tras cambio en filtros ──
  useEffect(() => {
    const timer = setTimeout(runSearch, 400)
    return () => clearTimeout(timer)
  }, [runSearch])

  // ── Cuando cambia el modo, limpiar los campos del modo anterior ──
  const handleModeChange = (newMode) => {
    setMode(newMode)
    if (newMode === 'name')  setFilters(f => ({ ...f, actor: '' }))
    if (newMode === 'actor') setFilters(f => ({ ...f, name: '' }))
    if (newMode === 'all')   setFilters(f => ({ ...f, name: '', actor: '' }))
  }

  const isLoading = loading || searching
  const isEmpty   = !isLoading && !error && results.length === 0
  const hasSearch = filters.name || filters.actor || filters.genre || filters.year

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-1">Explorar Series</h1>
      <p className="text-sm mb-6" style={{ color: 'var(--color-muted)' }}>
        Datos en tiempo real desde la TVMaze API
      </p>

      {/* Panel de filtros */}
      <FilterPanel
        filters={filters}
        onChange={setFilters}
        mode={mode}
        onModeChange={handleModeChange}
        resultsCount={results.length}
        loading={isLoading}
      />

      {/* ── Estados ── */}

      {/* Loading */}
      {isLoading && (
        <div aria-live="polite">
          {searching ? (
            <div className="flex items-center gap-3 py-8" role="status">
              <div className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin"
                   style={{ borderColor: 'var(--color-accent)', borderTopColor: 'transparent' }} />
              <span className="text-sm" style={{ color: 'var(--color-muted)' }}>
                {filters.actor ? `Buscando series de "${filters.actor}"...` : 'Buscando...'}
              </span>
            </div>
          ) : (
            <LoadingGrid />
          )}
        </div>
      )}

      {/* Error */}
      {!isLoading && error && (
        <div role="alert" className="flex flex-col items-center gap-4 py-16 text-center">
          <span className="text-4xl" aria-hidden="true">⚠️</span>
          <p style={{ color: 'var(--color-muted)' }}>{error}</p>
          <button
            onClick={() => { setError(null); setPage(0) }}
            className="px-4 py-2 rounded-xl text-sm font-semibold"
            style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}>
            Reintentar
          </button>
        </div>
      )}

      {/* Empty */}
      {isEmpty && (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <span className="text-4xl" aria-hidden="true">🎬</span>
          <p style={{ color: 'var(--color-muted)' }}>
            {hasSearch
              ? `Sin resultados para los filtros aplicados.`
              : 'No hay series disponibles.'}
          </p>
          {hasSearch && (
            <button onClick={() => setFilters(EMPTY_FILTERS)}
                    className="text-sm underline"
                    style={{ color: 'var(--color-accent)' }}>
              Limpiar filtros
            </button>
          )}
        </div>
      )}

      {/* Grid de resultados */}
      {!isLoading && !error && results.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {results.map(show => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>

          {/* Cargar más (solo en modo explorar todo sin texto) */}
          {!hasSearch && hasMore && (
            <div className="text-center mt-10">
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={loading}
                className="px-6 py-2 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80 disabled:opacity-40"
                style={{ border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}>
                {loading ? 'Cargando...' : 'Cargar más series'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}