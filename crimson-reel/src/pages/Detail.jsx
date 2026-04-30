import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import ConfirmModal from '../components/ConfirmModal'
import { useToast } from '../hooks/useToast'

export default function Detail() {
  const { id } = useParams()
  const [show, setShow] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const { showToast, ToastComponent } = useToast()

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Serie no encontrada')
        return res.json()
      })
      .then(data => { setShow(data); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [id])

  const handleFavToggle = () => {
    if (isFavorite(show.id)) {
      setModalOpen(true)
    } else {
      addFavorite(show)
      showToast(`${show.name} agregada a favoritos`, 'success')
    }
  }

  const handleConfirmRemove = () => {
    removeFavorite(show.id)
    showToast(`${show.name} quitada de favoritos`, 'info')
    setModalOpen(false)
  }

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 px-4">
        <div className="flex flex-col items-center gap-6">
          {/* Spinner grande */}
          <div
            className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin"
            style={{
              borderColor: 'var(--color-accent)',
              borderTopColor: 'transparent'
            }}
          />

          {/* Mensajito */}
          <div className="text-center">
            <p className="text-lg font-medium mb-1" style={{ color: 'var(--color-text)' }}>
              Cargando información de la serie...
            </p>
            <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
              Obteniendo detalles desde TVMaze
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="mb-8 text-6xl">⚠️</div>
        <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--color-accent)' }}>
          No se pudo cargar la serie
        </h2>
        <p className="max-w-md mb-8" style={{ color: 'var(--color-muted)' }}>
          {error || "Hubo un problema al obtener la información de esta serie."}
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-xl font-semibold text-sm"
            style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
          >
            Reintentar
          </button>
          <Link
            to="/explore"
            className="px-6 py-3 rounded-xl font-semibold text-sm border transition-colors"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-muted)'
            }}
          >
            Volver a explorar
          </Link>
        </div>
      </div>
    )
  }

  // Si no hay serie
  if (!show) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-center">
        <p style={{ color: 'var(--color-muted)' }}>Serie no encontrada.</p>
      </div>
    )
  }

  const fav = isFavorite(show?.id)
  const cleanSummary = show?.summary?.replace(/<[^>]+>/g, '') || 'Sin descripción disponible.'

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/explore" className="text-sm hover:underline mb-6 inline-block"
          style={{ color: 'var(--color-muted)' }}>← Volver a explorar</Link>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Imagen */}
          <div className="flex-shrink-0 w-full md:w-64">
            {show.image?.original ? (
              <img src={show.image.original} alt={`Póster de ${show.name}`}
                className="w-full rounded-2xl" />
            ) : (
              <div className="w-full aspect-[2/3] rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-card)' }}>
                <span style={{ color: 'var(--color-border)' }}>Sin imagen</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-1">{show.name}</h1>
            {show.rating?.average && (
              <p className="text-sm font-mono mb-3" style={{ color: 'var(--color-accent)' }}>
                ★ {show.rating.average} / 10
              </p>
            )}

            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
              {[
                ['Estado', show.status],
                ['Idioma', show.language],
                ['Red', show.network?.name || show.webChannel?.name || '—'],
                ['Estreno', show.premiered?.substring(0, 4) || '—'],
              ].map(([label, value]) => (
                <div key={label}>
                  <span style={{ color: 'var(--color-muted)' }}>{label}: </span>
                  <span style={{ color: 'var(--color-text)' }}>{value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {show.genres?.map(g => (
                <span key={g} className="text-xs font-mono px-2 py-1 rounded"
                  style={{
                    backgroundColor: 'rgba(139,26,58,0.2)', color: 'var(--color-accent)',
                    border: '1px solid var(--color-primary)'
                  }}>
                  {g}
                </span>
              ))}
            </div>

            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-muted)' }}>
              {cleanSummary}
            </p>

            <button onClick={handleFavToggle}
              aria-label={fav ? `Quitar ${show.name} de favoritos` : `Agregar ${show.name} a favoritos`}
              className="px-5 py-2 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80"
              style={{
                backgroundColor: fav ? 'transparent' : 'var(--color-accent)',
                color: fav ? 'var(--color-muted)' : 'white',
                border: fav ? '1px solid var(--color-border)' : 'none'
              }}>
              {fav ? '♥ En favoritos' : '♡ Agregar a favoritos'}
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={modalOpen}
        showName={show?.name}
        onConfirm={handleConfirmRemove}
        onCancel={() => setModalOpen(false)}
      />
      {ToastComponent}
    </>
  )
}