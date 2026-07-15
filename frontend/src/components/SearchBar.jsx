import { useState, useEffect, useRef } from 'react'

export default function SearchBar({ onSearch, initialQuery = '', initialLanguage = 'es' }) {
  const [query, setQuery] = useState(initialQuery)
  const [language, setLanguage] = useState(initialLanguage)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const debounceRef = useRef(null)

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    debounceRef.current = setTimeout(() => {
      if (query.trim()) {
        onSearch(query.trim(), language)
      }
    }, 300)
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [query, language])

  const handleClear = () => {
    setQuery('')
    onSearch('', language)
  }

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'es' ? 'gn' : 'es'))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim(), language)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <div className="absolute left-3 text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={language === 'es' ? 'Buscar en Espanol...' : 'Henahecha en Guarani...'}
          className="w-full pl-10 pr-24 py-3 border border-gray-300 rounded-xl
                     focus:outline-none focus:ring-2 focus:ring-guarani-lightgreen focus:border-transparent
                     bg-white text-gray-800 text-lg shadow-sm transition-all duration-200"
        />

        <div className="absolute right-2 flex items-center space-x-1">
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              aria-label="Limpiar busqueda"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          <button
            type="button"
            onClick={toggleLanguage}
            className="px-2 py-1 text-xs font-semibold rounded-md transition-colors duration-200
                       bg-guarani-lightgreen text-white hover:bg-guarani-green"
          >
            {language === 'es' ? 'Espanol' : 'Guarani'}
          </button>
        </div>
      </div>
    </form>
  )
}
