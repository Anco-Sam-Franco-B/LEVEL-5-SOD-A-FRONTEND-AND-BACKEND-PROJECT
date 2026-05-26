const express=require('express')
const cors=require('cors')
const con=require('./database')
const app=express()
const port=8000

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

//API ROUTES 
app.get('/students', (req, res)=>{
    con.query('SELECT * FROM student ', (err, data)=>{
        if(err){
            return res.status(500).json({
                message: 'Internal Server Error',
                errorMessage: err.message
            })
        }
        return res.status(200).json({
            message: 'Students data fetched',
            result: data
        })
    })
})
app.get('/student/:id', (req, res)=>{
    const {id}=req.params
    con.query(`SELECT * FROM student WHERE id='${id}'`, (err, data)=>{
        if(err){
            return res.status(500).json({
                message: 'Internal Server Error',
                errorMessage: err.message
            })
        }
        return res.status(200).json({
            message: "Student data Fetched",
            result: data[0]
        })
    })
})

//create new student
app.post('/create', (req, res)=>{
    const { fname, lname, email, address }=req.body
    if(!fname || !lname || !email || !address){
        return res.status(400).json({
            message: 'All inputs are required'
        })
    }
    //INSERT NEW STUDENT INTO DATABASE TABLE 
    con.query(`INSERT INTO student VALUES(NULL, '${fname}', '${lname}', '${email}', '${address}')`, (err)=>{
        if(err){
            return res.status(500).json({
                message: 'Internal Server Error',
                errorMessage: err.message
            })
        }
        return res.status(201).json({
            message: 'Student created successfully'
        })
    })
})

//route to delete student by ID
app.delete('/delete/:id', (req, res)=>{
    const  { id }=req.params
    //delete student query
    con.query(`DELETE FROM student WHERE id='${id}'`, (err)=>{
        if(err){
            return res.status(500).json({
                message: 'Internal Server Error',
                errorMessage: err.message
            })
        }
        return res.status(200).json({
            message: 'Student record deleted successfully!'
        })
    })
})

//starting server
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})