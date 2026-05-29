const express=require('express')
const cors=require('cors') //allowing server communication to others by serving it's sources
const con=require('./database') //Database connection file 
const bcrypt=require('bcryptjs') //for hashing password
const jwt=require('jsonwebtoken') //for creating user token
const dotenv= require('dotenv') //for accessing environmental variable in `.env` file
const cookieParser=require('cookie-parser') //store a JWT token in cookies and send it from your Node.js/Express backend,
const verifyToken = require('./AuthMiddleware') //Middleware for verifying user token if user logged in or not
const app=express()
const port=process.env.PORT || 8000 //The 'process.env' property returns an object containing the user environment like PORT and other

dotenv.config() //enable dotenv configuration to process environmental variable in `.env` file
//then create `.env` file and configure any variable.

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(cookieParser()) //enable cookie parser

//API ROUTES 
app.get('/students', verifyToken, (req, res)=>{
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
app.get('/student/:id', verifyToken ,(req, res)=>{
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
app.post('/create', verifyToken, (req, res)=>{
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
app.delete('/delete/:id', verifyToken,(req, res)=>{
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

//route to update student by ID
app.put('/update/:id', verifyToken, (req, res)=>{
    const { id }=req.params
    const { fname, lname, email, address }=req.body
    if(!fname || !lname || !email || !address){
        return res.status(400).json({
            message: 'All inputs are required'
        })
    }
    //update student query
    con.query(`UPDATE student SET fname='${fname}', lname='${lname}', email='${email}', address='${address}' WHERE id='${id}'`, (err)=>{
        if(err){
            return res.status(500).json({
                message: 'Internal Server Error',
                errorMessage: err.message
            })
        }
        return res.status(200).json({
            message: 'Student updated successfully!'
        })
    })
})

//SignUp route
app.post('/register', async (req, res)=>{
    const { username, email, password } =req.body
    if(!username || !email || !password){
        return res.status(400).json({
            message: 'All inputs are required!'
        })
    }
    //Hash password before creating user account
    const hashPassword= await bcrypt.hash(password, 2)
    //insert new account
    con.query(`INSERT INTO users VALUES(NULL, '${username}', '${email}', '${hashPassword}')`, err=>{
        if(err){
            return res.status(500).json({
                message: 'Internal Server Error',
                errorMessage: err.message
            })
        }
        return res.status(200).json({
            message: 'User account created!'
        })
    })
})

app.post('/login', (req, res)=>{
    const { email, password } = req.body
    if(!email || !password){
        return res.status(400).json({
            message: 'All input are required!'
        })
    }

    //Select user account based on email and avoid SQL Enjection
    con.query(`SELECT * FROM users WHERE email='${email}'`, async(err, data)=>{
        if(err){
            return res.status(500).json({
                message: 'Internal Server Error',
                errorMessage: err.message
            })
        }
        const user=data[0]
        if(user.email != email){
            return res.status(404).json({
                message: 'Invalid user email addres'
            })
        }

        //compare the entered password with the hashed password from database table `users`
        const isMatch= await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(404).json({
                message: 'Invalid user password!'
            })
        }

        //Create user token after validating if user credentials are correct.
        const token=jwt.sign({
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRESIN
        }
        )

        //store a JWT token in cookies and send it from your Node.js/Express backend
         res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        //send success message and user token in the response
        res.status(200).json({
            success: true,
            token,
            message: "Login successful"
        });
    })
})

//logout
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
});

//starting server
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})