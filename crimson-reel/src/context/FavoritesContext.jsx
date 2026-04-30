import { createContext, useContext, useState } from 'react'

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  const addFavorite = (show) => {
    setFavorites(prev => [...prev, show])
  }

  const removeFavorite = (id) => {
    setFavorites(prev => prev.filter(s => s.id !== id))
  }

  const isFavorite = (id) => favorites.some(s => s.id === id)

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)