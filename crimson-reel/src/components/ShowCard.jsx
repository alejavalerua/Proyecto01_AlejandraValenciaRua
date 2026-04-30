import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

export default function ShowCard({ show, onRemove }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const fav = isFavorite(show.id)

  const handleFav = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (fav) {
      if (onRemove) {
        onRemove()
      } else {
        removeFavorite(show.id)
      }
    } else {
      addFavorite(show)
    }
  }

  const imageUrl = show.image?.medium || show.image?.original || null

  return (
    <Link to={`/show/${show.id}`}
      className="group relative rounded-xl overflow-hidden block
                     transition-transform hover:-translate-y-1 hover:shadow-lg"
      style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}>

      {/* Imagen */}
      <div className="relative aspect-[2/3] overflow-hidden bg-[#1E1014]">
        {imageUrl ? (
          <img src={imageUrl} alt={`Portada de ${show.name}`}
            className="w-full h-full object-cover transition-transform group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#3D1E27]">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z" />
            </svg>
          </div>
        )}

        {/* Badge rating */}
        {show.rating?.average && (
          <span className="absolute top-2 left-2 text-xs font-mono font-bold px-2 py-1 rounded-md"
            style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-text)' }}>
            ★ {show.rating.average}
          </span>
        )}

        {/* Botón favorito */}
        <button onClick={handleFav}
          aria-label={fav ? `Quitar ${show.name} de favoritos` : `Agregar ${show.name} a favoritos`}
          className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center
                           transition-transform hover:scale-110"
          style={{ backgroundColor: fav ? 'var(--color-accent)' : 'rgba(10,6,8,0.7)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill={fav ? 'white' : 'none'}
            stroke="white" strokeWidth="2" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-semibold text-sm truncate" style={{ color: 'var(--color-text)' }}>
          {show.name}
        </h3>
        <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>
          {show.genres?.slice(0, 2).join(' · ') || 'Sin género'}
        </p>
        {show.status && (
          <span className="inline-block mt-2 text-[10px] font-mono px-2 py-0.5 rounded"
            style={{
              backgroundColor: show.status === 'Running' ? 'rgba(139,26,58,0.3)' : 'rgba(61,30,39,0.5)',
              color: show.status === 'Running' ? '#C0395A' : '#9B7A82',
              border: `1px solid ${show.status === 'Running' ? 'var(--color-primary)' : 'var(--color-border)'}`
            }}>
            {show.status === 'Running' ? '● En aire' : '■ Finalizada'}
          </span>
        )}
      </div>
    </Link>
  )
}