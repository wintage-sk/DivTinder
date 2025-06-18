const express = require("express")
const app= express()

const {adminAuth,userAuth}=require("./middlewares/auth")
app.use("/admin",adminAuth)
app.get("/user",userAuth,(req,res)=>{
    
    res.send(" get user data ")
})
app.get("/user/login",(req,res)=>{
    
    res.send("user logged in successffully")
})
app.get("/admin/getAllData",(req,res)=>{
    
    res.send("user data fetched successffully")
})
app.get("/admin/deleteUser",(req,res)=>{
    res.send("User 1 deleted successffully")
})

app.listen(3000)