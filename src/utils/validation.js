const validator=require("validator")
const validateSignUpData=(req)=>{

    const {firstName,lastName, password,emailId}=req.body
if(!firstName||!lastName){
    throw new Error ("Name is not valid")
}
else if(!validator.isEmail(emailId))
{
throw new Error("Email is not valid")
} else if(!validator.isStrongPassword(password))
{
    throw new Error("passwordnot valid")
}
}

const validateEditProfileData=(req,res)=>{
    const  alllowEditFields=["firstName","lastName","age","photoUrl","gender","skills","about"]
    console.log(req.body,"req")
    const isEditAllowed=Object.keys(req.body).every((field)=>
     alllowEditFields.includes(field))
    return isEditAllowed
 }
module.exports={validateSignUpData,validateEditProfileData}