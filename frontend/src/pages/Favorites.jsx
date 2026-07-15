import { useState, useEffect } from 'react'
import WordCard from '../components/WordCard'
import api from '../services/api'

export default function Favorites() {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await api.get('/favorites')
        const data = response.data
        setFavorites(Array.isArray(data) ? data : data.favorites || [])
      } catch (err) {
        setError('No se pudieron cargar tus favoritos')
      } finally {
        setLoading(false)
      }
    }
    fetchFavorites()
  }, [])

  const handleToggleFavorite = async (wordId, isFavorited) => {
    if (!isFavorited) {
      try {
        await api.delete(`/favorites/${wordId}`)
        setFavorites((prev) => prev.filter((w) => w.id !== wordId))
      } catch (err) {
        // silently fail
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-guarani-cream flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-guarani-lightgreen border-t-guarani-green rounded-full animate-spin" />
          <p className="text-guarani-green font-medium">Cargando favoritos...</p>
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
          Mis Favoritos
        </h1>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">&#10084;&#65039;</div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">
              No tienes favoritos aun
            </h2>
            <p className="text-gray-500">
              Busca palabras y agrega tus favoritas haciendo clic en el icono del corazon
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((word) => (
              <WordCard
                key={word.id}
                word={word}
                isFavorited={true}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
