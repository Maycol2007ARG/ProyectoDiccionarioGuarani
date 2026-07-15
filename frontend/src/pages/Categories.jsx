import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

const categoryIcons = {
  'animales': '\uD83D\uDC3E',
  'comida': '\uD83C\uDF5E',
  'familia': '\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66',
  'naturaleza': '\uD83C\uDF3F',
  'numeros': '\uD83D\uDD22',
  'colores': '\uD83C\uDFA8',
  'saludos': '\uD83D\uDC4B',
  'cuerpo': '\uD83D\uDCAA',
  'tiempo': '\u231A',
  'lugares': '\uD83C\uDFD8\uFE0F',
  'default': '\uD83D\uDCC1',
}

const getCategoryIcon = (name) => {
  const lower = name?.toLowerCase() || ''
  for (const [key, icon] of Object.entries(categoryIcons)) {
    if (lower.includes(key)) return icon
  }
  return categoryIcons.default
}

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories')
        const data = Array.isArray(response.data) ? response.data : response.data.categories || []
        setCategories(data)
      } catch (err) {
        setError('No se pudieron cargar las categorias')
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-guarani-cream flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-guarani-lightgreen border-t-guarani-green rounded-full animate-spin" />
          <p className="text-guarani-green font-medium">Cargando categorias...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-guarani-cream flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">&#128533;</div>
          <h2 className="text-xl font-bold text-gray-700">{error}</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-guarani-cream">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-guarani-darkgreen mb-8">
          Categorias
        </h1>

        {categories.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">&#128193;</div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">No hay categorias disponibles</h2>
            <p className="text-gray-500">Vuelve pronto para explorar nuevas categorias</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/categories/${category.id}`}
                className="bg-white rounded-xl shadow-md p-6 transition-all duration-200
                           hover:shadow-lg hover:-translate-y-1 border border-gray-100
                           flex flex-col items-center text-center"
              >
                <div className="text-4xl mb-3">
                  {getCategoryIcon(category.name)}
                </div>
                <h3 className="text-lg font-bold text-guarani-darkgreen mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {category.wordCount || category.word_count || 0} palabras
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
