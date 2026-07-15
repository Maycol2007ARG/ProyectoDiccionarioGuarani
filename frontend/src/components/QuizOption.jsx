export default function QuizOption({ text, state = 'default', onClick, disabled = false }) {
  const stateClasses = {
    default: 'bg-white border-2 border-gray-200 text-gray-800 hover:border-guarani-lightgreen hover:bg-green-50',
    selected: 'bg-guarani-lightgreen border-2 border-guarani-green text-white',
    correct: 'bg-green-500 border-2 border-green-600 text-white',
    incorrect: 'bg-red-500 border-2 border-red-600 text-white',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full px-6 py-4 rounded-xl text-left font-semibold text-lg
                  transition-all duration-300 transform ${stateClasses[state]}
                  ${disabled ? 'cursor-default' : 'cursor-pointer hover:scale-[1.02]'}
                  ${state === 'correct' ? 'scale-[1.02]' : ''}
                  ${state === 'incorrect' ? 'scale-[1.02]' : ''}`}
    >
      <div className="flex items-center space-x-3">
        {state === 'correct' && (
          <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
        {state === 'incorrect' && (
          <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        <span>{text}</span>
      </div>
    </button>
  )
}
