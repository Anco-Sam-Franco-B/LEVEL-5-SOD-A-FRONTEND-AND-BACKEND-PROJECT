const mysql=require('mysql2')
const con=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'school'
})

//check DB connection
con.connect(err=>{
    if(err){
        return console.log("Database Not Connected!", err)
    }
    return console.log("Database Connected!")
})

//export your module
module.exports=con