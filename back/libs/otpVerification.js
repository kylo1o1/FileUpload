const {createTransport} = require('nodemailer')
const env = require('dotenv')

env.config()


if(!process.env.EMAIL || !process.env.EMAIL_PASS){
    throw new Error("Missing EMAIL or EMAIL_PASS in environment variables")
}

const transport = createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASS
    }
})

const sendEmail = (email,otp)=> new Promise((resolve,reject)=>{
    transport.sendMail({
        from:process.env.EMAIL,
        to:email,
        subject:"2 Step Verification",
        text:`Your OTP is ${otp}`, 
       
    },(error,response)=>{
        if(error){
           reject(error)
        }
        resolve(response)
    })
})

module.exports = {
    sendEmail
}
