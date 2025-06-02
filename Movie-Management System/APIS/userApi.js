//import mini express
const express = require("express")
const userApp = express.Router() 

//import user model
const User = require("../models/User")

//body parser middleware
userApp.use(express.json())

//import express async handler
const expressAsyncHandler = require("express-async-handler")

//import verify token 
const verifyToken = require("../APIS/middlewares/verifyToken")

//import bcryptjs
const bcryptjs = require("bcryptjs")

//import jsonwebtoken
const jsonwebtoken = require("jsonwebtoken")
//provide routes

//create user
userApp.post("/createuser",expressAsyncHandler(async(request,response)=>{
    //get data from client
    let dataFromClient = request.body
    //check if available in DB
    let usernameFromClient = dataFromClient.username
    let userDataInDb = await User.findOne({username:usernameFromClient})
    //if it is null create one
    if(userDataInDb==null){
        //hash the password
        let hashedPassword = await bcryptjs.hash(dataFromClient.password,5)
        dataFromClient.password = hashedPassword
        //create a doc
        let userDoc = new User({...dataFromClient})
        //save it to DB
        userDoc.save()
        //send info
        response.send({message:"User Created",payload:userDataInDb})
    }
    else{
        response.send({message:"Username already taken.Please choose some other..."})
    }
}))

//login user
userApp.post("/login",expressAsyncHandler(async(request,response)=>{
    //get login credentials from user
    let userCredentials = request.body
    //check for username in DB
    let userDataInDb = await User.findOne({username:userCredentials.username})
    //if it is null
    if(userDataInDb==null){
        response.send({message:"Invalid Username"})
    }
    else{
        //verify password 
        let result = await bcryptjs.compare(userCredentials.password,userDataInDb.password)
        if(result==false){
            response.send({message:"Invalid Password"})
        }
        else{
            //create a signed token
            let signedToken = jsonwebtoken.sign({username:userDataInDb.username},process.env.SECRET_KEY,{expiresIn:'1h'})
            //send info
            response.send({message:"Login Successful",token:signedToken,user:userDataInDb})

        }
    }
}))

// edit user
userApp.put("/edituser",verifyToken,expressAsyncHandler(async(req,res)=>{
    let user = req.body
    let userData = await User.findOne({ _id:user._id})
    if (userData == null) {
        res.status(200).send({ message: "Invalid ID!" })
    } else {
        let userObj = await User.updateOne({ _id:user._id }, {$set:{username:user.username,email:user.email,city:user.city,age:user.age}})
        let userData1 = await User.findOne({ _id:user._id})
        res.status(200).send({ message: "User updated successfully", payload: userData1 })
    }
}))

// change password
userApp.put("/changepassword",verifyToken,expressAsyncHandler(async(req,res)=>{
    let data = req.body
    let userData = await User.findOne({_id:data._id})
    if(userData == null){
        res.send({message:"Invalid User"})
    }
    else{
        let checkOldPassword = await bcryptjs.compare(data.old,userData.password)
        if(checkOldPassword == false){
            res.send({message:"Old password is invalid!"})
        }
        else{
            if(data.new != data.confirm){
                res.send({message:"New password and confirm password don't match"})
            }
            else{
                let hashPassword = await bcryptjs.hash(data.new,5)
                await User.updateOne({_id:data._id},{$set:{password:hashPassword}})
                res.send({message:"Password updated successfully"})
            }
        }
    }
}))


//path not match error
userApp.use((request,response,next)=>{
    response.send({message:"Path not available",payload:`${request.url} not Found!`})
})

//error handling middleware
userApp.use((error,request,response,next)=>{
    response.send({message:"Error",payload:error.message})
})

//export
module.exports = userApp