import { useState, useEffect } from 'react'
import AudioButton from '../components/AudioButton'
import api from '../services/api'

export default function PhraseOfDay() {
  const [phrase, setPhrase] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchPhrase = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await api.get('/phrase-of-day')
      setPhrase(response.data)
    } catch (err) {
      setError('No se pudo cargar la frase del dia')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPhrase()
  }, [])

  const handleRefresh = () => {
    fetchPhrase()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-guarani-cream flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-guarani-lightgreen border-t-guarani-green rounded-full animate-spin" />
          <p className="text-guarani-green font-medium">Cargando frase del dia...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-guarani-cream flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">&#128533;</div>
          <h2 className="text-xl font-bold text-gray-700 mb-4">{error}</h2>
          <button
            onClick={handleRefresh}
            className="px-6 py-2 bg-guarani-green text-white font-semibold rounded-lg
                       hover:bg-guarani-darkgreen transition-colors duration-200"
          >
            Intentar de Nuevo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-guarani-cream">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-guarani-darkgreen mb-8 text-center">
          Frase del Dia
        </h1>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-guarani-green to-guarani-darkgreen p-6 text-center">
            <div className="text-4xl text-white/80 mb-2">&#127915;</div>
            <p className="text-xs font-semibold text-green-200 uppercase tracking-wider">
              Frase en Guarani
            </p>
          </div>

          <div className="p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-guarani-green italic mb-4">
              {phrase?.guarani || phrase?.text || ''}
            </h2>

            {phrase?.pronunciation && (
              <p className="text-gray-500 text-sm mb-4">
                Pronunciacion: {phrase.pronunciation}
              </p>
            )}

            <div className="flex justify-center mb-6">
              <AudioButton
                text={phrase?.guarani || phrase?.text || ''}
                size="lg"
              />
            </div>

            <div className="border-t border-gray-200 pt-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Traduccion al Espanol
              </p>
              <p className="text-xl text-gray-800 font-medium">
                {phrase?.spanish || phrase?.translation || ''}
              </p>
            </div>

            {phrase?.category && (
              <div className="mt-4">
                <span className="inline-block px-3 py-1 bg-guarani-cream text-guarani-green rounded-full text-sm font-semibold">
                  {phrase.category.name || phrase.category}
                </span>
              </div>
            )}
          </div>

          <div className="px-8 pb-6">
            <button
              onClick={handleRefresh}
              className="w-full py-3 border-2 border-guarani-green text-guarani-green font-bold rounded-lg
                         hover:bg-guarani-cream transition-colors duration-200
                         flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Nueva Frase</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
