// src/components/FilterPanel.jsx

const GENRES = [
  'Drama', 'Comedy', 'Thriller', 'Crime', 'Horror',
  'Sci-Fi', 'Romance', 'Action', 'Adventure', 'Fantasy',
  'Mystery', 'Animation', 'Sports', 'Medical', 'Family',
]

const currentYear = new Date().getFullYear()
const YEARS = Array.from({ length: currentYear - 1949 }, (_, i) => currentYear - i)

const inputStyle = {
  backgroundColor: 'var(--color-card)',
  border: '1px solid var(--color-border)',
  color: 'var(--color-text)',
  borderRadius: '0.75rem',
  padding: '0.5rem 0.875rem',
  fontSize: '0.875rem',
  outline: 'none',
  width: '100%',
}

export default function FilterPanel({ filters, onChange, mode, onModeChange, resultsCount, loading }) {
  const handleChange = (key, value) => onChange({ ...filters, [key]: value })

  const clearFilter = (key) => onChange({ ...filters, [key]: '' })

  const activeTags = Object.entries(filters)
    .filter(([, v]) => v !== '')
    .map(([k, v]) => ({ key: k, value: v }))

  return (
    <section aria-label="Filtros de búsqueda" className="mb-6 space-y-4">

      {/* Modo de búsqueda */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Seleccionar modo de búsqueda">
        {[
          { id: 'all',   label: 'Explorar todo' },
          { id: 'name',  label: 'Por nombre'    },
          { id: 'actor', label: 'Por actor'      },
        ].map(m => (
          <button
            key={m.id}
            onClick={() => onModeChange(m.id)}
            aria-pressed={mode === m.id}
            className="px-4 py-1.5 rounded-full text-xs font-medium transition-all"
            style={{
              backgroundColor: mode === m.id ? 'var(--color-primary)' : 'transparent',
              color:           mode === m.id ? 'var(--color-text)'    : 'var(--color-muted)',
              border:          mode === m.id ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
            }}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Campos de filtro */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

        {/* Nombre de serie — disponible en modo "name" y "all" */}
        <div style={{ opacity: mode === 'actor' ? 0.35 : 1, pointerEvents: mode === 'actor' ? 'none' : 'auto' }}>
          <label htmlFor="filter-name" className="block text-xs font-medium mb-1 uppercase tracking-wider"
                 style={{ color: 'var(--color-muted)' }}>
            Nombre de serie
          </label>
          <input
            id="filter-name"
            type="search"
            value={filters.name}
            onChange={e => handleChange('name', e.target.value)}
            placeholder="Ej: Breaking Bad"
            aria-label="Buscar por nombre de serie"
            style={inputStyle}
          />
        </div>

        {/* Nombre de actor — disponible en modo "actor" y "all" */}
        <div style={{ opacity: mode === 'name' ? 0.35 : 1, pointerEvents: mode === 'name' ? 'none' : 'auto' }}>
          <label htmlFor="filter-actor" className="block text-xs font-medium mb-1 uppercase tracking-wider"
                 style={{ color: 'var(--color-muted)' }}>
            Nombre de actor
          </label>
          <input
            id="filter-actor"
            type="search"
            value={filters.actor}
            onChange={e => handleChange('actor', e.target.value)}
            placeholder="Ej: Bryan Cranston"
            aria-label="Buscar por nombre de actor"
            style={inputStyle}
          />
        </div>

        {/* Género */}
        <div>
          <label htmlFor="filter-genre" className="block text-xs font-medium mb-1 uppercase tracking-wider"
                 style={{ color: 'var(--color-muted)' }}>
            Género
          </label>
          <select
            id="filter-genre"
            value={filters.genre}
            onChange={e => handleChange('genre', e.target.value)}
            aria-label="Filtrar por género"
            style={inputStyle}
          >
            <option value="">Todos los géneros</option>
            {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        {/* Año */}
        <div>
          <label htmlFor="filter-year" className="block text-xs font-medium mb-1 uppercase tracking-wider"
                 style={{ color: 'var(--color-muted)' }}>
            Año de estreno
          </label>
          <select
            id="filter-year"
            value={filters.year}
            onChange={e => handleChange('year', e.target.value)}
            aria-label="Filtrar por año de estreno"
            style={inputStyle}
          >
            <option value="">Cualquier año</option>
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>

      {/* Tags activos + contador */}
      <div className="flex flex-wrap items-center gap-2 min-h-[28px]">
        {activeTags.map(({ key, value }) => (
          <span key={key}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: 'rgba(139,26,58,0.15)',
                  color: 'var(--color-accent)',
                  border: '1px solid rgba(139,26,58,0.3)',
                }}>
            {value}
            <button onClick={() => clearFilter(key)}
                    aria-label={`Quitar filtro: ${value}`}
                    className="hover:opacity-70 transition-opacity leading-none">
              ✕
            </button>
          </span>
        ))}

        {activeTags.length > 0 && (
          <button onClick={() => onChange({ name: '', actor: '', genre: '', year: '' })}
                  className="text-xs transition-colors hover:underline"
                  style={{ color: 'var(--color-muted)' }}>
            Limpiar todo
          </button>
        )}

        {!loading && (
          <span className="ml-auto text-xs" style={{ color: 'var(--color-muted)' }}>
            {resultsCount} resultado{resultsCount !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    </section>
  )
}