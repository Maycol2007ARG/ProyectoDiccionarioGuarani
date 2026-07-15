import { useState, useEffect } from 'react'
import AchievementBadge from '../components/AchievementBadge'
import api from '../services/api'

const defaultAchievements = [
  { icon: '\uD83D\uDCD6', name: 'Primera Palabra', description: 'Aprendiste tu primera palabra', requirement: 1 },
  { icon: '\uD83C\uDF1F', name: 'Estudiante Dedicado', description: 'Aprendiste 10 palabras', requirement: 10 },
  { icon: '\uD83D\uDE80', name: 'Poliglota', description: 'Aprendiste 50 palabras', requirement: 50 },
  { icon: '\uD83E\uDD47', name: 'Campeon del Quiz', description: 'Completaste un quiz perfecto', requirement: 'perfect_quiz' },
  { icon: '\uD83C\uDFC6', name: 'Racha de Fuego', description: '7 dias consecutivos de practica', requirement: 'streak_7' },
  { icon: '\uD83D\uDCDA', name: 'Maestro Guarani', description: 'Aprendiste 100 palabras', requirement: 100 },
  { icon: '\u2B50', name: 'Explorador', description: 'Exploraste todas las categorias', requirement: 'all_categories' },
  { icon: '\uD83E\uDDE0', name: 'Estratega', description: 'Completaste 10 quizzes', requirement: '10_quizzes' },
]

export default function Progress() {
  const [progress, setProgress] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await api.get('/progress')
        setProgress(response.data)
      } catch (err) {
        setError('No se pudo cargar tu progreso')
      } finally {
        setLoading(false)
      }
    }
    fetchProgress()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-guarani-cream flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-guarani-lightgreen border-t-guarani-green rounded-full animate-spin" />
          <p className="text-guarani-green font-medium">Cargando progreso...</p>
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

  const level = progress?.level || 1
  const xp = progress?.xp || 0
  const wordsLearned = progress?.wordsLearned || progress?.words_learned || 0
  const quizzesCompleted = progress?.quizzesCompleted || progress?.quizzes_completed || 0
  const streak = progress?.streak || 0
  const achievements = progress?.achievements || []
  const xpForCurrentLevel = (level - 1) * 100
  const xpForNextLevel = level * 100
  const xpProgress = xp - xpForCurrentLevel
  const xpNeeded = xpForNextLevel - xpForCurrentLevel
  const progressPercent = Math.min((xpProgress / xpNeeded) * 100, 100)

  const isAchievementUnlocked = (achievement) => {
    if (achievements.length > 0) {
      return achievements.some((a) => a.name === achievement.name || a.id === achievement.id)
    }
    if (typeof achievement.requirement !== 'number') return false
    if (typeof achievement.requirement === 'number') {
      return wordsLearned >= achievement.requirement
    }
    return false
  }

  const getAchievementDate = (achievement) => {
    const found = achievements.find((a) => a.name === achievement.name || a.id === achievement.id)
    return found?.unlockedAt || found?.unlocked_at || null
  }

  return (
    <div className="min-h-screen bg-guarani-cream">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-guarani-darkgreen mb-8">
          Mi Progreso
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <p className="text-sm text-gray-500 font-medium">Nivel Actual</p>
              <div className="text-4xl font-extrabold text-guarani-green">{level}</div>
            </div>
            <div className="text-right mt-4 md:mt-0">
              <p className="text-sm text-gray-500 font-medium">Experiencia Total</p>
              <div className="text-2xl font-bold text-guarani-darkgreen">{xp} XP</div>
            </div>
          </div>

          <div className="mb-2 flex justify-between text-sm">
            <span className="text-gray-500">Nivel {level}</span>
            <span className="text-gray-500">Nivel {level + 1}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-1">
            <div
              className="bg-gradient-to-r from-guarani-lightgreen to-guarani-green h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 text-right">
            {xpProgress} / {xpNeeded} XP para el siguiente nivel
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 text-center border border-gray-100">
            <div className="text-3xl mb-1">&#128218;</div>
            <div className="text-2xl font-extrabold text-guarani-green">{wordsLearned}</div>
            <p className="text-xs text-gray-500 font-medium mt-1">Palabras Aprendidas</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 text-center border border-gray-100">
            <div className="text-3xl mb-1">&#129504;</div>
            <div className="text-2xl font-extrabold text-guarani-green">{quizzesCompleted}</div>
            <p className="text-xs text-gray-500 font-medium mt-1">Quizzes Completados</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 text-center border border-gray-100">
            <div className="text-3xl mb-1">&#128293;</div>
            <div className="text-2xl font-extrabold text-guarani-green">{streak}</div>
            <p className="text-xs text-gray-500 font-medium mt-1">Racha de Dias</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 text-center border border-gray-100">
            <div className="text-3xl mb-1">&#127942;</div>
            <div className="text-2xl font-extrabold text-guarani-green">
              {achievements.length || defaultAchievements.filter((a) => isAchievementUnlocked(a)).length}
            </div>
            <p className="text-xs text-gray-500 font-medium mt-1">Logros Obtenidos</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-guarani-darkgreen mb-6">
            Logros
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {defaultAchievements.map((achievement, index) => (
              <AchievementBadge
                key={index}
                icon={achievement.icon}
                name={achievement.name}
                description={achievement.description}
                unlocked={isAchievementUnlocked(achievement)}
                unlockDate={getAchievementDate(achievement)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
