import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Search from './pages/Search'
import WordDetail from './pages/WordDetail'
import Categories from './pages/Categories'
import CategoryWords from './pages/CategoryWords'
import Quiz from './pages/Quiz'
import Favorites from './pages/Favorites'
import History from './pages/History'
import PhraseOfDay from './pages/PhraseOfDay'
import Progress from './pages/Progress'

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-guarani-cream">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
          <Route path="/word/:id" element={<ProtectedRoute><WordDetail /></ProtectedRoute>} />
          <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
          <Route path="/categories/:id" element={<ProtectedRoute><CategoryWords /></ProtectedRoute>} />
          <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="/phrase-of-day" element={<ProtectedRoute><PhraseOfDay /></ProtectedRoute>} />
          <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
        </Routes>
      </div>
    </AuthProvider>
  )
}
