import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import api from '../api/axios'

function NavBar() {
  const navigate = useNavigate()
  const token = useAuthStore((state) => state.token)
  const logout = useAuthStore((state) => state.logout)
  const isAuthenticated = !!token

  const handleLogout = () => {
    api.post('/logout')
      .then(() => {
        logout()
        navigate('/login')
      })
      .catch(() => {
        logout()
        navigate('/login')
      })
  }

  return (
    <div className="p-3 bg-gradient-to-r from-green-600 to-green-500 text-white flex items-center justify-around shadow-md">
      <Link to="/" className="text-xl font-bold hover:text-green-200 transition">Student MS</Link>
      <nav className="flex gap-4 items-center">
        {isAuthenticated ? (
          <>
            <Link to="/" className="hover:text-green-200 transition">Students</Link>
            <Link to="/create" className="hover:text-green-200 transition">New Student</Link>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-green-200 transition">Login</Link>
            <Link to="/register" className="hover:text-green-200 transition">Register</Link>
          </>
        )}
      </nav>
    </div>
  )
}

export default NavBar