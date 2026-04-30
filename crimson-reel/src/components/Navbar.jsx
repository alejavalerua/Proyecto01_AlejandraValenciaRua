import { NavLink } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

// SVG inline — bobina de película (logo de CrimsonReel)
const ReelIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
       xmlns="http://www.w3.org/2000/svg" aria-label="CrimsonReel logo" role="img">
    <circle cx="16" cy="16" r="14" stroke="#C0395A" strokeWidth="2"/>
    <circle cx="16" cy="16" r="5" fill="#C0395A"/>
    <circle cx="16" cy="7"  r="2.5" fill="#8B1A3A"/>
    <circle cx="16" cy="25" r="2.5" fill="#8B1A3A"/>
    <circle cx="7"  cy="16" r="2.5" fill="#8B1A3A"/>
    <circle cx="25" cy="16" r="2.5" fill="#8B1A3A"/>
    <circle cx="10" cy="10" r="2"   fill="#3D1E27"/>
    <circle cx="22" cy="10" r="2"   fill="#3D1E27"/>
    <circle cx="10" cy="22" r="2"   fill="#3D1E27"/>
    <circle cx="22" cy="22" r="2"   fill="#3D1E27"/>
  </svg>
)

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/explore', label: 'Explorar' },
  { to: '/favorites', label: 'Favoritos' },
  { to: '/contact', label: 'Contacto' },
]

export default function Navbar() {
  const { favorites } = useFavorites()

  return (
    <header role="banner" style={{ backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}
            className="sticky top-0 z-50 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between"
           aria-label="Navegación principal">
        <NavLink to="/" className="flex items-center gap-2">
          <ReelIcon />
          <span className="text-xl font-bold tracking-tight"
                style={{ fontFamily: 'Playfair Display', color: 'var(--color-text)' }}>
            Crimson<span style={{ color: 'var(--color-accent)' }}>Reel</span>
          </span>
        </NavLink>

        <ul className="flex items-center gap-6 list-none">
          {navLinks.map(link => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-[#C0395A] relative ${
                    isActive ? 'text-[#C0395A]' : 'text-[#9B7A82]'
                  }`
                }
              >
                {link.label}
                {link.to === '/favorites' && favorites.length > 0 && (
                  <span className="absolute -top-2 -right-3 text-[10px] font-mono
                                   bg-[#8B1A3A] text-white rounded-full w-4 h-4
                                   flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}