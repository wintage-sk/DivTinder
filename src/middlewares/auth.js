const adminAuth=(req,res,next)=>{
    const token="xyz"
    const isAuthorized= token === "xyyz"
    if(!isAuthorized){
        res.status(401).send("Unauthorized")
    }
    next()
}
const userAuth=(req,res,next)=>{
    const token="xyz"
    const isAuthorized= token === "xuyz"
    if(!isAuthorized){
        res.status(401).send("Unauthorized")
    }
    next()
}
module.exports={adminAuth,userAuth}