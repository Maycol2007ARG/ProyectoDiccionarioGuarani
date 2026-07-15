import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      navigate('/search')
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesion. Verifica tus credenciales.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-guarani-cream flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-4xl">&#127811;</span>
          <h1 className="text-3xl font-bold text-guarani-darkgreen mt-2">
            Iniciar Sesion
          </h1>
          <p className="text-gray-600 mt-2">
            Bienvenido de vuelta al Diccionario Guarani
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                Correo Electronico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-guarani-lightgreen focus:border-transparent
                           transition-colors duration-200"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                Contrasena
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-guarani-lightgreen focus:border-transparent
                           transition-colors duration-200"
                placeholder="Tu contrasena"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-guarani-green text-white font-bold rounded-lg
                         hover:bg-guarani-darkgreen transition-colors duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Ingresando...</span>
                </span>
              ) : (
                'Iniciar Sesion'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              No tienes cuenta?{' '}
              <Link to="/register" className="text-guarani-green font-semibold hover:underline">
                Registrate aqui
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
