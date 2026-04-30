import { useState } from 'react'
import { Link } from 'react-router-dom'
import ShowCard from '../components/ShowCard'
import ConfirmModal from '../components/ConfirmModal'
import { useFavorites } from '../context/FavoritesContext'
import { useToast } from '../hooks/useToast'

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites()
  const [selected, setSelected] = useState(null)
  const { showToast, ToastComponent } = useToast()

  const handleConfirmRemove = () => {
    removeFavorite(selected.id)
    showToast(`${selected.name} quitada de favoritos`, 'info')
    setSelected(null)
  }

  if (favorites.length === 0) return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Mis Favoritos</h1>
      <div className="py-16">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="1" className="mx-auto mb-4" style={{ color: 'var(--color-border)' }}
             aria-hidden="true">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        <p className="mb-4" style={{ color: 'var(--color-muted)' }}>
          No tienes favoritos guardados.
        </p>
        <Link to="/explore" className="text-sm underline"
              style={{ color: 'var(--color-accent)' }}>
          Explorar y agregar algunos
        </Link>
      </div>
      {ToastComponent}
    </div>
  )

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-1">Mis Favoritos</h1>
        <p className="text-sm mb-6" style={{ color: 'var(--color-muted)' }}>
          {favorites.length} serie{favorites.length !== 1 && 's'} guardada{favorites.length !== 1 && 's'}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {favorites.map(show => (
            <ShowCard key={show.id} show={show} onRemove={() => setSelected(show)} />
          ))}
        </div>
      </div>

      <ConfirmModal
        isOpen={!!selected}
        showName={selected?.name}
        onConfirm={handleConfirmRemove}
        onCancel={() => setSelected(null)}
      />
      {ToastComponent}
    </>
  )
}