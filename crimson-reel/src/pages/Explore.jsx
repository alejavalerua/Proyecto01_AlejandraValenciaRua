// src/pages/Explore.jsx
import { useState, useEffect, useMemo } from 'react'
import ShowCard from '../components/ShowCard'
import LoadingGrid from '../components/LoadingGrid'
import { useToast } from '../hooks/useToast'

export default function Explore() {
    const [shows, setShows] = useState([])
    const [filteredShows, setFilteredShows] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [searchTerm, setSearchTerm] = useState('')
    const [selectedGenre, setSelectedGenre] = useState('')
    const [selectedLanguage, setSelectedLanguage] = useState('')

    const { showToast, ToastComponent } = useToast()

    // Cargar datos de la API
    useEffect(() => {
        setLoading(true)
        setError(null)

        fetch('https://api.tvmaze.com/shows?page=0')
            .then(res => {
                if (!res.ok) throw new Error('No se pudo conectar con la API')
                return res.json()
            })
            .then(data => {
                setShows(data)
                setFilteredShows(data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setError(err.message)
                setLoading(false)
            })
    }, [])

    // Géneros e idiomas dinámicos
    const availableGenres = useMemo(() => {
        const set = new Set()
        shows.forEach(show => show.genres?.forEach(g => g && set.add(g)))
        return Array.from(set).sort()
    }, [shows])

    const availableLanguages = useMemo(() => {
        const set = new Set()
        shows.forEach(show => show.language && set.add(show.language))
        return Array.from(set).sort()
    }, [shows])

    // Filtrado en tiempo real
    useEffect(() => {
        let result = [...shows]

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase().trim()
            result = result.filter(show => 
                show.name.toLowerCase().includes(term)
            )
        }

        if (selectedGenre) {
            result = result.filter(show => show.genres?.includes(selectedGenre))
        }

        if (selectedLanguage) {
            result = result.filter(show => show.language === selectedLanguage)
        }

        setFilteredShows(result)
    }, [searchTerm, selectedGenre, selectedLanguage, shows])

    const clearFilters = () => {
        setSearchTerm('')
        setSelectedGenre('')
        setSelectedLanguage('')
    }

    if (loading) {
        return (
            <div className="py-12">
                <LoadingGrid />
            </div>
        )
    }

    if (error) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                <span className="text-6xl mb-6">⚠️</span>
                <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--color-accent)' }}>
                    No se pudo cargar la información
                </h2>
                <p style={{ color: 'var(--color-muted)' }} className="mb-8 max-w-md">
                    {error}<br />Verifica tu conexión e intenta de nuevo.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-8 py-3 rounded-xl text-sm font-semibold transition-transform hover:scale-105"
                    style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
                >
                    Reintentar
                </button>
            </div>
        )
    }

    
    // ==================== CONTENIDO PRINCIPAL ====================

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-2">Explorar Series</h1>
            <p className="text-sm mb-8" style={{ color: 'var(--color-muted)' }}>
                Descubre series de todo el mundo • Datos en tiempo real desde TVMaze
            </p>

            {/* Filtros */}
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-5">
                        <input
                            type="text"
                            placeholder="Buscar por nombre de serie..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-5 py-3 rounded-xl text-sm focus:outline-none focus:border-[var(--color-accent)]"
                            style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                        />
                    </div>

                    <div className="md:col-span-3">
                        <select
                            value={selectedGenre}
                            onChange={(e) => setSelectedGenre(e.target.value)}
                            className="w-full px-5 py-3 rounded-xl text-sm focus:outline-none focus:border-[var(--color-accent)]"
                            style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                        >
                            <option value="">Todos los géneros</option>
                            {availableGenres.map(genre => (
                                <option key={genre} value={genre}>{genre}</option>
                            ))}
                        </select>
                    </div>

                    <div className="md:col-span-3">
                        <select
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                            className="w-full px-5 py-3 rounded-xl text-sm focus:outline-none focus:border-[var(--color-accent)]"
                            style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                        >
                            <option value="">Todos los idiomas</option>
                            {availableLanguages.map(lang => (
                                <option key={lang} value={lang}>{lang}</option>
                            ))}
                        </select>
                    </div>

                    <div className="md:col-span-1 flex items-end">
                        <button
                            onClick={clearFilters}
                            className="w-full py-3 rounded-xl text-sm font-medium hover:bg-[var(--color-card)] transition-colors"
                            style={{ border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}
                        >
                            Limpiar
                        </button>
                    </div>
                </div>
            </div>

            {/* Contador */}
            <div className="flex justify-between mb-6">
                <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                    Mostrando <strong>{filteredShows.length}</strong> serie{filteredShows.length !== 1 ? 's' : ''}
                </p>
            </div>

            {/* Estado Empty */}
            {filteredShows.length === 0 ? (
                <div className="text-center py-20">
                    <span className="text-6xl mb-4 block">🎬</span>
                    <p style={{ color: 'var(--color-muted)' }} className="mb-4">
                        No se encontraron series con los filtros aplicados.
                    </p>
                    <button 
                        onClick={clearFilters}
                        className="underline text-sm"
                        style={{ color: 'var(--color-accent)' }}
                    >
                        Limpiar todos los filtros
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {filteredShows.map(show => (
                        <ShowCard key={show.id} show={show} />
                    ))}
                </div>
            )}

            {ToastComponent}
        </div>
    )
}