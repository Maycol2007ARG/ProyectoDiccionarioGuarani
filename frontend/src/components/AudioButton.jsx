import { useState } from 'react'

export default function AudioButton({ text, size = 'md', className = '' }) {
  const [speaking, setSpeaking] = useState(false)

  const handleSpeak = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (speaking) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
      return
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'gn'
      utterance.rate = 0.8
      utterance.pitch = 1

      const voices = window.speechSynthesis.getVoices()
      const guaraniVoice = voices.find((v) => v.lang.startsWith('gn'))
      if (guaraniVoice) {
        utterance.voice = guaraniVoice
      }

      utterance.onstart = () => setSpeaking(true)
      utterance.onend = () => setSpeaking(false)
      utterance.onerror = () => setSpeaking(false)

      window.speechSynthesis.speak(utterance)
    }
  }

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  return (
    <button
      onClick={handleSpeak}
      className={`${sizeClasses[size]} flex items-center justify-center rounded-full
                  transition-all duration-200 ${
                    speaking
                      ? 'bg-guarani-green text-white animate-pulse'
                      : 'bg-guarani-lightgreen text-white hover:bg-guarani-green'
                  } ${className}`}
      aria-label="Reproducir pronunciacion"
    >
      <svg
        className={`${iconSizes[size]} ${speaking ? 'animate-bounce' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {speaking ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
        ) : (
          <>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </>
        )}
      </svg>
    </button>
  )
}
