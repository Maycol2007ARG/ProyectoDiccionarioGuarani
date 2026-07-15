export default function AchievementBadge({ icon, name, description, unlocked = false, unlockDate = null }) {
  return (
    <div
      className={`relative flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-300 ${
        unlocked
          ? 'bg-gradient-to-b from-guarani-lightgreen/10 to-white border-guarani-lightgreen shadow-md'
          : 'bg-gray-100 border-gray-200 opacity-60'
      }`}
    >
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-2 ${
          unlocked ? 'bg-guarani-lightgreen text-white' : 'bg-gray-300 text-gray-500'
        }`}
      >
        {icon}
      </div>
      <h4 className={`font-bold text-sm text-center ${unlocked ? 'text-gray-800' : 'text-gray-500'}`}>
        {name}
      </h4>
      <p className={`text-xs text-center mt-1 ${unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
        {description}
      </p>
      {unlocked && unlockDate && (
        <p className="text-xs text-guarani-green mt-2 font-medium">
          Desbloqueado: {new Date(unlockDate).toLocaleDateString('es-ES')}
        </p>
      )}
      {!unlocked && (
        <div className="absolute top-2 right-2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      )}
    </div>
  )
}
