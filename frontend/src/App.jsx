import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar'
import Students from './pages/Students'
import NotFound from './pages/NotFound'
import CreateForm from './pages/CreateForm'
import UpdateForm from './pages/UpdateForm'
import Login from './pages/Login'
import Register from './pages/Register'
import useAuthStore from './store/authStore'

function ProtectedRoute({ children }) {
  const token = useAuthStore((state) => state.token)
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><Students /></ProtectedRoute>} />
          <Route path="/create" element={<ProtectedRoute><CreateForm /></ProtectedRoute>} />
          <Route path="/update/:id" element={<ProtectedRoute><UpdateForm /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
