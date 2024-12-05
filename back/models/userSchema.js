const { default: mongoose } = require("mongoose");


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter Your name"]
    },
    email:{
        type:String,
        required:[true,"Please enter Your Email Address"]
    },
    password:{
        type:String,
        required:[true,"Please enter Your Password"]
    },
    profilePicture:{
        type:String
    },
    role:{
        type:String,
        default:"user",
        
    }
})

const User = mongoose.model('user',userSchema)

module.exports = User
