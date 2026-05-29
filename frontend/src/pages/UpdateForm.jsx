import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/axios'

function UpdateForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    address: ''
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get(`/student/${id}`)
      .then(res => {
        setFormData(res.data.result)
        setLoading(false)
      })
      .catch(err => {
        setError(err.response?.data?.message || 'Failed to fetch student data')
        setLoading(false)
      })
  }, [id])

  const handleUpdate = (e) => {
    e.preventDefault()
    setError('')
    api.put(`/update/${id}`, formData)
      .then(res => {
        alert(res.data.message)
        navigate('/')
      })
      .catch(err => {
        if (err.response?.status === 500) {
          alert(err.response.data.errorMessage)
        } else {
          alert(err.response?.data?.message || 'Failed to update student')
        }
      })
  }

  if (loading) {
    return (
      <div className="w-full p-5">
        <h1 className="font-bold text-2xl mb-4">Update Student</h1>
        <div className="flex items-center justify-center mt-10">
          <p className="text-gray-500 text-lg">Loading student data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full p-5">
        <h1 className="font-bold text-2xl mb-4">Update Student</h1>
        <div className="flex items-center justify-center mt-10">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full p-5">
      <h1 className="font-bold text-2xl">Update Student</h1>
      <div className="mt-4 w-full flex items-center justify-center">
        <form className="w-[450px] p-5 flex flex-col gap-2 border-2 border-blue-500 rounded-lg">
          <label className="font-medium text-gray-700">First Name</label>
          <input
            className="p-2 rounded-md border-2 border-gray-300 placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition"
            value={formData.fname}
            onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
            type="text"
            placeholder="First name"
          />
          <label className="font-medium text-gray-700">Last Name</label>
          <input
            className="p-2 rounded-md border-2 border-gray-300 placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition"
            type="text"
            value={formData.lname}
            onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
            placeholder="Last name"
          />
          <label className="font-medium text-gray-700">Email</label>
          <input
            className="p-2 rounded-md border-2 border-gray-300 placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email"
          />
          <label className="font-medium text-gray-700">Address</label>
          <input
            className="p-2 rounded-md border-2 border-gray-300 placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition"
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Address"
          />
          <button className="p-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition mt-2" onClick={handleUpdate}>
            Update Student
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateForm