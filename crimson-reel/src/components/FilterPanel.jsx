export default function FilterPanel({ 
  filters, 
  onChange, 
  availableGenres, 
  availableLanguages,
  resultsCount, 
  loading 
}) {
  
  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value })
  }

  const clearFilter = (key) => {
    onChange({ ...filters, [key]: '' })
  }

  const activeTags = Object.entries(filters)
    .filter(([, v]) => v !== '')
    .map(([k, v]) => ({ key: k, value: v }))

  return (
    <section aria-label="Filtros de búsqueda" className="mb-6 space-y-4">

      {/* Campos de filtro */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

          {/* Buscador por nombre */}
          <div className="md:col-span-5">
            <label htmlFor="filter-name" className="block text-xs font-medium mb-1 uppercase tracking-wider" style={{ color: 'var(--color-muted)' }}>
              Nombre de serie
            </label>
            <input
              id="filter-name"
              type="search"
              value={filters.name}
              onChange={e => handleChange('name', e.target.value)}
              placeholder="Ej: Breaking Bad, The Office..."
              className="w-full px-5 py-3 rounded-xl text-sm focus:outline-none focus:border-[var(--color-accent)]"
              style={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)'
              }}
            />
          </div>

          {/* Género (dinámico) */}
          <div className="md:col-span-3">
            <label htmlFor="filter-genre" className="block text-xs font-medium mb-1 uppercase tracking-wider" style={{ color: 'var(--color-muted)' }}>
              Género
            </label>
            <select
              id="filter-genre"
              value={filters.genre}
              onChange={e => handleChange('genre', e.target.value)}
              className="w-full px-5 py-3 rounded-xl text-sm focus:outline-none focus:border-[var(--color-accent)]"
              style={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)'
              }}
            >
              <option value="">Todos los géneros</option>
              {availableGenres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          {/* Idioma (dinámico) */}
          <div className="md:col-span-3">
            <label htmlFor="filter-language" className="block text-xs font-medium mb-1 uppercase tracking-wider" style={{ color: 'var(--color-muted)' }}>
              Idioma
            </label>
            <select
              id="filter-language"
              value={filters.language}
              onChange={e => handleChange('language', e.target.value)}
              className="w-full px-5 py-3 rounded-xl text-sm focus:outline-none focus:border-[var(--color-accent)]"
              style={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)'
              }}
            >
              <option value="">Todos los idiomas</option>
              {availableLanguages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* Botón Limpiar */}
          <div className="md:col-span-1 flex items-end">
            <button
              onClick={() => onChange({ name: '', genre: '', language: '' })}
              className="w-full py-3 rounded-xl text-sm font-medium hover:bg-[var(--color-card)] transition-colors"
              style={{ 
                border: '1px solid var(--color-border)', 
                color: 'var(--color-muted)' 
              }}
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>

      {/* Tags activos + contador */}
      <div className="flex flex-wrap items-center gap-2 min-h-[28px]">
        {activeTags.map(({ key, value }) => (
          <span 
            key={key}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: 'rgba(139,26,58,0.15)',
              color: 'var(--color-accent)',
              border: '1px solid rgba(139,26,58,0.3)',
            }}
          >
            {value}
            <button 
              onClick={() => clearFilter(key)}
              aria-label={`Quitar filtro: ${value}`}
              className="hover:opacity-70 transition-opacity leading-none"
            >
              ✕
            </button>
          </span>
        ))}

        {activeTags.length > 0 && (
          <button 
            onClick={() => onChange({ name: '', genre: '', language: '' })}
            className="text-xs transition-colors hover:underline"
            style={{ color: 'var(--color-muted)' }}
          >
            Limpiar todo
          </button>
        )}

        {!loading && resultsCount !== undefined && (
          <span className="ml-auto text-xs" style={{ color: 'var(--color-muted)' }}>
            {resultsCount} resultado{resultsCount !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    </section>
  )
}