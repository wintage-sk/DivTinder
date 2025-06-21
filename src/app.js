const express = require("express")
const {connectDb}=require("./config/database")
const {User}=require("./model/user")
const app= express()
const {validateSignUpData}=require("./utils/validation")
const bcrypt=require("bcrypt")
app.use(express.json())
app.get("/getUser",async (req,res)=>{
try{
    const userData= await User.find()
    res.send(userData)
}
catch(err){
    res.status(500).send(err.message )
    
}
}
)
app.post("/signup",async (req,res)=>{

  try{
    validateSignUpData(req)
    const {firstName,lastName,emailId,password}=req.body
    const passwordHash=await bcrypt.hash(password,10)
    console.log(passwordHash,"passowrd");
    const user= new User({firstName,lastName,password:passwordHash,emailId});
await user.save()
res.send("User added successfully")}
catch(err){
    res.status(500).send("Error Message"+ err.message)
}
})
app.post("/login",async (req,res)=>{
    try{
        const {password,emailId}=req.body
        const user= await User.findOne({emailId:emailId})
        if(!user){
            res.send("Invalid Credintials")
        }
        const isPasswordVallid=await bcrypt.compare(password,user.password)
        if(isPasswordVallid){
            res.send("user loggedin Successfully")
        }
        else {
            res.send("Ivalid credintials")
        }

    }
    catch(err){
        res.status(400).send("Error",err.message)
        
    }
})
app.delete("/user",async (req,res)=>{
    try{
const userId=req.body.userId
console.log(req.body)
const user= await User.findByIdAndDelete(userId)
if(!userId){
    res.send("User Id not found")
}
else{
    res.send("user deleted successfully")
}}
catch(err){
    res.status(400).send("something went wrong")
}
})
app.patch("/user/:userId",async (req,res)=>{
    const userId=req.params?.userId
const data=req.body
console.log(data,"")

    try{
        const allowUpdate=["age","gender","password","skills","photosUrl"]
const isallowedUpdate=Object.keys(data).every((k)=> allowUpdate.includes(k))
if(!isallowedUpdate){
    throw new Error("Update failed")
}
const user=await User.findByIdAndUpdate(userId,data,{runValidators:true})
res.send("User Updated")
    }
    catch(err){

        res.status(400).send("something went wrong"+err.message)
    }
})

connectDb().
then(()=>{
    console.log("Databse connected established...");
    app.listen(3000,()=>{
        console.log("Server running successfully");
    })
}).
catch((err)=>{
    console.log("failed to  connect database...");
})

