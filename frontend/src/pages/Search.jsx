import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import WordCard from '../components/WordCard'
import api from '../services/api'
import { useAuth } from '../hooks/useAuth'

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const { token } = useAuth()

  const initialQuery = searchParams.get('q') || ''
  const initialLang = searchParams.get('lang') || 'es'

  const handleSearch = useCallback(async (query, language, pageNum = 1, append = false) => {
    if (!query) {
      setResults([])
      setHasSearched(false)
      return
    }

    setLoading(true)
    setHasSearched(true)

    try {
      const params = {
        q: query,
        lang: language,
        page: pageNum,
        limit: 20,
      }
      const response = await api.get('/words/search', { params })
      const data = response.data
      const words = data.words || data.results || data || []

      if (append) {
        setResults((prev) => [...prev, ...words])
      } else {
        setResults(words)
      }

      setHasMore(words.length === 20)
    } catch (err) {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery, initialLang, 1, false)
      setPage(1)
    }
  }, [initialQuery, initialLang])

  const handleSearchSubmit = (query, language) => {
    setPage(1)
    setSearchParams({ q: query, lang: language })
    handleSearch(query, language, 1, false)
  }

  const handleLoadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    const q = searchParams.get('q') || ''
    const lang = searchParams.get('lang') || 'es'
    handleSearch(q, lang, nextPage, true)
  }

  const handleToggleFavorite = async (wordId, isFavorited) => {
    if (!token) return
    try {
      if (isFavorited) {
        await api.post(`/favorites/${wordId}`)
      } else {
        await api.delete(`/favorites/${wordId}`)
      }
    } catch (err) {
      // silently fail
    }
  }

  return (
    <div className="min-h-screen bg-guarani-cream">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-guarani-darkgreen mb-6">
          Buscar Palabras
        </h1>

        <div className="max-w-2xl mb-8">
          <SearchBar
            onSearch={handleSearchSubmit}
            initialQuery={initialQuery}
            initialLanguage={initialLang}
          />
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-10 h-10 border-4 border-guarani-lightgreen border-t-guarani-green rounded-full animate-spin" />
            <p className="text-guarani-green font-medium mt-3">Buscando palabras...</p>
          </div>
        )}

        {!loading && hasSearched && results.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">&#128269;</div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">No se encontraron resultados</h2>
            <p className="text-gray-500">
              Intenta con otra palabra o cambia el idioma de busqueda
            </p>
          </div>
        )}

        {!loading && !hasSearched && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">&#127811;</div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">Empieza a buscar</h2>
            <p className="text-gray-500">
              Escribe una palabra en Espanol o Guarani para encontrar su traduccion
            </p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((word) => (
                <WordCard
                  key={word.id}
                  word={word}
                  isFavorited={word.isFavorited || word.is_favorited}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleLoadMore}
                  className="px-6 py-3 bg-guarani-green text-white font-semibold rounded-lg
                             hover:bg-guarani-darkgreen transition-colors duration-200"
                >
                  Cargar Mas Resultados
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
