import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import useAuthStore from '../store/authStore'

function Login() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    axios.post('http://localhost:8000/login', formData)
      .then(res => {
        login(res.data.token, { email: formData.email })
        navigate('/')
      })
      .catch(err => {
        setError(err.response?.data?.message || 'Login failed')
      })
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="w-[400px] p-8 flex flex-col gap-4 bg-white border-2 border-green-500 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">Welcome Back</h1>
        <p className="text-gray-500 text-center text-sm">Sign in to manage students</p>
        {error && <p className="text-red-500 text-center bg-red-50 p-2 rounded-md">{error}</p>}
        <input
          className="p-3 rounded-md border-2 border-gray-300 placeholder:text-gray-500 focus:outline-none focus:border-green-500 transition"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email address"
          required
        />
        <input
          className="p-3 rounded-md border-2 border-gray-300 placeholder:text-gray-500 focus:outline-none focus:border-green-500 transition"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Password"
          required
        />
        <button className="p-3 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition shadow-md" type="submit">
          Login
        </button>
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">Register</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
