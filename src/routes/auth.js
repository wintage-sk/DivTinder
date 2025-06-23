const express=require("express")
const bcrypt= require("bcrypt")
const {validateSignUpData}=require("../utils/validation")
const { User } = require("../model/user")
const authRouter=express.Router()


authRouter.post("/signup",async (req,res)=>{

    
    try{
      validateSignUpData(req)
      const {firstName,lastName,emailId,password}=req.body
      const passwordHash=await bcrypt.hash(password,10)
      const user= new User({firstName,lastName,password:passwordHash,emailId});
  await user.save()
  res.send("User added successfully")}
  catch(err){
      res.status(500).send("Error Message"+ err.message)
  }
  })
authRouter.post("/login",async (req,res)=>{
      try{
          const {password,emailId}=req.body
          const user= await User.findOne({emailId:emailId})
          console.log("user",user)
          if(!user){
              res.send("Invalid Credintials")
          }
          const isPasswordVallid=await user.validatePassword(password)
          if(isPasswordVallid){
             const token=await user.getJWT()
          //    const token = await jwt.sign({_id:user._id},"DivTinderSatheesh@2",{expiresIn:"7d"})
  
              res.cookie("token",token,{expires:new Date(Date.now() + 8*360000)})
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
  authRouter.post("/logout",(req, res)=>{
    console.log("klogout error");
    res.cookie("token",null, {expires:new Date(Date.now())}).send("Logged out successfully")
  })
  
  module.exports=authRouter