const  express= require("express")
const bcrypt=require("bcrypt")
const validator=require("validator")

const profileRouter=express.Router()

const {userAuth}=require("../middlewares/auth")
const { validateEditProfileData } = require("../utils/validation")
 
profileRouter.get("/profile/view",userAuth,async (req,res)=>{
    try{
    const user=req.user
    res.send(user)
  }
    catch(err){
      res.status(400).send("Error",err.message)
    }
  })
profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
    try{
       if(!validateEditProfileData(req)){
        throw new Error("Invalid edit profile")
       }
       const loggedInUser=req.user
       Object.keys(req.body).forEach((key)=>loggedInUser[key]=req.body[key])
await loggedInUser.save()
       res.send({message:loggedInUser.firstName+" prfoile updated successfully",
       loggedInUser
    })
    }
    catch(err){
        res.status(400).send(err.message)
    }
  })
  profileRouter.patch("/profile/password",userAuth,async (req,res)=>{
try{
const {oldPassword, newPassword}=req.body
if(!oldPassword || !newPassword||!validator.isStrongPassword(newPassword)){
    throw new Error("Enter the strong password ")
}
const loggedInUser=req.user
const match=bcrypt.compare(oldPassword,loggedInUser.password)
if(!match){
    throw new Error("Old password is incorrect")
}
loggedInUser.password=await bcrypt.hash(newPassword,10)
loggedInUser.save()

res.send("Password updated successfully");
}
catch(err){
    res.status(400).send("Password not updated"+err.message)
}

  })
  
  module.exports=profileRouter