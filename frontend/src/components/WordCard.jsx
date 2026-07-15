import { useState } from 'react'
import { Link } from 'react-router-dom'
import AudioButton from './AudioButton'

export default function WordCard({ word, isFavorited, onToggleFavorite }) {
  const [favorite, setFavorite] = useState(isFavorited || false)

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorite(!favorite)
    if (onToggleFavorite) {
      onToggleFavorite(word.id, !favorite)
    }
  }

  const getDifficultyDots = (level) => {
    const dots = []
    const maxDots = 3
    const filledLevel = level || 1
    for (let i = 0; i < maxDots; i++) {
      dots.push(
        <span
          key={i}
          className={`inline-block w-2 h-2 rounded-full ${
            i < filledLevel ? 'bg-guarani-green' : 'bg-gray-300'
          }`}
        />
      )
    }
    return dots
  }

  return (
    <Link
      to={`/word/${word.id}`}
      className="block bg-white rounded-xl shadow-md p-5 transition-all duration-200
                 hover:shadow-lg hover:-translate-y-0.5 border border-gray-100"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-800 truncate">
            {word.spanish || word.espanol}
          </h3>
          <p className="text-guarani-green font-semibold text-base mt-1 italic">
            {word.guarani}
          </p>
        </div>

        <div className="flex items-center space-x-2 ml-2 flex-shrink-0">
          <AudioButton text={word.guarani} size="sm" />
          <button
            onClick={handleFavoriteClick}
            className="p-1 transition-colors duration-200"
            aria-label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            {favorite ? (
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-400 hover:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-1.5 mt-3">
        {getDifficultyDots(word.difficulty)}
        <span className="text-xs text-gray-500 ml-1">
          {word.difficulty === 1 && 'Principiante'}
          {word.difficulty === 2 && 'Intermedio'}
          {word.difficulty === 3 && 'Avanzado'}
        </span>
      </div>
    </Link>
  )
}
