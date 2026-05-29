import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

function CreateForm() {
  const navigate=useNavigate()
  const [formData, setFormData]=useState({
    fname: '',
    lname: '', 
    email: '',
    address: ''
  })
const HandleSaveStudent=(e)=>{
  e.preventDefault()
  api.post('/create', formData)
  .then(res=>{
    alert(res.data.message)
    setFormData({
      fname: '',
      lname: '', 
      email: '',
      address: ''
    })
    navigate('/')
  })
  .catch(err=>{
    console.log(err.response)
    if (err.response?.status === 500) {
      alert(err.response.data.errorMessage)
    } else {
      alert(err.response?.data?.message || 'Failed to create student')
    }
  })
}
  return (
    <div className='w-full p-5'>
      <h1 className='font-bold text-2xl'>Create New Student</h1>
      <div className='mt-4 w-full flex items-center justify-center'>
        <form className='w-[450px] p-5 flex flex-col gap-2 border-2 border-green-500'>
            <input className='p-2 rounded-md border-2 border-black placeholder:text-gray-800' value={formData.fname} onChange={(e)=>setFormData({...formData, fname: e.target.value})} type="text" placeholder='First name' />
            <input className='p-2 rounded-md border-2 border-black placeholder:text-gray-800' type="text" value={formData.lname} onChange={(e)=>setFormData({...formData, lname: e.target.value})} placeholder='Last name' />
            <input className='p-2 rounded-md border-2 border-black placeholder:text-gray-800' type="email" value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})} placeholder='Email' />
            <input className='p-2 rounded-md border-2 border-black placeholder:text-gray-800' type="text" value={formData.address} onChange={(e)=>setFormData({...formData, address: e.target.value})} placeholder='Address' />
            <button className='p-2 rounded-md bg-green-500 text-white' onClick={HandleSaveStudent}>Save Student</button>
        </form>
      </div>
    </div>
  )
}

export default CreateForm