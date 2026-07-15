import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import WordCard from '../components/WordCard'
import api from '../services/api'

export default function CategoryWords() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [category, setCategory] = useState(null)
  const [words, setWords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCategoryWords = async () => {
      setLoading(true)
      setError('')
      try {
        const response = await api.get(`/categories/${id}`)
        const data = response.data
        setCategory(data.category || data)
        setWords(data.words || data.category?.words || [])
      } catch (err) {
        setError('No se pudieron cargar las palabras de esta categoria')
      } finally {
        setLoading(false)
      }
    }
    fetchCategoryWords()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-guarani-cream flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-guarani-lightgreen border-t-guarani-green rounded-full animate-spin" />
          <p className="text-guarani-green font-medium">Cargando palabras...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-guarani-cream flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">&#128533;</div>
          <h2 className="text-xl font-bold text-gray-700 mb-2">{error}</h2>
          <button
            onClick={() => navigate('/categories')}
            className="mt-4 px-6 py-2 bg-guarani-green text-white font-semibold rounded-lg
                       hover:bg-guarani-darkgreen transition-colors duration-200"
          >
            Volver a Categorias
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-guarani-cream">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/categories')}
          className="flex items-center space-x-2 text-guarani-green hover:text-guarani-darkgreen
                     font-semibold mb-6 transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Volver a Categorias</span>
        </button>

        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-guarani-darkgreen">
            {category?.name || 'Categoria'}
          </h1>
          {category?.description && (
            <p className="text-gray-600 mt-2">{category.description}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            {words.length} {words.length === 1 ? 'palabra' : 'palabras'}
          </p>
        </div>

        {words.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">&#128193;</div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">
              No hay palabras en esta categoria
            </h2>
            <p className="text-gray-500">
              Vuelve pronto para descubrir nuevas palabras
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {words.map((word) => (
              <WordCard key={word.id} word={word} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
