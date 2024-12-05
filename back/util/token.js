const jwt = require('jsonwebtoken')

exports.genToken = async (req,res) => {
    try {
        const {id,role} = req.user
        const op = {
            id,
            role,
            time:Date.now()
        }

        const token = jwt.sign(op,process.env.SECRET_KEY,{expiresIn:"30m"})
        if(!token){
            return res.status(400).json({
                success:false,
                message:"Login Failed"
            })
        }

        return res.status(200).cookie('token',token).json({
            success:true,
            message:"Login success",
            isAuth:true,
            token,
            user : req.user
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message || "Internal error"
        })
    }
}
