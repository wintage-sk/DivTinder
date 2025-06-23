const express = require("express")
const {connectDb}=require("./config/database")
const {User}=require("./model/user")
const app= express()
const cookieParser=require("cookie-parser")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")
const authRouter = require("./routes/auth")

app.use(express.json())
app.use(cookieParser())
app.use("/",profileRouter)
app.use("/",requestRouter)

app.use("/",authRouter)

// app.get("/getUser",async (req,res)=>{
// try{
//     const userData= await User.find()
//     res.send(userData)
// }
// catch(err){
//     res.status(500).send(err.message )
    
// }
// }
// )



// app.delete("/user",async (req,res)=>{
//     try{
// const userId=req.body.userId
// const user= await User.findByIdAndDelete(userId)
// if(!userId){
//     res.send("User Id not found")
// }
// else{
//     res.send("user deleted successfully")
// }}
// catch(err){
//     res.status(400).send("something went wrong")
// }
// })
// app.patch("/user/:userId",async (req,res)=>{
//     const userId=req.params?.userId
// const data=req.body

//     try{
//         const allowUpdate=["age","gender","password","skills","photosUrl"]
// const isallowedUpdate=Object.keys(data).every((k)=> allowUpdate.includes(k))
// if(!isallowedUpdate){
//     throw new Error("Update failed")
// }
// const user=await User.findByIdAndUpdate(userId,data,{runValidators:true})
// res.send("User Updated")
//     }
//     catch(err){

//         res.status(400).send("something went wrong"+err.message)
//     }
// })

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

