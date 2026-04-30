export default function LoadingGrid({ count = 12, title = "Cargando series..." }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      
      <div className="flex items-center gap-3 mb-8">
        <div
          className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin"
          style={{
            borderColor: 'var(--color-accent)',
            borderTopColor: 'transparent'
          }}
        />
        <p className="text-lg font-medium" style={{ color: 'var(--color-muted)' }}>
          {title}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden bg-[var(--color-card)] border border-[var(--color-border)] animate-pulse"
          >
            
            <div
              className="aspect-[2/3] w-full"
              style={{ backgroundColor: 'var(--color-surface)' }}
            />

            <div className="p-4 space-y-3">
              <div
                className="h-4 rounded w-4/5"
                style={{ backgroundColor: 'var(--color-surface)' }}
              />
              <div
                className="h-3 rounded w-3/5"
                style={{ backgroundColor: 'var(--color-surface)' }}
              />
              <div
                className="h-5 rounded w-2/5 mt-4"
                style={{ backgroundColor: 'rgba(139, 26, 58, 0.3)' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}