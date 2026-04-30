import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-96 h-96 rounded-full blur-3xl opacity-20"
             style={{ backgroundColor: 'var(--color-primary)' }} />
      </div>

      <span className="text-xs font-mono tracking-widest uppercase mb-4"
            style={{ color: 'var(--color-accent)' }}>
        Powered by TVMaze API
      </span>

      <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 max-w-3xl">
        El universo de las{' '}
        <em style={{ color: 'var(--color-accent)', fontStyle: 'italic' }}>series</em>,
        en un solo lugar.
      </h1>

      <p className="text-lg max-w-xl mb-8" style={{ color: 'var(--color-muted)' }}>
        Descubre, explora y guarda tus series favoritas. Filtra por género,
        búsqueda en tiempo real y más.
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        <Link to="/explore"
              className="px-6 py-3 rounded-xl font-semibold text-sm transition-transform hover:scale-105"
              style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}>
          Explorar series →
        </Link>
        <Link to="/favorites"
              className="px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}
              onMouseEnter={e => e.target.style.color = 'var(--color-text)'}
              onMouseLeave={e => e.target.style.color = 'var(--color-muted)'}>
          Mis favoritos
        </Link>
      </div>
    </section>
  )
}