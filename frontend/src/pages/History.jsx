import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

export default function History() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get('/history')
        const data = response.data
        setHistory(Array.isArray(data) ? data : data.history || [])
      } catch (err) {
        setError('No se pudo cargar el historial')
      } finally {
        setLoading(false)
      }
    }
    fetchHistory()
  }, [])

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Hace un momento'
    if (diffMins < 60) return `Hace ${diffMins} minuto${diffMins > 1 ? 's' : ''}`
    if (diffHours < 24) return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`
    if (diffDays < 7) return `Hace ${diffDays} dia${diffDays > 1 ? 's' : ''}`
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-guarani-cream flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-guarani-lightgreen border-t-guarani-green rounded-full animate-spin" />
          <p className="text-guarani-green font-medium">Cargando historial...</p>
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-guarani-darkgreen mb-8">
          Historial de Busquedas
        </h1>

        {history.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">&#128337;</div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">
              No hay busquedas recientes
            </h2>
            <p className="text-gray-500">
              Tus busquedas apareceran aqui para que puedas acceder rapidamente
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item, index) => (
              <div
                key={item.id || index}
                className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between
                           border border-gray-100 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center space-x-4 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-guarani-lightgreen/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-guarani-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    {item.wordId || item.word_id ? (
                      <Link
                        to={`/word/${item.wordId || item.word_id}`}
                        className="font-semibold text-gray-800 hover:text-guarani-green transition-colors truncate block"
                      >
                        {item.query || item.word || 'Palabra'}
                      </Link>
                    ) : (
                      <span className="font-semibold text-gray-800 truncate block">
                        {item.query || item.word || 'Busqueda'}
                      </span>
                    )}
                    <p className="text-xs text-gray-500 mt-0.5">
                      {item.language === 'gn' ? 'Guarani' : 'Espanol'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 flex-shrink-0 ml-4">
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {formatDate(item.createdAt || item.created_at || item.date)}
                  </span>
                  {item.wordId || item.word_id ? (
                    <Link
                      to={`/word/${item.wordId || item.word_id}`}
                      className="p-2 text-guarani-green hover:bg-guarani-lightgreen/10 rounded-lg
                                 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ) : (
                    <Link
                      to={`/search?q=${encodeURIComponent(item.query || '')}&lang=${item.language || 'es'}`}
                      className="p-2 text-guarani-green hover:bg-guarani-lightgreen/10 rounded-lg
                                 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
