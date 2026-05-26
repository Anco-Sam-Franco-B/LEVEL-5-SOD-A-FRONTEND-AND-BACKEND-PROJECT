import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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
  axios.post('http://localhost:8000/create', formData)
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
    if(err.response.status==500){
      alert(err.response.data.errorMessage) //internal server error(server,database, mysql query)
    }
    else{
      alert(err.response.data.message) //bad request
    }
  })
}
  return (
    <div className='w-full p-5'>
      <h1 className='font-bold text-2xl'>Create New Student</h1>
      <div className='mt-4 w-full flex items-center justify-center'>
        <form className='w-[450px] p-5 flex flex-col gap-2 border-2'>
            <input value={formData.fname} onChange={(e)=>setFormData({...formData, fname: e.target.value})} type="text" placeholder='First name' />
            <input type="text" value={formData.lname} onChange={(e)=>setFormData({...formData, lname: e.target.value})} placeholder='Last name' />
            <input type="email" value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})} placeholder='Email' />
            <input type="text" value={formData.address} onChange={(e)=>setFormData({...formData, address: e.target.value})} placeholder='Address' />
            <button onClick={HandleSaveStudent}>Save Student</button>
        </form>
      </div>
    </div>
  )
}

export default CreateForm