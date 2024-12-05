const jwt = require('jsonwebtoken')


const authentication = async (req,res,next) => {
    try {
        const {token} = req.cookies
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Login timedout"
            })
        }

         jwt.verify(token,process.env.SECRET_KEY,(error,decode)=>{
            if(error){
                return res.status(400).json({
                    success:false,
                    error:error.message,
                    message:error.message || "JWT ERROR"
                })
            }
            req.id = decode.id,
            req.role = decode.role
            next()
         })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message || "Internal error"
        })
    }
}

const authorization = async (...roles) => {
    return (req,res,next)=>{
        try {
            
            const {role} = req
            if(!roles.includes(role)){
                return res.status(403).json({
                    success:false,
                    message:"Unauthorized Access"
                })
            }

            next()

        } catch (error) {
            return res.status(500).json({
                success:false,
                message:error.message || "Internal error"
            })
        }
    }
}

module.exports = {
    authentication,
    authorization
}