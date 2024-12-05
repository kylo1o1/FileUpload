const { default: mongoose } = require("mongoose");

const otpSchema = new mongoose.Schema({
    otp:{
        type:String,
        require:[true]
    },
    uEmail:{
        type:String,
        require:[true]
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        index:{expires:'2m'}
    }
})

const Otp = mongoose.model('otp',otpSchema)

module.exports = Otp