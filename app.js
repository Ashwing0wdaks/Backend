const express =require('express')
const app= express()
const cors= require('cors')
const PORT = 4001
const mongoose = require('mongoose')
mongoose.set('strictQuery',false)

//require database models
const User= require('./models/users')

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors()) //cross origin resource sharing

const dbURL= "mongodb://localhost:27017/foodie"
mongoose.connect(dbURL).then(()=>{
    console.log("Connected to database");
})

app.post('/signup',async(req,res)=>{
    User.findOne({email:req.body.email},(err,userData)=>{
        if(userData){
                   res.send({message:'Seems like you already have an account with this email address'})
        }else{
          const data =new User({
            Name:req.body.Name,
            email:req.body.email,
            mobile_Number:req.body.mobile_Number,
            password:req.body.password
          })
         data.save(()=>{
            if(err){
                res.send(err)
            }else{
                res.send({mesaage:"User registered successfully"})
            }
         })
        }

    })
   
})

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})