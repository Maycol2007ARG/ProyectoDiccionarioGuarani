import { useState } from 'react'
import QuizOption from '../components/QuizOption'
import api from '../services/api'

const levels = [
  { value: 'beginner', label: 'Principiante', color: 'bg-green-100 border-green-400 text-green-700' },
  { value: 'intermediate', label: 'Intermedio', color: 'bg-yellow-100 border-yellow-400 text-yellow-700' },
  { value: 'advanced', label: 'Avanzado', color: 'bg-red-100 border-red-400 text-red-700' },
]

export default function Quiz() {
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [quizStarted, setQuizStarted] = useState(false)
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizFinished, setQuizFinished] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [xpEarned, setXpEarned] = useState(0)

  const startQuiz = async () => {
    if (!selectedLevel) return
    setLoading(true)
    setError('')
    try {
      const response = await api.get(`/quiz/questions`, {
        params: { level: selectedLevel, count: 10 },
      })
      const data = response.data
      const qs = data.questions || data || []
      if (qs.length === 0) {
        setError('No hay preguntas disponibles para este nivel')
        setLoading(false)
        return
      }
      setQuestions(qs)
      setCurrentQuestion(0)
      setScore(0)
      setQuizFinished(false)
      setXpEarned(0)
      setQuizStarted(true)
    } catch (err) {
      setError('No se pudieron cargar las preguntas. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleAnswer = (optionIndex) => {
    if (selectedAnswer !== null) return

    setSelectedAnswer(optionIndex)
    setShowResult(true)

    const question = questions[currentQuestion]
    const correctIndex = question.correctIndex ?? question.correct_index ?? 0

    if (optionIndex === correctIndex) {
      setScore((prev) => prev + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion + 1 >= questions.length) {
      const finalScore = score + (selectedAnswer === (questions[currentQuestion].correctIndex ?? questions[currentQuestion].correct_index ?? 0) ? 0 : 0)
      const correctCount = score + (showResult && selectedAnswer === (questions[currentQuestion].correctIndex ?? questions[currentQuestion].correct_index ?? 0) ? 1 : 0)
      setXpEarned(correctCount * 10)
      setQuizFinished(true)
    } else {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const resetQuiz = () => {
    setQuizStarted(false)
    setQuestions([])
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setQuizFinished(false)
    setXpEarned(0)
  }

  const getCorrectCount = () => {
    return score
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-guarani-cream">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-guarani-darkgreen mb-8 text-center">
            Quiz de Guarani
          </h1>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-5xl mb-4">&#129504;</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Pon a prueba tus conocimientos
            </h2>
            <p className="text-gray-600 mb-6">
              Selecciona un nivel y demuestra lo que has aprendido
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              {levels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setSelectedLevel(level.value)}
                  className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all duration-200 ${
                    selectedLevel === level.value
                      ? level.color + ' scale-105 shadow-md'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>

            <button
              onClick={startQuiz}
              disabled={!selectedLevel || loading}
              className="px-8 py-3 bg-guarani-green text-white font-bold rounded-lg text-lg
                         hover:bg-guarani-darkgreen transition-colors duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Cargando...</span>
                </span>
              ) : (
                'Comenzar Quiz'
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (quizFinished) {
    const correctCount = getCorrectCount()
    const total = questions.length
    const percentage = Math.round((correctCount / total) * 100)

    return (
      <div className="min-h-screen bg-guarani-cream">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-5xl mb-4">
              {percentage >= 80 ? '\uD83C\uDF1F' : percentage >= 50 ? '\uD83D\uDC4D' : '\uD83D\uDCAA'}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Quiz Completado!
            </h2>

            <div className="my-6">
              <div className="text-5xl font-extrabold text-guarani-green mb-1">
                {correctCount}/{total}
              </div>
              <p className="text-gray-600">respuestas correctas</p>
            </div>

            <div className="bg-guarani-cream rounded-xl p-4 mb-6 inline-block">
              <p className="text-lg font-bold text-guarani-darkgreen">
                +{xpEarned} XP ganados
              </p>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  percentage >= 80 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={startQuiz}
                className="px-6 py-3 bg-guarani-green text-white font-bold rounded-lg
                           hover:bg-guarani-darkgreen transition-colors duration-200"
              >
                Jugar de Nuevo
              </button>
              <button
                onClick={resetQuiz}
                className="px-6 py-3 border-2 border-guarani-green text-guarani-green font-bold rounded-lg
                           hover:bg-guarani-cream transition-colors duration-200"
              >
                Cambiar Nivel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const options = question.options || []
  const questionText = question.question || question.spanish || question.word || ''
  const correctIndex = question.correctIndex ?? question.correct_index ?? 0
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-guarani-cream">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-gray-500">
              Pregunta {currentQuestion + 1} de {questions.length}
            </span>
            <span className="text-sm font-bold text-guarani-green">
              {score} correctas
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div
              className="bg-guarani-lightgreen h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center">
            {questionText}
          </h2>

          <div className="space-y-3">
            {options.map((option, index) => {
              let state = 'default'
              if (showResult) {
                if (index === correctIndex) state = 'correct'
                else if (index === selectedAnswer && index !== correctIndex) state = 'incorrect'
              } else if (index === selectedAnswer) {
                state = 'selected'
              }

              const optionText = typeof option === 'string' ? option : option.text || option.word || ''

              return (
                <QuizOption
                  key={index}
                  text={optionText}
                  state={state}
                  onClick={() => handleAnswer(index)}
                  disabled={showResult}
                />
              )
            })}
          </div>

          {showResult && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleNextQuestion}
                className="px-8 py-3 bg-guarani-green text-white font-bold rounded-lg text-lg
                           hover:bg-guarani-darkgreen transition-colors duration-200"
              >
                {currentQuestion + 1 >= questions.length ? 'Ver Resultados' : 'Siguiente Pregunta'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
