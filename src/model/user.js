const mongoose=require("mongoose")
const {Schema}=mongoose

const userSchema=new  Schema({
    firstName:{
        type:String,

        required:true
    },
    lastName:{
        type:String,
    },
    
    emailId:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:true

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
       validate: {validator(value){
        return Array.isArray(value)&&value.length===2

       },
    message:"only 2 strings allowed"}
    }
},{timestamps:true})

const User=mongoose.model("user",userSchema)
module.exports={User}