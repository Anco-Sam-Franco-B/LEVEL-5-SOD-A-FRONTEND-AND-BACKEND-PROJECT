import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
 
function Students() {
    const [students, setStudents]=useState([])
    useEffect(()=>{
      axios.get('http://localhost:8000/students')
      .then(res=>{
        // alert(res.data.message)
        setStudents(res.data.result)
      })
      .catch(err=>{
        console.log(err.response)
        alert('Failed to fetched')
      })
    }, [students])
    const handeleDelete=(id)=>{
        axios.delete(`http://localhost:8000/delete/${id}`)
        .then(res=>{
          alert(res.data.message)
          setStudents(students.filter((student)=>student.id != id))
        })
        .catch(err=>{
          console.log(err.response)
          alert(err.response.data.errorMessage)
        })
    }
  return (
    <div className='w-full p-3'>
        <h1 className='font-bold'>Student Lists</h1>
        <div className='w-full p-2'>
          <table className='w-full'>
            <thead>
              <tr className='bg-blue-500 text-white'>
                <th className='p-1'>ID</th>
                <th className='p-1'>FirstName</th>
                <th className='p-1'>LastName</th>
                <th className='p-1'>Email</th>
                <th className='p-1'>Address</th>
                <th className='p-1' colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                students.map((data, index)=>(
                  <tr key={index}>
                    <td className='p-1'>{index +  1}</td>
                    <td className='p-1'>{data.fname }</td>
                    <td className='p-1'>{data.lname}</td>
                    <td className='p-1'>{data.email}</td>
                    <td className='p-1'>{data.address}</td>
                    <td className='p-1'>
                        <Link className='p-1 text-white bg-blue-600 rounded-md' to={`/update/${data.id}`}>Update </Link>
                    </td>
                    <td className='p-1'><button onClick={()=>handeleDelete(data.id)} className='p-1 text-white bg-red-600 rounded-md'>Delete</button></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default Students