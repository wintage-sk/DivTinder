const express = require("express")
const server= express()
server.use((req, res)=>{
    res.end("created repository for divitinder")
})
server.listen(3000)