const mongoose=require("mongoose")
const validator= require("validator")
const {Schema}=mongoose

const userSchema=new  Schema({
    firstName:{
        type:String,

        required:true
    },
    lastName:{
        type:String,
    },
    photoUrl:{
 type:String,
  validate(value){
    if (!validator.isURL(value)) {
        throw new Error("Url is not valid", value)
    }
 }
    },
    
    emailId:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true,
        validate(value){
           if(!validator.isEmail(value)){
            throw new Error ("Email id is not valid", value)
           }
        }
            
        
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
            throw new Error("Enter a strong password", value)
            }
        }

    },
    age:{type:Number,
    min:18},
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
              throw new Error ("Gender not valid")
        }
        }
    },
    skills:{
        type:[String],
    }
},{timestamps:true})

const User=mongoose.model("user",userSchema)
module.exports={User}