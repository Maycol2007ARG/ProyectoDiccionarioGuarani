import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import AudioButton from '../components/AudioButton'
import WordCard from '../components/WordCard'
import api from '../services/api'
import { useAuth } from '../hooks/useAuth'

export default function WordDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { token } = useAuth()
  const [word, setWord] = useState(null)
  const [relatedWords, setRelatedWords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isFavorited, setIsFavorited] = useState(false)

  useEffect(() => {
    const fetchWord = async () => {
      setLoading(true)
      setError('')
      try {
        const response = await api.get(`/words/${id}`)
        const wordData = response.data
        setWord(wordData)
        setIsFavorited(wordData.isFavorited || wordData.is_favorited || false)

        if (wordData.categories && wordData.categories.length > 0) {
          try {
            const catId = wordData.categories[0].id || wordData.categories[0]
            const relatedRes = await api.get(`/categories/${catId}/words`)
            const related = (relatedRes.data.words || relatedRes.data || []).filter(
              (w) => w.id !== parseInt(id)
            )
            setRelatedWords(related.slice(0, 4))
          } catch {
            setRelatedWords([])
          }
        }
      } catch (err) {
        setError('No se pudo cargar la palabra. Intenta de nuevo.')
      } finally {
        setLoading(false)
      }
    }
    fetchWord()
  }, [id])

  const handleToggleFavorite = async () => {
    if (!token) return
    try {
      if (isFavorited) {
        await api.delete(`/favorites/${id}`)
        setIsFavorited(false)
      } else {
        await api.post(`/favorites/${id}`)
        setIsFavorited(true)
      }
    } catch (err) {
      // silently fail
    }
  }

  const getDifficultyLabel = (level) => {
    const labels = { 1: 'Principiante', 2: 'Intermedio', 3: 'Avanzado' }
    return labels[level] || 'Principiante'
  }

  const getDifficultyColor = (level) => {
    const colors = { 1: 'bg-green-100 text-green-700', 2: 'bg-yellow-100 text-yellow-700', 3: 'bg-red-100 text-red-700' }
    return colors[level] || 'bg-green-100 text-green-700'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-guarani-cream flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-guarani-lightgreen border-t-guarani-green rounded-full animate-spin" />
          <p className="text-guarani-green font-medium">Cargando palabra...</p>
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
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-2 bg-guarani-green text-white font-semibold rounded-lg
                       hover:bg-guarani-darkgreen transition-colors duration-200"
          >
            Volver
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-guarani-cream">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-guarani-green hover:text-guarani-darkgreen
                     font-semibold mb-6 transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Volver</span>
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
                {word.spanish || word.espanol}
              </h1>
              <p className="text-2xl md:text-3xl text-guarani-green font-bold italic mb-4">
                {word.guarani}
              </p>

              {word.definition && (
                <p className="text-gray-600 text-lg mb-4">
                  {word.definition}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <AudioButton text={word.guarani} size="lg" />
              <button
                onClick={handleToggleFavorite}
                className="p-2 rounded-full transition-colors duration-200
                           hover:bg-gray-100"
                aria-label={isFavorited ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              >
                {isFavorited ? (
                  <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8 text-gray-400 hover:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(word.difficulty)}`}>
              {getDifficultyLabel(word.difficulty)}
            </span>

            {word.categories && word.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {word.categories.map((cat) => (
                  <Link
                    key={cat.id || cat}
                    to={`/categories/${cat.id || cat}`}
                    className="px-3 py-1 bg-guarani-cream text-guarani-green rounded-full text-sm font-semibold
                               hover:bg-guarani-lightgreen hover:text-white transition-colors duration-200"
                  >
                    {cat.name || cat}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {word.example && (
            <div className="mt-6 p-4 bg-guarani-cream rounded-xl">
              <h3 className="font-bold text-guarani-darkgreen mb-1">Ejemplo:</h3>
              <p className="text-gray-700 italic">{word.example}</p>
            </div>
          )}
        </div>

        {relatedWords.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-guarani-darkgreen mb-4">
              Palabras Relacionadas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedWords.map((rw) => (
                <WordCard key={rw.id} word={rw} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
