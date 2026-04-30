export default function LoadingGrid({ count = 12 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
         aria-label="Cargando series..." role="status">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl overflow-hidden animate-pulse"
             style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
          <div className="aspect-[2/3]" style={{ backgroundColor: 'var(--color-surface)' }} />
          <div className="p-3 space-y-2">
            <div className="h-3 rounded" style={{ backgroundColor: 'var(--color-surface)', width: '80%' }} />
            <div className="h-2 rounded" style={{ backgroundColor: 'var(--color-surface)', width: '60%' }} />
          </div>
        </div>
      ))}
    </div>
  )
}