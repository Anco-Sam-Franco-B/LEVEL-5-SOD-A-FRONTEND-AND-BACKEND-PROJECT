import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div className='p-1 bg-green-500 text-white flex items-center justify-around'>
      <h1>Student MS</h1>
      <nav className='flex gap-3'>
        <Link to='/' className='hover:text-black'>Students</Link>
        <Link to='/create' className='hover:text-black'>New Student</Link>
      </nav>
    </div>
  )
}

export default NavBar