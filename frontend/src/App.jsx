import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Students from './pages/Students'
import NotFound from './pages/NotFound'
import CreateForm from './pages/CreateForm'
import UpdateForm from './pages/UpdateForm'

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Students/>} />
          <Route path='/create' element={<CreateForm/>} />
          <Route path='/update/:id' element={<UpdateForm/>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App