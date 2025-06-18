const express = require("express")
const server= express()
server.use((req, res)=>{
    res.end("created repository for divitinder")
    console.log("connected successfully")
})
server.listen(3000)