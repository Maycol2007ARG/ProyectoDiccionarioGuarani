import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import SearchBar from '../components/SearchBar'
import api from '../services/api'

const features = [
  {
    icon: '\uD83D\uDD0D',
    title: 'Buscar Palabras',
    description: 'Busca palabras en Espanol o Guarani rapidamente',
    link: '/search',
  },
  {
    icon: '\uD83D\uDCC1',
    title: 'Categorias',
    description: 'Explora palabras organizadas por categorias',
    link: '/categories',
  },
  {
    icon: '\uD83E\uDDE0',
    title: 'Quiz Interactivo',
    description: 'Pon a prueba tus conocimientos con quizzes',
    link: '/quiz',
  },
  {
    icon: '\uD83C\uDF1F',
    title: 'Frase del Dia',
    description: 'Aprende una nueva frase en Guarani cada dia',
    link: '/phrase-of-day',
  },
]

export default function Home() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState({ totalWords: 0, totalCategories: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [wordsRes, categoriesRes] = await Promise.all([
          api.get('/words?limit=1').catch(() => ({ data: { total: 0 } })),
          api.get('/categories').catch(() => ({ data: { total: 0 } })),
        ])
        setStats({
          totalWords: wordsRes.data.total || wordsRes.data.length || 0,
          totalCategories: categoriesRes.data.total || (Array.isArray(categoriesRes.data) ? categoriesRes.data.length : 0),
        })
      } catch {
        setStats({ totalWords: 0, totalCategories: 0 })
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const handleQuickSearch = (query, language) => {
    navigate(`/search?q=${encodeURIComponent(query)}&lang=${language}`)
  }

  return (
    <div className="min-h-screen bg-guarani-cream">
      <section className="bg-gradient-to-br from-guarani-green via-guarani-darkgreen to-guarani-green text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Aprende Guarani
          </h1>
          <p className="text-lg md:text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Descubre la belleza del idioma Guarani con nuestro diccionario interactivo.
            Aprende nuevas palabras, practica con quizzes y sigue tu progreso.
          </p>

          <div className="max-w-xl mx-auto">
            <SearchBar onSearch={handleQuickSearch} />
          </div>

          {!user && (
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                to="/register"
                className="px-8 py-3 bg-white text-guarani-green font-bold rounded-lg
                           hover:bg-green-100 transition-colors duration-200 text-lg"
              >
                Comenzar Gratis
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg
                           hover:bg-white/10 transition-colors duration-200 text-lg"
              >
                Ya tengo cuenta
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-guarani-darkgreen text-center mb-12">
            Funciones Principales
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Link
                key={feature.title}
                to={feature.link}
                className="bg-white rounded-xl shadow-md p-6 text-center transition-all duration-200
                           hover:shadow-lg hover:-translate-y-1 border border-gray-100"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-guarani-darkgreen mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-guarani-darkgreen text-center mb-8">
            Nuestro Diccionario
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center p-6 rounded-xl bg-guarani-cream">
              <div className="text-3xl md:text-4xl font-extrabold text-guarani-green">
                {loading ? '...' : stats.totalWords}
              </div>
              <p className="text-gray-600 mt-2 font-medium">Palabras Disponibles</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-guarani-cream">
              <div className="text-3xl md:text-4xl font-extrabold text-guarani-green">
                {loading ? '...' : stats.totalCategories}
              </div>
              <p className="text-gray-600 mt-2 font-medium">Categorias</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
