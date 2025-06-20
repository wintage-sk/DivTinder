const express = require("express")
const {connectDb}=require("./config/database")
const {User}=require("./model/user")
const app= express()

app.use(express.json())
app.get("/getUser",async (req,res)=>{
try{
    const userData= await User.find()
    res.send(userData)
}
catch(err){
    res.status(500).send(err.message )
    
}
})
app.post("/signup",async (req,res)=>{

const user= new User(req.body);
  try{
await user.save()
res.send("User added successfully")}
catch(err){
    res.status(500).send("Error Message"+ err.message)
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

