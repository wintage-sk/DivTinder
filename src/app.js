const express = require("express")
const app= express()
app.get("/user",(req,res)=>{
    res.send({name:"Satheesh",city:"Coimbatore"})
})
app.post("/user",(req,res)=>{
    res.send("user added successfully")
})
app.delete("/user",(req,res)=>{
    res.send("user deleted successfully")
})
app.put("/user",(req,res)=>{
    res.send("user updated successfully")
})
app.listen(3000)