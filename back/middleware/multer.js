const multer = require("multer");


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,      './Uploads/ProfilePictures');

    },
    filename:(req,file,cb)=>{

        const uqSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)

        cb( null, file.fieldname + uqSuffix + "-" + file.originalname)
    }
})

const upload = multer({storage})

module.exports = upload