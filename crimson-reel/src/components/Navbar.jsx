// src/components/Navbar.jsx
import { NavLink } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { useState } from 'react'

const ReelIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="CrimsonReel logo" role="img">
    <circle cx="18" cy="18" r="15.5" stroke="#C0395A" strokeWidth="2.5"/>
    <circle cx="18" cy="18" r="6.5" fill="#C0395A"/>
    <circle cx="18" cy="7" r="2.8" fill="#8B1A3A"/>
    <circle cx="18" cy="29" r="2.8" fill="#8B1A3A"/>
    <circle cx="7" cy="18" r="2.8" fill="#8B1A3A"/>
    <circle cx="29" cy="18" r="2.8" fill="#8B1A3A"/>
  </svg>
)

export default function Navbar() {
  const { favorites } = useFavorites()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <ReelIcon />
            <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Playfair Display' }}>
              Crimson<span style={{ color: 'var(--color-accent)' }}>Reel</span>
            </span>
          </NavLink>

          {/* Menú Desktop */}
          <ul className="hidden md:flex items-center gap-8">
            <li><NavLink to="/" className="nav-link">Inicio</NavLink></li>
            <li><NavLink to="/explore" className="nav-link">Explorar</NavLink></li>
            <li className="relative">
              <NavLink to="/favorites" className="nav-link">
                Favoritos
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-4 bg-[#C0395A] text-white text-[10px] font-mono w-5 h-5 flex items-center justify-center rounded-full">
                    {favorites.length}
                  </span>
                )}
              </NavLink>
            </li>
            <li><NavLink to="/contact" className="nav-link">Contacto</NavLink></li>
          </ul>

          {/* Botón menú móvil */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-2xl"
            aria-label="Abrir menú"
          >
            ☰
          </button>
        </div>

        {/* Menú Móvil */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-[var(--color-border)]">
            <ul className="flex flex-col gap-4 text-lg">
              <li><NavLink to="/" onClick={() => setIsMenuOpen(false)}>Inicio</NavLink></li>
              <li><NavLink to="/explore" onClick={() => setIsMenuOpen(false)}>Explorar</NavLink></li>
              <li><NavLink to="/favorites" onClick={() => setIsMenuOpen(false)}>
                Favoritos ({favorites.length})
              </NavLink></li>
              <li><NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>Contacto</NavLink></li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}