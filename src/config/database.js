const mongoose=require("mongoose")

connectDb= async ()=> {await
mongoose.connect("mongodb+srv://sk2dev:Sath212%40@sk2dev.dm27esi.mongodb.net/devTinder")
}
module.exports={connectDb}
