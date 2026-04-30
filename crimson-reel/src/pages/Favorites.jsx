// src/pages/Favorites.jsx
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
        if (!selected) return
        removeFavorite(selected.id)
        showToast(`${selected.name} quitada de favoritos`, 'info')
        setSelected(null)
    }

    // Estado Empty
    if (favorites.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h1 className="text-4xl font-bold mb-6">Mis Favoritos</h1>
                
                <div className="py-20">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                         strokeWidth="1" className="mx-auto mb-6" style={{ color: 'var(--color-border)' }}>
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    <h2 className="text-2xl font-semibold mb-3" style={{ color: 'var(--color-muted)' }}>
                        Aún no tienes favoritos
                    </h2>
                    <p className="text-[#9B7A82] mb-8 max-w-sm mx-auto">
                        Las series que marques como favoritas aparecerán aquí.
                    </p>
                    <Link 
                        to="/explore"
                        className="inline-block px-8 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                        style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
                    >
                        Explorar series
                    </Link>
                </div>
                {ToastComponent}
            </div>
        )
    }

    // Vista con favoritos
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-1">Mis Favoritos</h1>
                <p className="text-sm mb-8" style={{ color: 'var(--color-muted)' }}>
                    {favorites.length} serie{favorites.length !== 1 && 's'} guardada{favorites.length !== 1 && 's'}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {favorites.map(show => (
                        <ShowCard 
                            key={show.id} 
                            show={show} 
                            onRemove={() => setSelected(show)} 
                        />
                    ))}
                </div>
            </div>

            <ConfirmModal
                isOpen={!!selected}
                showName={selected?.name || ""}
                onConfirm={handleConfirmRemove}
                onCancel={() => setSelected(null)}
            />
            {ToastComponent}
        </>
    )
}