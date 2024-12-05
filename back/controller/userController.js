const User = require("../models/userSchema")
const bcrypt = require('bcrypt')
const { genToken } = require("../util/token")
const Otp = require("../models/otpSchema")
const fs = require('fs')
const { sendEmail } = require("../libs/otpVerification")
const { json } = require("express")



exports.register = async (req,res) => {
   

    try {
        const {name ,email, password} = req.body
        const {path} = req.file
        if(!name || !email || !password || !path){
            return res.status(400).json({
                success:false,
                message:"Please enter all fields",
                
            })
        }

        const pass = await bcrypt.hash(password,10)
        


        const user = await User.create({
            name,
            email,
            password:pass,
            profilePicture:path
        })

        if(!user){
            return res.status(500).json({
                success:false,
                message:"User not registered" || "Server Error"
            })
        }


        return res.status(201).json({
            success:true,
            message:"OK"
        })

    } catch (error) {
        return res.status(500).json({
            message:error.message || "Internal Error"
        })
    }
}


exports.sendOtp = async (req,res) => {
    try {
        const { email, password} = req.body
        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message:"Please enter all fields"
            })
        }

        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({
                success:false,
                message:"Please enter a valid email"
            })
        }

        const match = await bcrypt.compare(password,user.password)

        if(!match){
            return res.status(401).json({
                success:false,
                message:"Please enter a valid email and password"
            })
        }

        let otp = '';
        for(i=0;i<4;i++){
            otp +=  (Math.random() * 10).toFixed(0)
        }

        const _otp = await Otp.create({
            otp,
            uEmail:email
        })

        sendEmail(email,otp)

        return res.status(200).json({
            success:true,
            message:"OK"
        })
       

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message || "Internal error"
        })
    }
}


exports.verOtp = async (req,res) => {
    try {
        const {otp,email} = req.body

        if(!otp){
            return res.status(400).json({
                success:false,
                message:"Please enter a valid otp"
            })
        }

        const ex = await Otp.findOne({uEmail:email})

        const match = otp === ex.otp 
        if(!match){
            return res.status(404).json({
                success:false,
                message:"Please enter a valid otp"
            })
        }
        

        const user = await User.findOne({email})

        req.user = {
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            pfp:user.profilePicture
        }
        

        genToken(req,res)

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message || "Internal error"
        })
    }
}

exports.viewProfile = async (req,res) => {
    try {
        const {id} = req.params
        if(!id){
            return res.status(401).json({
                success:false,
                message:"No id Found"
            })
        }

        const user = await User.findById(id)

        if(!user){
            return res.status(404).json({
                success:false,
                message:"No user Found"
            })
        }

        return res.status(200).json({
            success:true,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        })


    } catch (error) {
        
    }
}

exports.updateProfile = async (req,res) => {
    try {
        const {name,email} = req.body;
        const {pid} = req.params;
        // console.log(name,email);

        const exUser = await User.findById(pid);

        if(!exUser){
            return res.status(404).json({
                message:"Profile || User not Found",
                success:false
            })
        }

        if(name) exUser.name = name;
        if(email) exUser.email = email;

        if(req.file){
            const _path = exUser.profilePicture;
            if(fs.existsSync(_path)){
                fs.unlinkSync(_path);
            }

            exUser.profilePicture = req.file.path;
        }

        await exUser.save();

        return res.status(200).json({
            success:true,
            message:"Profile Updated Successfully",
            user:{
                id:exUser._id,
                name:exUser.name,
                email:exUser.email,
                pfp:exUser.profilePicture
            }
        });



    } catch (error) {
         return res.status(500).json({
            success:false,
            message:error.message || "Internal error"
        });
    }
}

exports.deleteProfile = async (req,res) => {
    const {pid} = req.params 
    try {
        
        const user = await User.findById(pid);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not Found"
            })
        }

        const _path = user.profilePicture
        if(_path){
            fs.unlinkSync(_path)
        }

        const dlt = await User.findByIdAndDelete(pid)

       

        return res.status(200).json({
            success:true,
            message:"Profile Deleted"
        })

    } catch (error) {
        return res.status(500).json({
            message:error.message || "Internal Error"
        })
    }
}