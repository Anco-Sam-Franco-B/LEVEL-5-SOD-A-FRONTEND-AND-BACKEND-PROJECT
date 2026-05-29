import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    axios.post('http://localhost:8000/register', formData)
      .then(res => {
        alert(res.data.message)
        navigate('/login')
      })
      .catch(err => {
        setError(err.response?.data?.message || 'Registration failed')
      })
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="w-[400px] p-8 flex flex-col gap-4 bg-white border-2 border-green-500 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">Create Account</h1>
        <p className="text-gray-500 text-center text-sm">Register to manage students</p>
        {error && <p className="text-red-500 text-center bg-red-50 p-2 rounded-md">{error}</p>}
        <input
          className="p-3 rounded-md border-2 border-gray-300 placeholder:text-gray-500 focus:outline-none focus:border-green-500 transition"
          type="text"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          placeholder="Username"
          required
        />
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
          Register
        </button>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default Register
