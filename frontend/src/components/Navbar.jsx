import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const navLinks = [
  { path: '/', label: 'Inicio' },
  { path: '/search', label: 'Buscar' },
  { path: '/categories', label: 'Categorias' },
  { path: '/quiz', label: 'Quiz' },
  { path: '/favorites', label: 'Favoritos' },
  { path: '/history', label: 'Historial' },
  { path: '/phrase-of-day', label: 'Frase del Dia' },
  { path: '/progress', label: 'Progreso' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setMobileOpen(false)
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-guarani-green shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-white font-bold text-xl">
            <span className="text-2xl">&#127811;</span>
            <span>Diccionario Guarani</span>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'bg-guarani-darkgreen text-white'
                    : 'text-green-100 hover:bg-guarani-darkgreen hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <>
                <span className="text-green-100 text-sm">
                  Hola, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-green-100
                             border border-green-300 hover:bg-guarani-darkgreen hover:text-white
                             transition-colors duration-200"
                >
                  Cerrar Sesion
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-green-100
                             border border-green-300 hover:bg-guarani-darkgreen hover:text-white
                             transition-colors duration-200"
                >
                  Iniciar Sesion
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-white text-guarani-green
                             hover:bg-green-100 transition-colors duration-200"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2 rounded-md hover:bg-guarani-darkgreen
                       transition-colors duration-200"
            aria-label="Menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-guarani-darkgreen border-t border-guarani-lightgreen">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'bg-guarani-green text-white'
                    : 'text-green-100 hover:bg-guarani-green hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-guarani-lightgreen mt-2 pt-2">
              {user ? (
                <>
                  <div className="px-3 py-2 text-green-100 text-sm">
                    Hola, {user.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium
                               text-green-100 hover:bg-guarani-green hover:text-white
                               transition-colors duration-200"
                  >
                    Cerrar Sesion
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-green-100
                               hover:bg-guarani-green hover:text-white transition-colors duration-200"
                  >
                    Iniciar Sesion
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-green-100
                               hover:bg-guarani-green hover:text-white transition-colors duration-200"
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
